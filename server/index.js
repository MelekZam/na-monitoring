const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = 3000
const config = require('./config')
const client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN)

const io = require('socket.io',port)(http);

let connectedUsers = []

io.on('connection', socket => {

    const user = {
        id: socket.handshake.query.id,
        username: socket.handshake.query.username
    }

    console.log('hi')
    socket.join(user.id)
    if ( !connectedUsers.includes(user) ) connectedUsers.push(user)
    io.emit('new connection', connectedUsers)

    socket.on('send new message', msg => {
        console.log(msg)
        io.to(msg.receiver).emit('receive new message', msg)
    })

})


app.get('/', (req, res) => {
    res.status(200).send({
        message: "You are on Homepage",
        info: {
            login: "Send verification code through /login . It contains two params i.e. phonenumber and channel(sms/call)",
            verify: "Verify the recieved code through /verify . It contains two params i.e. phonenumber and code"
        }
    }
)})

// Login Endpoint
app.get('/login', (req,res) => {
     if (req.query.phonenumber) {
        client
        .verify
        .services(config.SERVICE_ID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel==='call' ? 'call' : 'sms' 
        })
        .then(data => {
            res.status(200).send({
                message: "Verification is sent!!",
                phonenumber: req.query.phonenumber,
                data
            })
        }) 
     } else {
        res.status(400).send({
            message: "Wrong phone number :(",
            phonenumber: req.query.phonenumber,
            data
        })
     }
})

// Verify Endpoint
app.get('/verify', (req, res) => {
        client
            .verify
            .services(config.SERVICE_ID)
            .verificationChecks
            .create({
                to: `+${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                res.status(200).send(data)
            })
})

// listen to the server at 3000 port
http.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
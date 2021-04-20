import { zabbixURL }  from './Config'

const GetUsers = async (token) => {
    const url = new URL(zabbixURL)
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json-rpc'
        },
        body: JSON.stringify({                                                                                                                                                                                                                                                                           
            "jsonrpc": "2.0",
            "method": "user.get",
            "params": {
                "output": ["userid","surname"]                
            },
            "auth": token,
            "id":1,                                                                                                                                                                                                                                                       
        })
    })
    
    const response = await rawResponse.json()
    return response.result
}


export default GetUsers;

import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux'



const Conversation = ({user, socket, route, messages, dispatch}) =>  {
    
    const Message = ({ message }) => {
        return ( <>{message.sender === user.id && <LinearGradient
            style={styles.fromMe}
            colors={['#4776E6','#8E54E9']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        >
            <Text style={{color:'white'}} >{message.text}</Text>
        </LinearGradient>} 
        {message.receiver === user.id && <LinearGradient
        style={styles.toMe}
        colors={['grey','grey']}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        >
            <Text style={{color:'white'}} >{message.text}</Text>
        </LinearGradient>}</>
        )
    }
    
    const sendMessage = () => {
        const newText = text.trim()
        if (newText!=='') {
            const action = {type: 'UPDATE_MESSAGES', value: {receiver: route.params.id, sender: user.id, text: newText}}
            dispatch(action)
            socket.emit('send new message', {receiver: route.params.id, sender: user.id, text: newText})
            setText('')
        }
    }
    
    let newSocket = socket
    const [ text, setText ] = useState('')
    const ScrollViewRef = useRef()
    
    return (
        <View style={styles.container}>
            <ScrollView
                ref={ScrollViewRef}
                onContentSizeChange={() => ScrollViewRef.current.scrollToEnd({animated: true})}
                style={styles.contentContainer}
            >
                {messages.map( message => {return <Message key={message.text} message={message}/>})}
            </ScrollView>
            <View style={{flexDirection:'row'}}>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type here..."
                        placeholderTextColor='grey'
                        numberOfLines={2}
                        multiline={true}
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center',marginLeft:10}}><Button title='Send' style={{height:'100%'}} onPress={sendMessage}/></View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#16171B',
        padding: 10
    },
    contentContainer:{
        flex: 1,
        backgroundColor: '#16171B',
        paddingBottom:10
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 35,
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flex:3
    },
    textArea: {
        height: 70,
        color:'white',
        marginLeft:10,
        flex:1
    },
    fromMe: {
        padding: 10,
        alignSelf: 'flex-end',
        borderRadius: 15,
        borderTopRightRadius: 0,
        marginVertical:5
    },
    toMe: {
        padding: 10,
        alignSelf: 'flex-start',
        borderRadius: 15,
        borderTopLeftRadius: 0,
        marginVertical:5
    }
})


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Conversation);
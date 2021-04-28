import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import io from 'socket.io-client'

const Chat = ({ user, connectedUsers, navigation }) => {
    const UserItem = ({item}) => {
        return (
            ( item.id !== user.id && <TouchableOpacity onPress={() => navigation.navigate('Conversation', {username: item.username, id: item.id})} style={styles.userItem} >
                <View style={styles.userImg} >
                    <Icon style={styles.searchIcon} name="user-circle-o" size={50} color="white"/>
                </View>
                <View style={styles.userText} >
                    <Text style={{fontSize:15,color:'lightgrey'}}>{item.username}</Text>
                    <Text style={{fontSize:12,color:'grey',fontStyle:'italic'}}>Hello! What's up?</Text>
                </View>
                <View style={{borderBottomColor: 'lightgrey',borderBottomWidth: .5,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="circle" size={20} color='#86CC70' style={{marginRight:20}} />
                </View>
            </TouchableOpacity>)
        )
    }

    const [ searchText, setSearchText ] = useState('')

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="search" size={20} color="lightgrey"/>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    value={searchText}
                    onChangeText = { text => setSearchText(text)}
                />
            </View>
            { connectedUsers.map(item => { return <UserItem key={item.id} item={ searchText === '' || item.username.toLowerCase().includes(searchText.toLowerCase()) ? item : null} /> })}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#16171B',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F1F23',
        marginHorizontal: 30,
        marginBottom: 25,
        borderRadius:7
    },
    searchIcon: {
        padding: 10,
        marginHorizontal: 5
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#1F1F23',
        color: '#fff',
        borderRadius:7
    },
    userItem: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 5
    },
    userImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userText: {
        flex: 3,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: .5,
        justifyContent: 'space-evenly',
    }
  })

  const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Chat);
import React from 'react'
import { View, Text, StyleSheet,Button } from 'react-native'
import { connect } from 'react-redux'
import LogoutRequest from '../../service/LogoutRequest'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Dashboard = (props) => {
  const onPress = async () => {
    await LogoutRequest(props.user.token)
    try {
      //await AsyncStorage.removeItem('verified')
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('isLoggedIn')
    } catch(e) {
        console.log(e)
    }
    const action = {type: 'LOGOUT'}
    props.dispatch(action)
  }
  return (
      <View>
          <Text>{props.user.nickname}</Text>
          <Text>{props.user.id}</Text>
          <Text>{props.user.token}</Text>
          <Button title='Log out' onPress={onPress} />
      </View>
  )
}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Dashboard);
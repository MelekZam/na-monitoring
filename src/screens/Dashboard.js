import React from 'react'
import { View, Text, StyleSheet,Button } from 'react-native'
import { connect } from 'react-redux'
import LogoutRequest from '../../service/LogoutRequest'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';


const Dashboard = (props) => {
  const onPress = async () => {
    await LogoutRequest(props.user.token)
    try {
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('isLoggedIn')
    } catch(e) {
        console.log(e)
    }
    const action = {type: 'LOGOUT'}
    props.dispatch(action)
  }
  return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{color:'white'}}>{props.user.nickname}</Text>
          <Text style={{color:'white'}}>{props.user.id}</Text>
          <Text style={{color:'white'}}>{props.user.token}</Text>
        </View>
        <View style={{flex:1,flexDirection:'column', justifyContent:'flex-end'}}><Button title='Log out' onPress={onPress} /></View>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#16171B'
  },
  contentContainer: {
    margin:15,
    backgroundColor: '#3F3D56',
    borderRadius: 5,
    elevation: 2,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems : 'center'
  }
})

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Dashboard);
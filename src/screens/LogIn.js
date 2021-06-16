import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoginRequest from '../../service/LoginRequest'
import getUserMedia from '../../service/getUserMedia'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LogIn = ({navigation,dispatch}) => {

    // state for the login input
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // state to keep track of invalid login credentials
    const [ showAlert, setShowAlert ] = useState(false);

    // send login request when pressing login
    const onPress = async () => {
        const response = await LoginRequest(username, password)
        if ('result' in response) login(response.result)
        else    { setShowAlert(true); setPassword(''); setUsername('')}
    }

    const login = async (result) => {
        try {
            const verified = await AsyncStorage.getItem('verified')
            if(verified === 'yes') { // if the devide is already verified through twilio ==> login and go to dashboard
                await AsyncStorage.setItem('isLoggedIn', 'yes')
                const action = { type: 'LOGIN', value: { token: result.sessionid, id: result.userid, nickname: result.surname } }
                const userObject = JSON.stringify(action.value)
                await AsyncStorage.setItem('user',userObject)
                dispatch(action)
            } else { // else go to verification screen
                const phoneNumber = await getUserMedia(result.userid,result.sessionid)
                if (!phoneNumber){ // if user's phone number doesn't exist ==> login without going to verification screen
                    await AsyncStorage.setItem('isLoggedIn', 'yes')
                    const action = { type: 'LOGIN', value: { token: result.sessionid, id: result.userid, nickname: result.surname } }
                    const userObject = JSON.stringify(action.value)
                    await AsyncStorage.setItem('user',userObject)
                    dispatch(action)
                }
                else {
                    await axios.get(`http://192.168.43.215:3000/login?phonenumber=216${phoneNumber}&channel=sms`) // send request to localhost node server to send sms to the user's phone using twilio services
                    navigation.navigate('Verify', {
                    phoneNumber,
                    token: result.sessionid,
                    id: result.userid,
                    nickname: result.surname,
                    })
                }
            }
          } catch(e) {
            console.log(e)
          }
        
    }

    const hideAlert = () => {
        setShowAlert(false)
    }

    return (
        
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Error"
                message="Invalid login credentials !"
                closeOnTouchOutside={true}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Okay!"
                confirmButtonColor="#DD6B55"
                overlayStyle={{height:'100%'}}
                contentContainerStyle={{width: 220 ,height:250,justifyContent: 'center'}}
                onConfirmPressed={() => {
                    hideAlert();
                }}
            />
            <View style={styles.logoContainer}>
                <Animatable.Image
                        source={require('../assets/unDraw.png')}
                        animation='zoomInDown'
                        style={styles.logo}
                        duration={1500}
                />
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.logInContainer}>
                <View style={styles.textBox}>
                    <Text style={styles.headerTxt}>Log In</Text>
                    <Text style={styles.p}>Please sign in to continue.</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        value={username}
                        placeholder={'Username'}
                        placeholderTextColor='lightgrey'
                        style={styles.input}
                        onChangeText = { (text) => setUsername(text) }
                    />
                    <TextInput
                        value={password}
                        placeholder={'Password'}
                        placeholderTextColor='lightgrey'
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText = { (text) => setPassword(text) }
                    />
                    <Button
                        title={'Login'}
                        style={styles.input}
                        onPress={onPress}
                    />
                </View>
            </Animatable.View>
        </ScrollView>      
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171B',
    },
    logoContainer: {
        flex: 1.5,
        justifyContent:'center',
        alignItems:'center'
    },
    logInContainer: {
        margin: '5%',
        padding : 5,
        height: 400,
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    logo:{
        height:175,
        width: 275
    },
    headerTxt: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    p: {
        fontSize: 15,
        color: '#B3B6B7',
        fontWeight: '200'
    },
    input: {
        color: 'black',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        borderColor: '#2196f3',
        borderWidth: 1.5
      },
      formContainer: {
        paddingTop: 20,
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 3,
        zIndex: 10
      },
      textBox: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
      }
})

const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(LogIn);
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as Animatable from 'react-native-animatable';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'

const Verify = ({navigation, route,dispatch}) => {
    // timer for the resend button
    let resendOtpTimerInterval;
    const [resendButtonDisabledTime, setResendButtonDisabledTime] =  useState(30)
    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
          clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
          if (resendButtonDisabledTime <= 0) {
            clearInterval(resendOtpTimerInterval);
          } else {
            setResendButtonDisabledTime(resendButtonDisabledTime - 1);
          }
        }, 1000);
    };
    useEffect(() => {
        startResendOtpTimer();
    
        return () => {
          if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
          }
        };
    }, [resendButtonDisabledTime]);
    
    //submit code
    const submitCode = async (code) => {
        console.log(route.params)
        const response = await axios.get(`http://172.29.26.15:3000/verify?phonenumber=216${route.params.phoneNumber}&code=${code}`)
        console.log('valid: ', response.data.valid)
        if (response.data.valid){
            const user = {
                nickname: route.params.nickname,
                token: route.params.token,
                id: route.params.id,
            }
            console.log(user)
            try {
                await AsyncStorage.setItem('verified','yes')
                await AsyncStorage.setItem('isLoggedIn', 'yes')
                const jsonUser = JSON.stringify(user)
                await AsyncStorage.setItem('user',jsonUser)
                const action = {type: 'LOGIN', value: user}
                dispatch(action)
              } catch (e) {
                console.log(e)
                }
        }
    }

    // resend code
    const resendOTP = async () => {
        setResendButtonDisabledTime(30);
        await axios.get(`http://172.29.26.15:3000/login?phonenumber=216${route.params.phoneNumber}&channel=sms`)
    }
    return (
        <View style={{flex: 1}}>
            <View enabled={true} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.logoContainer}>
                    <TouchableOpacity 
                        style={{alignSelf: 'flex-start', marginLeft: 10, width: 20}}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                        })}
                    >
                        <Icon
                            name='angle-left'
                            size={40}
                            color='white'
                        />
                    </TouchableOpacity>
                    <Animatable.Image
                            source={require('../assets/unDrawVerify.png')}
                            animation='zoomInDown'
                            style={styles.logo}
                            duration={1000}
                    />
                    <View style={styles.verificationContainer}>
                        <View style={styles.textBox}>
                            <Text style={styles.headerTxt}>Verification</Text>
                            <Text style={styles.p}>Please type the verification code sent to 98******.</Text>
                            <OTPInputView 
                                style={{width: '80%', height: 200,justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                                pinCount={6}
                                autoFocusOnLoad={true}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled = {(code => {
                                    console.log(`Code is ${code}, you are good to go!`);
                                    submitCode(code)
                                })}
                            />
                            { resendButtonDisabledTime ?
                            <Text style={{color:'white'}} >Resend OTP in {resendButtonDisabledTime}s</Text>
                            : <Button title='Resend OTP' onPress={resendOTP}/>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C32'
    },
    logoContainer: {
        flex: 1.5,
        justifyContent:'center',
        alignItems:'center'
    },
    verificationContainer: {
        flex:3,
        margin: '5%',
        padding : 5,
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    logo:{
        height:220,
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
      textBox: {
          flex: 1,
          alignItems: 'center',
      },
      borderStyleBase: {
        width: 30,
        height: 45
      },
     
      borderStyleHighLighted: {
        borderColor: "#2196f3",
      },
     
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
     
      underlineStyleHighLighted: {
        borderColor: "#2196f3",
      },
})


const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Verify);
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'

const Welcome = ({ navigation, dispatch }) => {
    useEffect( async () => {
        try {
            const checkLogin = await AsyncStorage.getItem('isLoggedIn')
            if (checkLogin === 'yes') {
                const x = await AsyncStorage.getItem('user')
                const y = JSON.parse(x)
                const action = { type: 'LOGIN', value: y }
                dispatch(action)
            }
          } catch(e) {
            console.log(e)
          }
    })
  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Animatable.Image
                source={require('../assets/logo.png')}
                animation='bounceIn'
                style={styles.logo}
                duration={3500}
            />
        </View>
        <Animatable.View
            style={styles.getStarted}
            animation="fadeInUpBig"
        >
            <View style={styles.insideContainer}>
                <Text style={styles.headerTxt}>Monitor Your Network from Your Phone</Text>
                <Text>Now you can monitor all the devices connected to your network from anywhere.</Text>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={ () => navigation.navigate('LogIn')} >
                        <LinearGradient
                            colors={['#4776E6','#8E54E9']}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.signIn}
                        >
                            <Text style={styles.btnTxt}>Sign In</Text>
                            <Icon
                                name='angle-right'
                                size={20}
                                color='white'
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171B'
    },
    logoContainer: {
        flex: 3,
        justifyContent:'center',
        alignItems:'center'
    },
    getStarted: {
        flex:1.75,
        backgroundColor:'#D3D2E5',
        borderTopLeftRadius: 25,
        borderTopRightRadius:25
    },
    logo:{
        height:250,
        width: 250
    },
    insideContainer: {
        margin: 10,
        padding: 10,
        flex: 1,
        paddingTop: '10%',
        
    },
    headerTxt: {
        fontSize: 25,
        color: 'black',
        letterSpacing: 2,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    btn: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    signIn: {
        height: 35,
        width: 120,
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnTxt: {
        fontSize: 17,
        marginTop: 'auto',
        marginBottom: 'auto',
        color: '#FFF',
        letterSpacing: 1.5
    }
})


const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Welcome);
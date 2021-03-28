import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const LogIn = () => {
  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Animatable.Image
                    source={require('../assets/unDraw.png')}
                    animation='zoomInDown'
                    style={styles.logo}
                    duration={1000}
            />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.logInContainer}>
            <Text style={styles.headerTxt}>Log In</Text>
            <Text style={styles.p}>Please sign in to continue.</Text>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder={'Username'}
                    style={styles.input}
                />
                <TextInput
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                
                <Button
                    title={'Login'}
                    style={styles.input}
                />
            </View>
        </Animatable.View>
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
    logInContainer: {
        flex:3,
        margin: '5%',
        padding : 5,
        alignItems: 'center'
    },
    logo:{
        height:200,
        width: 300
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
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        borderColor: 'black'
      },
      formContainer: {
        flex: 0.75,
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }
})

export default LogIn;
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const LogIn = ({navigation}) => {

    // state for the login input
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
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
                        source={require('../assets/unDraw.png')}
                        animation='zoomInDown'
                        style={styles.logo}
                        duration={1000}
                />
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.logInContainer}>
                <View style={styles.textBox}>
                    <Text style={styles.headerTxt}>Log In</Text>
                    <Text style={styles.p}>Please sign in to continue.</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder={'Username'}
                        style={styles.input}
                        onChangeText = { (text) => setUsername(text) }
                    />
                    <TextInput
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText = { (text) => setPassword(text) }
                    />
                    
                    <Button
                        title={'Login'}
                        style={styles.input}
                    />
                </View>
            </Animatable.View>
            <Text>{password}</Text>
            <Text>{username}</Text>
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
        alignItems: 'center',
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
      },
      textBox: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
      }
})

export default LogIn;
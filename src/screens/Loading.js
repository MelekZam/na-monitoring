import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, Text, StyleSheet } from 'react-native'
const Loading = ({navigation}) => {
    
    useEffect(() => {
        setTimeout( () => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashboardStack' }],
            });
        },3000)
    })

    return (
        <View  style={styles.container}>
            <View style={styles.centeredContainer}>
                <View style={{flex:1,marginTop:120}}>
                    <LottieView source={require('../assets/loading.json')} autoPlay loop/>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.text}>Fetching Data From Zabbix</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171B',
        
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'aerial'
    },
    centeredContainer: {
        flex:1.75,
        justifyContent:'flex-end'
    }
})

export default Loading;
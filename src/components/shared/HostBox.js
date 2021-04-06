import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HostBox = (props) => {
    return (
        <View style={{backgroundColor: props.color, alignItems: 'center', justifyContent:'center', flex: 1, height: 100}} >
            <Text style={{color: 'white', fontSize: 16}}>{props.status}</Text>
            <Text style={{color: 'white', fontSize: 16}}>{props.number}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    
})

export default HostBox;
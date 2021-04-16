import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HostBox = (props) => {
    return (
        <View style={{backgroundColor: props.color, alignItems: 'center', justifyContent:'center', flex: 1, height: 100}} >
            <Text style={{textAlign:'center',color: 'white', fontSize: 16,fontWeight:'bold'}}>{props.status}</Text>
            {props.number!==null && <Text style={{color: 'white', fontSize: 16,fontWeight:'bold'}}>{props.number}</Text>}
        </View>
    )
}

const styles= StyleSheet.create({
    
})

export default HostBox;
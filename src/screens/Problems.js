import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Problems = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'#FFF'}}>Problems</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#16171B'
    }
  })
export default Problems;
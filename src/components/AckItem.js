import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'


const severity = ['Not Classified','Information','Warning','Average','High','Disaster']
const color = ['#97AAB3','#7499FF','#FFC859','#FFA059','#F37353','#E45959']

const AckItem = ({ item, users }) => {
      return (<View style={styles.ackItem}>
            <View style={styles.textBox}>
                <Text style={{color:'white'}}>Date : {new Date(item.item.clock * 1000).toISOString().slice(0, 19).replace('T', '   ')}</Text>
                <Text style={{color:'white'}}>User : {users.filter(value => value.id === item.item.id)[0].surname}</Text>
                <Text style={{color:'white'}}>Message : <Text style={{color:'lightgrey',fontSize:12,fontStyle:'italic'}}>{item.item.message}</Text></Text>
                {((item.item.action>=8 && item.item.action<16) || item.item.action>=24) ? <><Text style={{color: color[parseInt(item.item.old_severity)]}}><Text style={{color:'white'}}>Old Severity : </Text>{severity[parseInt(item.item.old_severity)]}</Text>
                <Text style={{color: color[parseInt(item.item.new_severity)]}}><Text style={{color:'white'}}>New Severity : </Text>{severity[parseInt(item.item.new_severity)]}</Text></> : <Text style={{color:'white'}}>Severity Unchanged</Text>}
                <Text style={{color:'white'}}>Closed Problem : { item.item.action%2 ? 'Yes' : 'No'}</Text>
                <Text style={{color:'white'}}>Unacknowledged : { item.item.action>=16 ? 'Yes' : 'No'}</Text>
            </View>
          </View>
      )
    } 

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#16171B',
      justifyContent:'center',
      alignItems:'center'
    },
    ackItem: {
      flexDirection:'row',
      margin: 10,
      backgroundColor: '#1F1F23',
      borderRadius: 5,
      shadowColor:'black',
      shadowOffset: { width: 0, height: 10},
      shadowOpacity: 0.5,
      elevation: 1.5,
      padding: 5,
      width:350
    },
    textBox:{
      marginLeft: 10,
      flexDirection: 'column',
      justifyContent:'space-around',
      flexShrink: 1
    },
    popupContainer: {
      marginHorizontal: 10,
      marginVertical:50
    }
  })

export default AckItem;




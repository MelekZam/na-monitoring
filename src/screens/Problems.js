import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import GetProblems from '../../service/GetProblems'
import { connect } from 'react-redux'
import HostBox from '../components/shared/HostBox'


const Problems = ({ problems }) => {
    const [ severityDesc, setSeverityDesc ] = useState(['Warning','Average','High','Disaster'])
    const [ severityColor, setSeverityColor ] = useState(['#FFC859','#FFA059','#F37353','#E45959'])
    const renderItem = (item) => {
      return (
        <TouchableOpacity>
          <View style={styles.problemItem}>
            <View style={{width:75}}><HostBox color={severityColor[item.severity-1]} number={null} status={severityDesc[item.severity-1]}/></View>
            <View style={styles.textBox}>
              <Text style={{color:'white',fontSize:15}}>{item.name}</Text>
              <Text style={{color:'lightgrey',fontSize:10}}>Acknowledged : {item.acknowledged === '1' ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } 
    return (
        <View style={styles.container}>
          <FlatList 
            data={problems.all}
            keyExtractor={item => item.eventid}
            renderItem={ ({item}) => renderItem(item)}
          />
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
    problemItem: {
      flexDirection:'row',
      margin: 10,
      backgroundColor: '#1F1F23',
      borderRadius: 5,
      shadowColor:'black',
      shadowOffset: { width: 0, height: 10},
      shadowOpacity: 0.5,
      elevation: 1.5,
      padding: 5
    },
    textBox:{
      marginLeft: 10,
      flexDirection: 'column',
      justifyContent:'space-around'
    }
  })

  const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Problems);
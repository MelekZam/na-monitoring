import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import { Provider, Modal, Portal } from 'react-native-paper'
import GetProblems from '../../service/GetProblems'
import { connect } from 'react-redux'
import HostBox from '../components/shared/HostBox'


const Problems = ({ problems, navigation }) => {
    const [ severityDesc, setSeverityDesc ] = useState(['Warning','Average','High','Disaster'])
    const [ severityColor, setSeverityColor ] = useState(['#FFC859','#FFA059','#F37353','#E45959'])
    const [ popUP, setPopUP ] = useState(false)
    const renderItem = (item) => {
      return (
        <TouchableOpacity onPress={ () => navigation.navigate('Acknowledge', { id: item.eventid})}>
          <View style={styles.problemItem}>
            <View style={{width:85}}><HostBox color={severityColor[parseInt(item.severity)-2]} number={null} status={severityDesc[parseInt(item.severity)-2]}/></View>
            <View style={styles.textBox}>
              <Text style={{color:'white',fontSize:15}}>{item.name}</Text>
              <Text style={{color:'grey',fontSize:10}}>Duration : {new Date(Number(item.clock) * 1000).toISOString().substr(11, 8)}</Text>
              <Text style={{color:'grey',fontSize:10}}>Acknowledged : {item.acknowledged === '1' ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } 
    return (
      <Provider>
        <View style={styles.container}>
          <FlatList 
            data={problems.all}
            keyExtractor={item => item.eventid}
            renderItem={ ({item}) => renderItem(item)}
          />
        </View>
      </Provider>
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

  const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Problems);
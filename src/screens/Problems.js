import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Provider } from 'react-native-paper'
import { connect } from 'react-redux'
import HostBox from '../components/shared/HostBox'
import { Picker } from '@react-native-picker/picker'
import { useIsFocused } from '@react-navigation/core'


const Problems = ({ user, problems, navigation, hosts }) => {
    
    const [ severityDesc, setSeverityDesc ] = useState(['Not Classified','Information','Warning','Average','High','Disaster'])
    const [ severityColor, setSeverityColor ] = useState(['#97AAB3','#7499FF','#FFC859','#FFA059','#F37353','#E45959'])
    const allHosts = [...hosts.system, ...hosts.network]
    const [ selectedHosts, setSelectedHosts ] = useState(null)
    const [ selectedProblems, setSelectedProblems ] = useState(problems.all)
    const isFocused = useIsFocused()
    const [ mounted, setMounted ] = useState(true)
    const [resolvedAreSelected, setResolvedAreSelected] = useState(false)
    
    useEffect(() => {
      setSelectedProblems(problems.all)
      setSelectedHosts(null)
    },[isFocused])
    
    useEffect(() => {
      if (JSON.stringify(selectedProblems) == JSON.stringify(problems.resolved))
        setResolvedAreSelected(true)
      else
      setResolvedAreSelected(false)
    })
    const RenderItem = ({item, resolved}) => {
      return (
        <TouchableOpacity onPress={ () => {if (!resolved) navigation.navigate('Acknowledge', { token: user.token, id: item.eventid, name: item.name, history: item.acknowledges, host: item.host})}}>
          <View style={styles.problemItem}>
            <View style={{width:90}}><HostBox  color={ resolved ? '#86CC89' : severityColor[parseInt(item.severity)]} number={null} status={ resolved ? 'Resolved' : severityDesc[parseInt(item.severity)]}/></View>
            <View style={styles.textBox}>
              <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>{item.name}</Text>
              <Text style={{color:'white',fontSize:11.5}}>Host : {item.host.name}</Text>
              <Text style={{color:'grey',fontSize:10}}>Time :  {new Date(item.clock * 1000).toISOString().slice(0, 19).replace('T', '   ')}</Text>
              <Text style={{color:'grey',fontSize:10}}>Acknowledged : {item.acknowledged === '1' ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    } 
    return (
      <Provider>
        <View style={{flexDirection:'row',backgroundColor:'#16171B',padding:10}}>
          <View style={{flex:1,backgroundColor:'#1F1F23',marginHorizontal:5}}>
            <Picker
              selectedValue={selectedProblems}
              onValueChange={ (itemValue, itemIndex) => setSelectedProblems(itemValue)}
              style={{color:'white'}}
              dropdownIconColor='white'
              
            >
              <Picker.Item label='All Problems' value={problems.all} />
              <Picker.Item label='Disaster' value={problems.disaster} />
              <Picker.Item label='High' value={problems.high} />
              <Picker.Item label='Average' value={problems.average} />
              <Picker.Item label='Warning' value={problems.warning}  />
              <Picker.Item label='Resolved' value={problems.resolved}  />
            </Picker>
          </View>
          <View style={{flex:1,backgroundColor:'#1F1F23',marginHorizontal:5}}>
            <Picker
              selectedValue={selectedHosts}
              onValueChange={ (itemValue, itemIndex) => setSelectedHosts(itemValue)}
              style={{color:'white'}}
              dropdownIconColor='white'
            >
                <Picker.Item label='All Hosts'  value={null}/>
                {allHosts.map( host => { return <Picker.Item  key={host.id} label={host.name} value={host.name} />})}
            </Picker>
          </View>
        </View>
        <View style={styles.container}>
          <FlatList
            data={ selectedHosts ? selectedProblems.filter(item => item.host.name === selectedHosts) : selectedProblems}
            keyExtractor={item => item.eventid}
            renderItem={ ({item}) => <RenderItem item={item} resolved={resolvedAreSelected} />}
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
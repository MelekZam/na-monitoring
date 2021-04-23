import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput, ScrollView, LogBox } from 'react-native'
import GetItems from '../../service/GetItems'
import HostBox from '../components/shared/HostBox'
import { List, Colors } from 'react-native-paper'
import GetTriggers from '../../service/GetTriggers'

const Items = ({route}) => {
    // Getting the items from zabbix
    const [ mounted, setMounted ] = useState(true)
    const [ items, setItems ] = useState([])
    const [ triggers, setTriggers ] = useState([])
    const [ loading, setLoading ] = useState(true)
    
    useEffect(() => {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    
    useEffect( async () => {
        const promises = []
        promises[0] = GetItems(route.params.token, route.params.hostID)
        promises[1] = GetTriggers(route.params.token, route.params.hostID)
        Promise.all(promises).then( results => {
          itemsResponse = results[0]
          triggersResponse = results[1]
          setItems(itemsResponse)
          setTriggers(triggersResponse)
          setLoading(false)
        })
    },[mounted])
    
    // state for search input
    const [searchText, setSearchText ] = useState('')

    const renderItem = (item) => {
        return (
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={{width:75}}><HostBox color={ item.status == '0' ? '#86CC89' : '#E45959' } number={null} status={ item.status == '0' ? 'Enabled' : 'Disabled' }/></View>
              <View style={styles.textBox}>
                <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{item.name}</Text>
                { item.description ? <Text style={{color:'lightgrey',fontSize:12,fontStyle:'italic'}} numberOfLines={3}>{item.description}</Text> : null }
                <Text style={{color:'grey',fontSize:10}} numberOfLines={1}>Last Value : {item.lastvalue}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
    }

    const renderTrigger = (item) => {
      const severityDesc = ['Not Classified','Information','Warning','Average','High','Disaster']
      const severityColor = ['#97AAB3','#7499FF','#FFC859','#FFA059','#F37353','#E45959']
      return (
        <TouchableOpacity>
          <View style={styles.item}>
            <View style={{width:75}}><HostBox color={severityColor[Number(item.priority)]} number={null} status={severityDesc[Number(item.priority)]}/></View>
            <View style={styles.textBox}>
              <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{item.description}</Text>
              <Text style={{color:'grey',fontSize:12}} numberOfLines={1}>Manual Close : {item.manual_close ? 'Yes' : 'No'}</Text>
              <Text style={{color:'grey',fontSize:12}} numberOfLines={1}>Last Change : {new Date(item.lastchange * 1000).toISOString().slice(0, 19).replace('T', '   ')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={loading && {flex:1,justifyContent:'center',alignItems:'center'}}>
          { !loading ? (
            <>
              <View style={styles.contentContainer}>
                <List.Section>
                  <List.Accordion
                    title={`Host Items`}
                    left={props => <List.Icon {...props} color='white' icon="folder-search" />}
                  >
                    <TextInput
                      value={searchText}
                      multiline={true}
                      placeholder={'Search...'}
                      placeholderTextColor='lightgrey'
                      style={styles.input}
                      onChangeText = { (text) => setSearchText(text) }
                    />
                    <List.Item
                      right=  { props => { return <FlatList
                      data={ searchText!='' ? items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) : items}
                      keyExtractor={item => item.key_}
                      renderItem={ ({item}) => renderItem(item)}
                      />}
                    }
                    />
                  </List.Accordion>
                </List.Section>
              </View>
              <View style={styles.contentContainer}>
                <List.Section>
                  <List.Accordion
                    title={`Host Triggers`}
                    left={props => <List.Icon {...props} color='white' icon="fire" />}
                  >
                    <List.Item
                      right=  { props => { return <FlatList
                      data={triggers}
                      keyExtractor={item => item.triggerid}
                      renderItem={ ({item}) => renderTrigger(item)}
                      />}
                    }
                    />
                  </List.Accordion>
                </List.Section>
              </View>
          </>) :  <ActivityIndicator size="large" color='#2196f3' />
          }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#16171B',
        padding: 10
      },
      item: {
        flexDirection:'row',
        marginVertical: 10,
        backgroundColor: '#16171B',
        borderRadius: 5,
        shadowColor:'black',
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: 0.5,
        elevation: 1.5,
        padding: 10,
        width:350
      },
      textBox:{
        marginHorizontal: 10,
        flexDirection: 'column',
        justifyContent:'space-around',
        flexShrink: 1
      },
      input: {
        borderWidth: 1,
        backgroundColor: '#16171B',
        marginBottom: 10,
        borderColor: '#2196f3',
        borderWidth: 1.5,
        color: 'white',
        borderRadius: 5,
        marginHorizontal:15,
        paddingLeft:10
      },
      contentContainer: {
        margin:15,
        backgroundColor: '#1F1F23',
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#16171B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        marginTop:20
      },
})

export default Items;
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native'
import GetItems from '../../service/GetItems'
import HostBox from '../components/shared/HostBox'

const Items = ({route}) => {
    // Getting the items from zabbix
    const [ mounted, setMounted ] = useState(true)
    const [ items, setItems ] = useState([])
    const [ loading, setLoading ] = useState(true)
    useEffect( async () => {
        const itemsResponse = await GetItems(route.params.token, route.params.hostID)
        await setItems(itemsResponse);
        setLoading(false)
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

    return (
        <View style={styles.container}>
          { !loading ? (
            <>
            <TextInput
            value={searchText}
            placeholder={'Search...'}
            placeholderTextColor='lightgrey'
            style={styles.input}
            onChangeText = { (text) => setSearchText(text) }
          />
          <FlatList 
            data={ searchText!='' ? items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) : items}
            keyExtractor={item => item.key_}
            renderItem={ ({item}) => renderItem(item)}
          />
          </>) : <ActivityIndicator size="large" color='#2196f3' />}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#16171B',
        justifyContent:'center',
        alignItems:'center',
        padding: 10
      },
      item: {
        flexDirection:'row',
        marginVertical: 10,
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
      input: {
        width: '100%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#16171B',
        marginBottom: 10,
        borderColor: '#2196f3',
        borderWidth: 1.5,
        color: 'white',
        borderRadius: 5
      },
})

export default Items;
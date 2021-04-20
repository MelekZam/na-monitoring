import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, SafeAreaView, LogBox } from 'react-native'
import { Checkbox, Button } from 'react-native-paper'
import AckRequest from '../../service/AckRequest'
import GetProblems from '../../service/GetProblems'
import { connect } from 'react-redux'
import AckItem from '../../src/components/AckItem'

const Acknowledge = ({ route, dispatch, navigation, listOfUsers }) => {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    const [ checked, setChecked ] = useState(false)
    const [ closed, setClosed ] = useState(false)
    const [ severity, setSeverity ] = useState(-1)
    const [ inputStyle, setInputStyle ] = useState('grey')
    const [ message, setMessage ] = useState('')
    const [ acknowledged, setAcknowledged ] = useState(false)
    const { id, token, name, history } = route.params
    const onBlur = () => {
        setInputStyle('grey')
    }
    const onFocus = () => {
        setInputStyle('#7f00f9')
    }
    const request = async () => {
        const reponse = await AckRequest(id, token, message, severity, closed, acknowledged)
        const problems = await GetProblems(token)
        const action = { type: 'UPDATE_PROBLEMS', value: problems}
        dispatch(action)
        navigation.goBack()
    }
    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={{fontSize:19,fontWeight:'bold',color:'white',marginBottom:20,textAlign:'center'}} >{name}</Text>
                <Text style={styles.title}>Message</Text>
                <View style={{borderColor: inputStyle, borderWidth: 1, padding: 5, borderRadius: 5}} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type here..."
                        placeholderTextColor={inputStyle}
                        numberOfLines={10}
                        multiline={true}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={message}
                        onChangeText={ (text) => setMessage(text) }
                    />
                </View>
                <View style={{flexDirection:'row', marginVertical:10,alignItems:'center'}}>
                    <Text style={styles.boxTitle}>Change Severity</Text>
                    <Checkbox 
                        color='#7f00f9'
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={ () => { setChecked(!checked); setSeverity(-1)}}
                    />
                </View>
                {checked ?<View style={{flexWrap: 'wrap',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Button style={styles.btn} color='#E45959' compact={true} mode={ severity === 5 ? 'contained' :'outlined' } onPress={() => setSeverity(5)}>Disaster</Button>
                    <Button style={styles.btn} color='#F37353' compact={true} mode={ severity === 4 ? 'contained' :'outlined' } onPress={() => setSeverity(4)}>high</Button>
                    <Button style={styles.btn} color='#FFA059' compact={true} mode={ severity === 3 ? 'contained' :'outlined' } onPress={() => setSeverity(3)}>Average</Button>
                    <Button style={styles.btn} color='#FFC859' compact={true} mode={ severity === 2 ? 'contained' :'outlined' } onPress={() => setSeverity(2)}>Warning</Button>
                    <Button style={styles.btn} color='#7499FF' compact={true} mode={ severity === 1 ? 'contained' :'outlined' } onPress={() => setSeverity(1)}>Information</Button>
                    <Button style={styles.btn} color='#97AAB3' compact={true} mode={ severity === 0 ? 'contained' :'outlined' } onPress={() => setSeverity(0)}>Not Classified</Button>
                </View> : null}
                <View style={{flexDirection:'row', marginVertical:10,alignItems:'center'}}>
                    <Text style={styles.boxTitle}>Acknowledge Problem</Text>
                    <Checkbox 
                        color='#7f00f9'
                        status={acknowledged ? 'checked' : 'unchecked'}
                        onPress={ () => setAcknowledged(!acknowledged)}
                    />
                </View>
                <View style={{flexDirection:'row', marginVertical:10,alignItems:'center'}}>
                    <Text style={styles.boxTitle}>Close Problem</Text>
                    <Checkbox 
                        color='#7f00f9'
                        status={closed ? 'checked' : 'unchecked'}
                        onPress={ () =>  setClosed(!closed) } />
                </View>
                { ( message !== '' || severity >= 0 || closed || acknowledged ) && <View style={{flex:1}}><Button color='#86CC89' mode='contained' onPress={request} >Update</Button></View>}
                <Text style={{marginTop:20,marginBottom:10,color:'white',fontSize:17,textAlign:'left'}}>History <Text style={{fontSize:15}}>{`(${history.length})`}</Text></Text>
                <SafeAreaView style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <FlatList
                        inverted={true}
                        data={history}
                        keyExtractor = { item => item.acknowledgeid }
                        renderItem = {item => <AckItem users={listOfUsers} item={item} />}
                    />
                </SafeAreaView>
            </View>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171B',
        flexDirection:'column'
    },
    contentContainer: {
        padding: 15,
        flex: 1,
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
      },
      textArea: {
        height: 150,
        textAlignVertical: 'top',
      },
      title: {
        color: 'white',
        textAlign:'left',
        fontSize: 16,
        marginVertical:5
      },
      btn: {
          margin:5,
      },
      boxTitle: {
        color: 'white',
        textAlign:'left',
        fontSize: 14,
        marginVertical:5
      }
})

const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Acknowledge);
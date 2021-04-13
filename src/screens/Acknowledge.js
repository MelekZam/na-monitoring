import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Checkbox, Button } from 'react-native-paper'

const Acknowledge = ({ route }) => {
    const [ checked, setChecked ] = useState(false)
    const [ closed, setClosed ] = useState(false)
    const [ severity, setSeverity ] = useState(0)
    const [ inputStyle, setInputStyle ] = useState('grey')
    const onBlur = () => {
        setInputStyle('grey')
    }
    const onFocus = () => {
        setInputStyle('#7f00f9')
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
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
                    />
                </View>
                <View style={{flexDirection:'row', marginVertical:10}}>
                    <Text style={styles.title}>Change Severity</Text>
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
                <View style={{flexDirection:'row', marginVertical:10}}>
                    <Text style={styles.title}>Close Problem</Text>
                    <Checkbox 
                        color='#7f00f9'
                        status={closed ? 'checked' : 'unchecked'}
                        onPress={ () =>  setClosed(!closed) } />
                </View>
            </View>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171B'
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
      }
})

export default Acknowledge;
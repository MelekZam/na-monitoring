import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable';

const HostBox = (props) => {
    return (
        <Animatable.View animation={ props.number!= null ? 'pulse' : ''} duration={1500} style={{backgroundColor: props.color, alignItems: 'center', justifyContent:'center', flexGrow: 1, height: 100}} >
            {!props.data ? <Animatable.View style={{justifyContent:'center',alignItems:'center'}} animation={props.number ? 'bounceIn' : ''} duration={1000}>
                                <Text style={{textAlign:'center',color: 'white', fontSize: 15,fontWeight:'bold'}}>{props.status}</Text>
                               {props.number!==null && <Text style={{color: 'white', fontSize: 15,fontWeight:'bold'}}>{props.number}</Text>}
                            </Animatable.View>
                        :<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
                            <Animatable.View animation='bounceIn' duration={1000}  style={{justifyContent:'center',alignItems:'center',flex:1}}>
                                {props.data.map( item => {
                                    return <Text style={{color: 'white', fontSize: 14,fontStyle:'italic',fontWeight:'bold'}} key={item.id}>{item.name}</Text>
                                })}
                            </Animatable.View>
                        </ScrollView>
            }
        </Animatable.View>
    )
}

const styles= StyleSheet.create({
    
})

export default HostBox;
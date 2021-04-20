import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import getHosts from '../../service/getHosts'
import GetProblems from '../../service/GetProblems'
import GetUsers from '../../service/GetUsers'

const Loading = ({ navigation, user,dispatch }) => {
    const [ mounted, setMounted ] = useState(true)

    // fetch for the first time when we are in loading screen
    useEffect( async () => {
        const problems = await GetProblems(user.token)
        const hosts = await getHosts(user.token)
        const users = await GetUsers(user.token)
        //update redux store with new data
        let action = {type: 'UPDATE', value: { hosts, problems }}
        dispatch(action)
        const action1= { type: 'ADD_USERS', value: users }
        dispatch(action1)
        navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardStack' }],
        })
    },[mounted])

    return (
        <View  style={styles.container}>
            <View style={styles.centeredContainer}>
                <View style={{flex:1,marginTop:120}}>
                    <LottieView source={require('../assets/loading.json')} autoPlay loop/>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.text}>Fetching Data From Zabbix . . .</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16171B',
        
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'aerial'
    },
    centeredContainer: {
        flex:1.75,
        justifyContent:'flex-end'
    }
})

const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Loading);
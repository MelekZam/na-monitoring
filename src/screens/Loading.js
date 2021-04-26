import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import getHosts from '../../service/getHosts'
import GetProblems from '../../service/GetProblems'
import GetUsers from '../../service/GetUsers'

const Loading = ({ navigation, user,dispatch, listOfUsers, socket }) => {
    const [ mounted, setMounted ] = useState(true)
    const [ changing, setChanging ] = useState(true)
    const [ points, setPoints ] = useState(0)

    // fetch for the first time when we are in loading screen
    useEffect( async () => {
        console.log(socket)
        try { const hosts = await getHosts(user.token)
        const promises = []
        promises[0] = GetProblems(user.token, [...hosts.network,...hosts.system])
        promises[1] = GetUsers(user.token)
        let problems, users
        await Promise.all(promises).then( results => {
            problems = results[0]
            users = results[1]
        })
        // update redux store with new data
        let action = {type: 'UPDATE', value: { hosts, problems }}
        dispatch(action)
        const action1= { type: 'ADD_USERS', value: users }
        dispatch(action1)
        navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardStack' }],
        })}
        catch(e) {
            console.log('error')
            setMounted(!mounted)
        }
    },[mounted])

    useEffect(() => {
        const interval = setTimeout(() => {
            setPoints((points+1)%3)
            setChanging(!changing)
        },1000)
        return () => clearTimeout(interval)
    }, [changing])

    return (
        <View  style={styles.container}>
            <View style={styles.centeredContainer}>
                <View style={{flex:1,marginTop:120}}>
                    <LottieView source={require('../assets/loading.json')} autoPlay loop/>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.text}>Fetching Data From Zabbix {points ===0 && '.'}{points ===1 && '. .'}{points ===2 && '. . .'}</Text>
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
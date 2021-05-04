import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import getHosts from '../../service/getHosts'
import GetProblems from '../../service/GetProblems'
import GetUsers from '../../service/GetUsers'

const Loading = ({ navigation, user, dispatch, listOfUsers, socket }) => {
    const [ mounted, setMounted ] = useState(true)
    const [ changing, setChanging ] = useState(true)
    const [ points, setPoints ] = useState(0)

    // fetch for the first time when we are in loading screen
    useEffect( async () => {
        try {
            const hosts = await getHosts(user.token)
            const promises = []
            promises[0] = GetProblems(user.token, [...hosts.network,...hosts.system], false)
            promises[1] = GetUsers(user.token)
            promises[2] = GetProblems(user.token, [...hosts.network,...hosts.system], true)
            let problems, users, problemsWithResolved
            await Promise.all(promises).then( results => {
                problems = results[0]
                users = results[1]
                problemsWithResolved = results[2]
            })
            // update redux store with new data
            let action = {type: 'UPDATE', value: { hosts, problems }}
            dispatch(action)
            const action1 = { type: 'ADD_USERS', value: users }
            dispatch(action1)
            const resolved = problemsWithResolved.filter(n => !problems.all.some(n2 => n.eventid == n2.eventid || n.host.id == n2.host.id || n.name == n2.name));
            const action2 = {type: 'UPDATE_RESOLVED', value: resolved}
            dispatch(action2)
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashboardStack' }],
            })
        }
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
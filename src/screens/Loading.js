import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import getHosts from '../../service/getHosts'
import GetProblems from '../../service/GetProblems'

const Loading = ({ navigation, user,dispatch }) => {
    const [ mounted, setMounted ] = useState(true)
    useEffect( async () => {
        const problems = await GetProblems(user.token)
        const hosts = await getHosts(user.token)
        let action = {type: 'UPDATE_HOSTS', value: hosts}
        dispatch(action)
        const action1 = {type: 'UPDATE_PROBLEMS', value: problems}
        dispatch(action1)
        setTimeout( () => navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardStack' }],
        }),1000);
    },[mounted])

    return (
        <View  style={styles.container}>
            <View style={styles.centeredContainer}>
                <View style={{flex:1,marginTop:120}}>
                    <LottieView source={require('../assets/loading.json')} autoPlay loop/>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.text}>Fetching Data From Zabbix</Text>
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
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import HostBox from '../components/shared/HostBox'
import Donut from '../components/shared/Donut'
import getHosts from '../../service/getHosts'
import GetProblems from '../../service/GetProblems'
import DropDown from '../components/Dropdown'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

PushNotification.createChannel(
  {
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
let goToProblems = () => {

}
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    goToProblems()
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

const Dashboard = ({ user, navigation, hosts, problems, dispatch }) => {
  
  goToProblems = () => {
    navigation.navigate('Problems')
  }

  const [ mounted, setMounted ] = useState(true)
  const { all, disaster, high, average, warning } = problems
  
  const checkNewProblems = ( newArray ) => {
    let res= 0
    const l= all.length
    const s= newArray.length
    for ( var i = 0; i < s; i++ ) {
      let temp= 0
      for ( var j = 0; j < l; j++ ) {
        if ( all[j].name !== newArray[i].name || all[j].eventid !== newArray[i].eventid ) temp++
      }
      if ( temp === l )
        res++
    }
    return res;
  }

  useEffect( () => {
    // fetch data every 30s 
    const interval = setTimeout( async () => {
      try {
        const hosts = await getHosts(user.token)
        const problems = await GetProblems(user.token, [...hosts.network,...hosts.system])
        // check if there are any new problems
        let newProblems= checkNewProblems( problems.all )
        if (newProblems) PushNotification.localNotification({
          channelId: "channel-id",
          title: "ALERT",
          message: newProblems>1 ? `${newProblems} new problems have been detected` : '1 new problem has been detected',
        });
        // update redux store with new data
        let action = {type: 'UPDATE', value: { hosts, problems }}
        console.log(action.value.hosts.system)
        dispatch(action)
    } catch(e) {
        console.log('error')
        setMounted(!mounted)
    }
    }, 60000 )
    return () => clearTimeout(interval) // clear fetch loop when logging out
  }, [problems,mounted])

  // data for donut graphs (problems)
  const data = [{
    percentage: disaster.length,
    color: '#E45959',
    max: 50
  }, {
    percentage: high.length,
    color: '#F37353',
    max: 50
  }, {
    percentage: average.length,
    color: '#FFA059',
    max: 50
  }, {
    percentage: warning.length,
    color: '#FFC859',
    max: 50
  }]


  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.titleBox}>
              <Text style={styles.title} >System Information</Text>
            </View>
            <Text style={{fontSize: 17,color: 'white',alignSelf: 'center', marginTop:10}} >Total Number Of Hosts : {hosts.network.length + hosts.system.length} </Text>
            <View style={{marginTop: 5,justifyContent:'space-around', flexDirection: 'row'}}>
              <HostBox color='#86CC89' number={hosts.available.length} status='Available'/>
              <HostBox color='#E45959' number={hosts.unavailable.length} status='Unvailable'/>
              <HostBox color='#97AAB3' number={hosts.unknown.length} status='Uknown'/>
            </View>
            <Text style={{fontSize: 17,color: 'white',alignSelf: 'center', marginTop:15}} >Problems By Severity</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center',marginTop: 5}}>
                  {data.map((p, i) => {
                    return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/>
                  })}
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <DropDown problems={problems} token={user.token} navigation={navigation} network={hosts.network} system={hosts.system} />
        </View>
      </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#16171B'
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
  },
  content: {
    margin: 10,
  },
  title: {
    color: 'white',
    textAlign:'left',
    fontSize: 19,
    marginLeft:5
  },
  titleBox: {
    backgroundColor: '#291756',
    width:'100%',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#1F1F23',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginVertical: 5,
    height:35,
    justifyContent:'center'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Dashboard);
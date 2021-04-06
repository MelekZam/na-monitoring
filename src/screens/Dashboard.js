import React from 'react'
import { View, Text, StyleSheet,Button } from 'react-native'
import { color } from 'react-native-reanimated'
import { connect } from 'react-redux'
import HostBox from '../components/shared/HostBox'
import Donut from '../components/shared/Donut'

const Dashboard = (props) => {
  const data = [{
    percentage: 19,
    color: '#E45959',
    max: 100
  }, {
    percentage: 14,
    color: '#F37353',
    max: 100
  }, {
    percentage: 40,
    color: '#FFA059',
    max: 100
  }, {
    percentage: 10,
    color: '#FFC859',
    max: 100
  }]
  return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.titleBox}>
              <Text style={styles.title} >System Information</Text>
            </View>
            <Text style={{fontSize: 15,color: 'white',alignSelf: 'center', marginTop:10}} >Total Number Of Hosts : 15</Text>
            <View style={{marginTop: 5,justifyContent:'space-around', flexDirection: 'row'}}>
              <HostBox color='#86CC89' number={8} status='Available'/>
              <HostBox color='#E45959' number={5} status='Unvailable'/>
              <HostBox color='#97AAB3' number={2} status='Uknown'/>
            </View>
            <Text style={{fontSize: 15,color: 'white',alignSelf: 'center', marginTop:15}} >Problems By Severity</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center',marginTop: 5}}>
                  {data.map((p, i) => {
                    return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/>
                  })}
            </View>
          </View>
        </View>
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
    fontSize: 17,
    marginLeft:5
  },
  titleBox: {
    backgroundColor: '#291756',
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
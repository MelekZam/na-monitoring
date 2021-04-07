import React from 'react'
import { View, Text, StyleSheet,Button } from 'react-native'
import GetProblems from '../../service/GetProblems'
import { connect } from 'react-redux'


const Problems = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{color:'#FFF'}}>Problems</Text>
            <Button title='get' onPress={ () => GetProblems(props.user.token)}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#16171B'
    }
  })

  const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(Problems);
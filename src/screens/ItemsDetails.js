import React from 'react'
import { View, Text,StyleSheet,Dimensions, ScrollView } from 'react-native'
import GetHistory from '../../service/GetHistory'
import GetItemLastData from '../../service/GetItemLastData'
import {connect} from 'react-redux'
import { useState,useEffect } from 'react'
import {SlideAreaChart} from "react-native-slide-charts"
import { parse } from 'react-native-svg'















 function ItemsDetails({route,user}) {
    const [data,setData]=useState([]);
    const [trigger,setTrigger]=useState(true);
    useEffect(
      
        async() => {
         var response;
        try{
            if(route.params.value_type ==0 || route.params.value_type ==3){
            response = await GetHistory(user.token,route.params.itemid,route.params.value_type); 
         
           const array = response.map(item=>{
             return (
                    {x: item.clock,
                     y: item.value,
            })
           })  
           console.log(visible)
           setData(array )}
           
          
          
           
         }
         catch(erorr){
             console.log(erorr)
             setVisible(!visible)
         }
        
       
         
     }, [visible])

    
    
    
    
   
   
   
  useEffect(async()=>{
    let interval;
    const array=data;

           interval=setTimeout(async ()=>{
          const responseUpdated = await GetItemLastData(user.token,route.params.itemid)
          
              
              array.shift()
              array.push({
                x:responseUpdated[0].lastclock,
                y:parseInt(responseUpdated[0].lastvalue)
              })
            
            console.log("updating array")
            setData(array)
            console.log(data[data.length - 1])

      },30000)
        
      
      

      return ()=> clearTimeout(interval)
    },[trigger,data]) 
    
   
 
 
 const [visible,setVisible]=useState(true);

  
  return (
        <View style={Styles.container}>
          <View style={{flex:1}}>
              <View style={Styles.view}>
              
                  <Text style={Styles.text}>name</Text>
                  <Text style={Styles.value}>{route.params.name}</Text>
              </View>
              <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                  }}
                />
             
              <View style={Styles.view}>
                  <Text style={Styles.text}>status</Text>
                  <Text style={Styles.value}>{route.params.status}</Text>
                  

              </View>
              <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                  }}
                />
              <View style={Styles.view}>
                <Text style={Styles.text}>value</Text>
                <Text style={Styles.value}>{route.params.lastvalue}</Text>
              </View>
              <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                  }}
                />
              
              <View style={Styles.view}>
                      <Text style={Styles.text}>key</Text>
                      <Text style={Styles.value}>{route.params.key_}</Text>
              </View>

              <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    backgroundColor:"yellow"
                  }}
                />
              
              
                  
                          <View style={{flexDirection:"column",}}>
                          <Text style={Styles.text}>description</Text>
                          <Text style={Styles.value} numberOfLines={3}>{route.params.description}</Text>
                          </View>
               
          </View>
          <View style={{flex:3,marginTop:60,paddingRight:10}}>          
          <SlideAreaChart
            scrollable={true}
            style={{ 
              marginTop:60,
              backgroundColor:"#16171B",
              
            }}
            cursorProps={
               { 
                   cursorColor:"#7f00f9",
            }
            }
            shouldCancelWhenOutside={false}
            data={data}
            height={300}
            widh={Dimensions.get('window').width-100}
            axisWidth={16}
            axisHeight={12}
            paddingBottom={8}
            yAxisProps={{
              verticalLineWidth: 1,
              axisLabel: 'value',
              axisLabelAlignment: 'middle',
              rotateAxisLabel: true,
              numberOfTicks: 2,
              hideMarkers: true,
            }}
            xAxisProps={{
              axisLabel: 'time',
            }}
            toolTipProps={{
              toolTipTextRenderers: [
                ({ scaleY, y }) => ({
                  text: `Value : ${scaleY
                    .invert(y)
                    .toFixed(2)
                    .toString()}`
                }),
                ({ scaleX, x}) => ({
                  text: new Date(scaleX.invert(x) * 1000).toISOString().slice(0, 19).replace('T', '   ')
                })
              ],
            }}
          />
          </View>

                  
        </View>
    )
}


const Styles= StyleSheet.create({
    container :{
      backgroundColor :"#16171B",
      flex :1,
      justifyContent:"space-between",
    },
    text :{
      color :"white",
      fontSize:20,
      marginLeft:7,
      fontStyle:'italic'
      
    },
    value:{
      position:"relative",
      marginRight:0,
      color:"white",
      fontSize: 16,
      textAlign:"right",
      fontStyle:'italic'
    },
    view:{
      flexDirection:"row",
      justifyContent:"space-between",
      
    },
})


function mapStateToProps(state){
  return state;

}


export default connect(mapStateToProps)(ItemsDetails)
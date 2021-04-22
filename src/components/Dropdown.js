import React, { Component, useEffect, useState } from 'react';
import { List, Colors } from 'react-native-paper'
import { View, Text, ScrollView } from 'react-native' 
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons'

const DropDown = ({ token, system, network, navigation, problems }) => {
    
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [mountedSystem, setMountedSystem] = useState(false);
  const [mountedNetowrk, setMountedNetwork] = useState(false);
  const [showSystem, setShowSystem] = useState(false)
  const [showNetwork, setShowNetwork] = useState(false)

  let interval;
  let interval1;

  useEffect(() => {
    if (showSystem)
      interval = setTimeout(() => setMountedSystem(!mountedSystem), 1500)
    else
      clearTimeout(interval)
    return () => clearTimeout(interval)
  }, [mountedSystem,showSystem])

  useEffect(() => {
    if (showNetwork)
      interval1 = setTimeout(() => setMountedNetwork(!mountedNetowrk), 1500)
    else
      clearTimeout(interval1)
    return () => clearTimeout(interval1)
  }, [mountedNetowrk,showNetwork])


  
    return (
      <ScrollView>
        <List.Section >
          <List.Accordion
            title={`System Hosts  (${system.length})`}
            left={props => <List.Icon {...props} color='white' icon="server" />}
            onPress={() => setShowSystem(!showSystem)}
          >
            {system.map((item) => {
                return <List.Item style={{paddingHorizontal:35}} key={item.id} title={item.name}
                          right={props =>{  if (problems.disaster.filter(problem => problem.host.id === item.id).length ) return <List.Icon {...props} color='#E45959' icon={mountedSystem ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.high.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#F37353' icon={mountedSystem ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.average.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFA059' icon={mountedSystem ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.warning.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFC859' icon={mountedSystem ? "alert-circle-outline" : "alert-circle"} />
                        }}
                          onPress={ () => { navigation.navigate('Items', {
                            name:item.name,
                            hostID: item.id,
                            token,
                            }
                          )}}
                        />
              })}
          </List.Accordion>
    
          <List.Accordion
            title={`Network Hosts  (${network.length})`}
            left={props => <List.Icon {...props} color='white' icon="router" />}
            onPress={() => setShowNetwork(!showNetwork)}
            >
              {network.map((item) => {
                return <List.Item style={{paddingHorizontal:35}} key={item.id} title={item.name}
                          right={props =>{  if (problems.disaster.filter(problem => problem.host.id === item.id).length ) return <List.Icon {...props} color='#E45959' icon={mountedNetowrk ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.high.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#F37353' icon={mountedNetowrk ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.average.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFA059' icon={mountedNetowrk ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.warning.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFC859' icon={mountedNetowrk ? "alert-circle-outline" : "alert-circle"} />
                        }}
                        onPress={ () => { navigation.navigate('Items', {
                          name: item.name,
                          hostID: item.id,
                          token,
                          }
                        )}}
                      />
              })}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    );
  };
  
  export default DropDown;
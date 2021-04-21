import React, { Component, useEffect, useState } from 'react';
import { List, Colors } from 'react-native-paper'
import { View, Text, ScrollView } from 'react-native' 
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons'

const DropDown = ({ token, system, network, navigation, problems }) => {
    
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const interval = setTimeout(() => {setMounted(!mounted);console.log('test')}, 2000)
    return () => clearTimeout(interval)
  }, [mounted])
  
    return (
      <ScrollView>
        <List.Section >
          <List.Accordion
            title={`System Hosts  (${system.length})`}
            left={props => <List.Icon {...props} color='white' icon="server" />}
          >
            {system.map((item) => {
                return <List.Item style={{paddingHorizontal:35}} key={item.id} title={item.name}
                          right={props =>{  if (problems.disaster.filter(problem => problem.host.id === item.id).length ) return <List.Icon {...props} color='#E45959' icon={mounted ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.high.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#F37353' icon={mounted ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.average.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFA059' icon={mounted ? "alert-circle-outline" : "alert-circle"} />
                                            else if (problems.warning.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFC859' icon={mounted ? "alert-circle-outline" : "alert-circle"} />
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
            expanded={expanded}
            onPress={handlePress}
            >
              {network.map((item) => {
                return <List.Item style={{paddingHorizontal:35}} key={item.id} title={item.name}
                          right={props =>{  if (problems.disaster.filter(problem => problem.host.id === item.id).length ) return <List.Icon {...props} color='#E45959' icon="alert-circle-outline" />
                                            else if (problems.high.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#F37353' icon="alert-circle-outline" />
                                            else if (problems.average.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFA059' icon="alert-circle-outline" />
                                            else if (problems.warning.filter(problem => problem.host.id === item.id).length) return <List.Icon {...props} color='#FFC859' icon="alert-circle-outline" />
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
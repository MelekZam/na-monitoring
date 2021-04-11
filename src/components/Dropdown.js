import React, { Component } from 'react';
import { List, Colors } from 'react-native-paper'
import { View, Text, ScrollView } from 'react-native' 
import { NavigationContainer } from '@react-navigation/native';

const DropDown = ({ token, system, network, navigation }) => {
    
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  
    return (
      <ScrollView>
        <List.Section >
          <List.Accordion
            title={`System Hosts  (${system.length})`}
            left={props => <List.Icon {...props} icon="server" />}
          >
            {system.map((item) => {
                return <List.Item key={item.id} title={item.name}
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
            left={props => <List.Icon {...props} icon="router" />}
            expanded={expanded}
            onPress={handlePress}
            >
              {network.map((item) => {
                return <List.Item key={item.id} title={item.name}
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
import React, { Component } from 'react';
import { List, Colors } from 'react-native-paper'
import { View, Text, ScrollView } from 'react-native' 

const DropDown = ({system,network}) => {
    console.log(system)
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
                return <List.Item onPress={ () => { }} key={item.id} title={item.name} />
              })}
          </List.Accordion>
    
          <List.Accordion
            title={`Network Hosts  (${network.length})`}
            left={props => <List.Icon {...props} icon="router" />}
            expanded={expanded}
            onPress={handlePress}
            >
              {network.map((item) => {
                return <List.Item onPress={ () => { }} key={item.id} title={item.name} />
              })}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    );
  };
  
  export default DropDown;
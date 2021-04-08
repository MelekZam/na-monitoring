import React, { Component } from 'react';
import { List, Colors } from 'react-native-paper'


const DropDown = () => {
    const [expanded, setExpanded] = React.useState(false);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
      <List.Section >
        <List.Accordion
          title="System Hosts"
          left={props => <List.Icon {...props} icon="server" />}
        >
          <List.Item title="Server 1" />
          <List.Item title="Server 2" />
        </List.Accordion>
  
        <List.Accordion
          title="Network Hosts"
          left={props => <List.Icon {...props} icon="router" />}
          expanded={expanded}
          onPress={handlePress}
          >
          <List.Item descriptionStyle={{color: 'red'}} onPress={ () => console.log('aaa')} title="Switch" />
          <List.Item title="Router" />
        </List.Accordion>
      </List.Section>
    );
  };
  
  export default DropDown;
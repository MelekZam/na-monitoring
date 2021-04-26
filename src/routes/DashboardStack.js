import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import Problems from '../screens/Problems';
import DrawerContent from '../components/DrawerContent'
import Chat from '../screens/Chat';

const Drawer = createDrawerNavigator();

const DashboardStack = () => {
    const customHeader = {
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#16171B',
            shadowColor: 'transparent'
        }
    }
    return (
            <Drawer.Navigator initialRouteName="Dashboard" drawerContent={ props => <DrawerContent {...props} />} >
                <Drawer.Screen name="Dashboard" component={Dashboard} options={customHeader}/>
                <Drawer.Screen name="Problems" component={Problems} options={customHeader}/>
                <Drawer.Screen name="Chat" component={Chat} options={customHeader}/>
            </Drawer.Navigator>
    )
}

export default DashboardStack;
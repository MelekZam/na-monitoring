import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import Problems from '../screens/Problems';


const Drawer = createDrawerNavigator();

const DashboardStack = () => {
    return (
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={Dashboard} options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTintColor: 'white',
                    headerStyle:{
                        backgroundColor: '#16171B',
                        shadowColor: 'transparent'
                    }
                    
                }}/>
                <Drawer.Screen name="Problems" component={Problems} options={{
                     headerShown: true,
                     headerTitleAlign: 'center',
                     headerTintColor: 'white',
                     headerStyle:{
                         backgroundColor: '#16171B',
                         shadowColor: 'transparent'
                     }
                }}/>
            </Drawer.Navigator>
    )
}

export default DashboardStack;
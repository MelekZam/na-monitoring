import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome'
import LogIn from '../screens/LogIn'

const Stack = createStackNavigator();

const WelcomeStack = () => {

  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
          <Stack.Screen
            name='Welcome'
            component={Welcome}
          />
          <Stack.Screen
            name='LogIn'
            component={LogIn}
          />
      </Stack.Navigator>
  )
}


export default WelcomeStack;
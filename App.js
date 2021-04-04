import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeStack from './src/routes/WelcomeStack'
import Store from './redux/store/ConfigureStore'
import { Provider } from 'react-redux'


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="WelcomeStack"
            component={WelcomeStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


export default App;
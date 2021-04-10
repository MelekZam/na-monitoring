import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome'
import LogIn from '../screens/LogIn'
import Verify from '../screens/Verify'
import DashboardStack from '../routes/DashboardStack';
import { connect } from 'react-redux'
import Loading from '../screens/Loading';
import Items from '../screens/Items'
// import Store from '../../redux/store/ConfigureStore'
// import userInfo from '../../redux/reducers/reducer'

const Stack = createStackNavigator();

const WelcomeStack = (props) => {
   
  return (
      <Stack.Navigator>
          { !props.isLoggedIn ? (<>
            <Stack.Screen
              options={{headerShown: false}}
              name='Welcome'
              component={Welcome}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name='LogIn'
              component={LogIn}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name='Verify'
              component={Verify}
            />
          </>) : (<>
            <Stack.Screen name='Loading' component={Loading} options={{
                headerShown: false
            }}/>
            <Stack.Screen
              name='DashboardStack'
              component={DashboardStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='Items'
              component={Items}
              options={({ route }) => ({ title: route.params.name,headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#16171B',
                    shadowColor: 'transparent'
                }, })}
            />
          </>)
          }

      </Stack.Navigator>
  )
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(WelcomeStack);
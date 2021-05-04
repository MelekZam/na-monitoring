import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome'
import LogIn from '../screens/LogIn'
import Verify from '../screens/Verify'
import ItemsDetails from '../screens/ItemsDetails'
import DashboardStack from '../routes/DashboardStack';
import { connect } from 'react-redux'
import Loading from '../screens/Loading';
import Items from '../screens/Items'
import Acknowledge from '../screens/Acknowledge'
import Conversation from '../screens/Conversation'
import Icon from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

const WelcomeStack = (props) => {
  const customHeader = {
    headerShown: true,
    headerTitleAlign: 'center',
    title: '',
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#16171B',
        shadowColor: 'transparent'
    }
  }
   /* if user is already logged in go to loading screen => dashboard, else go to welcome screen */
  return (
      <Stack.Navigator>
          { !props.isLoggedIn ? (<>
            <Stack.Screen
              options={{headerShown: false}}
              name='Welcome'
              component={Welcome}
            />
            <Stack.Screen
              options={customHeader}
              name='LogIn'
              component={LogIn}
            />
            <Stack.Screen
              options={customHeader}
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
              screenOptions={{
                unmountOnBlur: true,
              }}
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
                },}
              )}
            />
            <Stack.Screen
              name='Acknowledge'
              component={Acknowledge}
              options={() => ({ headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#16171B',
                    shadowColor: 'transparent'
                },}
              )}
            />
            <Stack.Screen
              name='Item Details'
              component={ItemsDetails}
              options={() => ({ 
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#16171B',
                    shadowColor: 'transparent'
                }, })}
            />
            <Stack.Screen
              name='Conversation'
              component={Conversation}
              options={( {route} ) => ({ headerShown: true,
                title: route.params.username,
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerRight: () => <View style={{marginRight:50,alignItems:'center',justifyContent:'center',}}><Icon name='circle' size={15} color='#86CC70' style={{paddingTop:5}}/></View>,
                headerStyle: {
                    backgroundColor: '#16171B',
                    shadowColor: 'transparent'
                },}
              )}
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
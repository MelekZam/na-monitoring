import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux'
import LogoutRequest from '../../service/LogoutRequest'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome5'

const DrawerContent = (props) => {
    const [ showAlert, setShowAlert ] = useState(false);
    const [paperTheme, setPaperTheme] = useState(false)
    const toggleTheme = () => {
        setPaperTheme(!paperTheme)
    }
    // Logout function
    const logOut = async () => {
        setShowAlert(false)
        await LogoutRequest(props.user.token)
        try {
          await AsyncStorage.removeItem('user')
          await AsyncStorage.removeItem('isLoggedIn')
        } catch(e) {
            console.log(e)
        }
        const action = {type: 'LOGOUT'}
        props.dispatch(action)
      }
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'column',marginTop: 15}}>
                            <View style={styles.imageView}>
                                <Image
                                style={{resizeMode:'center'}}
                                    source={ require('../assets/zabbix.png')}
                                />
                            </View>
                            <View style={{alignItems:'center', flexDirection:'row', justifyContent:'flex-start'}}>
                                <Icon 
                                    name="user-alt"
                                    style={{marginBottom: 'auto',marginTop: 'auto'}}
                                />
                                <Title style={styles.title}>{props.user.nickname}</Title>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="chart-pie" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Dashboard"
                            onPress={() => {props.navigation.navigate('Dashboard')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="exclamation-circle" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Problems"
                            onPress={() => {props.navigation.navigate('Problems')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                solid
                                name="comments" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Chat"
                            onPress={ () => { }}
                        />
                        
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View >
                                    <Switch value={paperTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="door-open" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { setShowAlert(true) }}
                />
            </Drawer.Section>
            <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Attention"
                    message="You won't receive any notifications from our app if you Log Out. Are you sure you want to continue?"
                    closeOnTouchOutside={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    confirmText="Log Out"
                    cancelText="Cancel"
                    confirmButtonColor="#DD6B55"
                    overlayStyle={{height:'100%'}}
                    onConfirmPressed={() => {
                        logOut();
                    }}
                    onCancelPressed={() => { setShowAlert(false) }}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    imageView:{
        height:75,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    title: {
      marginLeft: 5,
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      marginBottom: 'auto',
      marginTop: 'auto'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  const mapStateToProps = (state) => {
    return state;
  }
  
  export default connect(mapStateToProps)(DrawerContent);
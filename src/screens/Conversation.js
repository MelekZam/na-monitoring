import React from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';


const Conversation = () =>  {

    const Message = () => {
        {<LinearGradient
            style={styles.fromMe}
            colors={['#4776E6','#8E54E9']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        >
            <Text style={{color:'white'}} >Hello ! What's up ?</Text>
        </LinearGradient>}
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                {}
            </ScrollView>
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Type here..."
                    placeholderTextColor='grey'
                    numberOfLines={2}
                    multiline={true}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#16171B',
        padding: 10
    },
    contentContainer:{
        flex: 1,
        backgroundColor: '#16171B',
        paddingBottom:10
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 35,
        marginTop:10
    },
    textArea: {
        height: 70,
        textAlignVertical: 'top',
        color:'white',
        marginLeft:10
    },
    fromMe: {
        padding: 10,
        alignSelf: 'flex-end',
        borderRadius: 15,
        borderTopRightRadius: 0
    },
    toMe: {
        padding: 10,
        alignSelf: 'flex-start',
        borderRadius: 15,
        borderTopLeftRadius: 0
    }
})

export default Conversation
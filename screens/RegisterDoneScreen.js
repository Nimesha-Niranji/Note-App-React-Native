import LottieView from 'lottie-react-native'
import React from 'react'
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RegisterDoneScreen = ({navigation}) => {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000080'}} >
    <View style={styles.container} >

      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#000080"  />
      <LottieView source={require('../assets/registerDone.json')} style={styles.lottie} resizeMode='contain' autoPlay loop />
      <TouchableOpacity title='Go Back to Login' style={styles.button} onPress={() => navigation.navigate('Login Page')}  >
        <Text style={styles.text} >Go Back to Login</Text>
      </TouchableOpacity>
      <Image source={require('../assets/logoEmb.png')} style={styles.logoEmb} resizeMode='contain' />
    
    </View>
    </SafeAreaProvider>
  )
}

export default RegisterDoneScreen

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'column',
      //justifyContent: 'center',
      backgroundColor: '#000080',
      alignItems: 'center'
    },
  
    logoEmb:{
      height:150,
      width:400,
      alignItems: 'center',
    },
  
    button:{
      height:50,
      width:300,
      backgroundColor: '#71FF88',
      borderRadius: 8,
      marginBottom:10,
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    text:{
      fontSize:25,
    },
  
    lottie:{
      width:200,
      height:500,
      marginBottom:10
    }
  })

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { Input } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageurl] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const [loading, setLoading] = useState(false);

  const register = () => {
    if (!email || !password || !name) {
      alert('Please fill in Email, Password, and Name fields');
      return;
    }

    setLoading(true);

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Update user profile
        user.updateProfile({
          displayName: name,
          photoURL: imageUrl || "https://www.seekpng.com/png/detail/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png",
        })
        .then(() => {
          // Profile updated successfully
        })
        .catch((error) => {
          console.error('Profile update error:', error.message);
        })
        .finally(() => {
          setLoading(false);
        });

        navigation.navigate('RegisterDone', { deviceID: deviceID });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        setLoading(false);
      });
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#000080' }} >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#000080" />
          <View style={styles.container4}>
            <LottieView source={require('../assets/register.json')} style={styles.lottie} resizeMode='contain' autoPlay />
            <Text style={styles.text}>Register</Text>
          </View>

          <View style={styles.container2}>
            <Input
              style={styles.input}
              placeholder='Enter Name'
              value={name}
              label='Name'
              labelStyle={styles.label}
              leftIcon={{ type: 'material', name: 'person', color: 'white' }}
              leftIconContainerStyle={styles.leftIcon}
              onChangeText={text => setName(text)}
            />

            <Input
              style={styles.input}
              placeholder='Enter Email'
              value={email}
              label='Email'
              labelStyle={styles.label}
              leftIcon={{ type: 'material', name: 'email', color: 'white' }}
              leftIconContainerStyle={styles.leftIcon}
              onChangeText={text => setEmail(text)}
            />

            <Input
              style={styles.input}
              placeholder='Enter Device ID'
              value={deviceID}
              label='Device ID'
              labelStyle={styles.label}
              leftIcon={{ type: 'material', name: 'devices', color: 'white' }}
              leftIconContainerStyle={styles.leftIcon}
              onChangeText={text => setDeviceID(text)}
            />

            <View style={styles.passwordView}>
              <Input
                style={styles.input}
                placeholder='Enter Password'
                label='Password'
                labelStyle={styles.label}
                leftIcon={{ type: 'material', name: 'lock', color: 'white' }}
                leftIconContainerStyle={styles.leftIcon}
                secureTextEntry={isPasswordShown}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={styles.isPassword}
              >
                {
                  isPasswordShown ? (
                    <Ionicons name='eye-off' size={24} color='white' />
                  ) : (
                    <Ionicons name='eye' size={24} color='white' />
                  )
                }
              </TouchableOpacity>
            </View>

            <Input
              style={styles.input}
              placeholder="Enter Your Image URL"
              value={imageUrl}
              label="Profile Picture"
              labelStyle={styles.label}
              leftIcon={{ type: 'material', name: 'face', color: 'white' }}
              leftIconContainerStyle={styles.leftIcon}
              onChangeText={text => setImageurl(text)}
            />
          </View>

          <View style={styles.container3}>
            <TouchableOpacity title='Register' style={styles.loginBtn} onPress={register}>
              <Text style={styles.textLoginBtn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000080',
    //alignItems: 'center',
  },

  container2: {
    height: '35%',
    alignItems: 'center',
  },

  container3: {
    alignItems: 'center',
  },

  container4: {
    height: '23%',
    alignItems: 'center',
  },

  lottie: {
    height: 100,
    width: 50,
  },

  text: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30,
  },

  label: {
    color: 'white',
    marginLeft: 10,
  },

  leftIcon: {
    color: 'white',
    marginRight: 5,
    marginLeft: 10,
  },

  input: {
    color: 'white',
    borderColor: 'white',
  },

  isPassword: {
    position: 'absolute',
    right: 12,
  },

  passwordView: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  loginBtn: {
    width: 300,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#71FF88',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  textLoginBtn: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

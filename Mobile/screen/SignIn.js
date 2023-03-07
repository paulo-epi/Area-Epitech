import React, { useState } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { MyTextInput, MyPasswordInput } from '../components/Input';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { url } from '../components/Variables';
import { fetchData } from '../utils/api';

export function Connection({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      console.log('Done.');
      await AsyncStorage.setItem('isConnected', 'true');
      console.log('User is connected.');
    } catch (e) {
      console.log(e);
    }
  }

  const onLogin = async () => {
    var fdata = new FormData();
    fdata.append('email', email);
    fdata.append('password', password);

    if (!email || !password) {
      alert('Email and password are required.');
    }
    else {
      try {
        const data = await fetchData(url + 'login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: fdata
        });
        const token = data.token;
        console.log(token);
        storeData(token);
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ position: 'absolute', top: 50, left: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ServerConnect')}>
          <Text style={{ color: '#666' }}>
            Change IP?
          </Text>
        </TouchableOpacity>
      </View> */}
      <MyTextInput
        name='ios-mail-outline'
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="rgba(255,255,255,0.4)"
      />

      <MyPasswordInput
        name='ios-lock-closed-outline'
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        placeholderTextColor="rgba(255,255,255,0.4)"
      />

      <TouchableOpacity onPress={() => { }}>
        <Text style={styles.textforgotpassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={(onLogin)} style={styles.button}>
        <Text style={styles.button.text}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.orLogin}>Or log in with:</Text>

      <View style={styles.ConnectButton}>
        <TouchableOpacity onPress={() => { }} style={styles.ConnectButton.button}>
          <Image source={require('../assets/google-icon.png')} style={styles.ConnectButton.icon} />
          <Text style={styles.ConnectButton.text}>Log in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.ConnectButton.button}>
          <Image source={require('../assets/github-white-icon.png')} style={styles.ConnectButton.icon} />
          <Text style={styles.ConnectButton.text}>Log in with Github</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.inscription}>
        <Text>Don't have an account? </Text>
        <Text style={styles.inscription.clickable} onPress={() => navigation.navigate('Register')}>Sign up</Text>
      </Text>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#22272e', // black
  },
  button: {
    text: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      display: 'flex',
      alignSelf: 'center',
    },
    width: '80%',
    height: 'auto',
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 15,
    backgroundColor: '#316dca', // blue
    padding: 5,
    alignSelf: 'center',
  },
  textforgotpassword: {
    color: 'white',
    fontSize: 15,
    marginBottom: 15,
    marginTop: -10,
    marginLeft: 43,
  },
  orLogin: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 15,
    color: '#fff',
    alignSelf: 'center',
  },
  ConnectButton: {
    text: {
      color: 'white',
      fontSize: 20,
      alignSelf: 'center',
      marginLeft: 15,
    },
    icon: {
      width: 25,
      height: 25,
    },
    button: {
      flexDirection: 'row',
      borderColor: '#ddd',
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 10,
    },
    flexDirection: 'column',
    width: 'auto',
    alignSelf: 'center',
  },
  inscription: {
    clickable: {
      color: '#316dca', // blue
    },
    marginTop: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    display: 'flex',
    textAlign: 'left',
    alignSelf: 'center',
  },
});

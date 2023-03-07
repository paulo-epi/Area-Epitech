import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { MyPasswordInput, MyTextInput } from '../components/Input.js';

import { url } from '../components/Variables';
import { fetchData } from '../utils/api.js';

export function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verif, setVerif] = useState("");

  const onRegister = async () => {
    if (!email || !password || !verif) {
      alert('All fields are required.');
    }
    else {
      if (password == verif) {
        var fdata = new FormData();
        fdata.append('email', email);
        fdata.append('password', password);

        try {
          const data = await fetchData(url + 'register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: fdata
          });
          navigation.navigate('Login');
          alert('Welcome! You can login now');
        } catch (error) {
          console.log(error);
        }
      }
      else {
        alert('Passwords do not match. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyTextInput
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address" secureTextEntry={false}
        placeholderTextColor="rgba(255,255,255,0.4)"
        name='ios-mail-outline'
      />

      <MyPasswordInput
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        keyboardType="password"
        secureTextEntry={true}
        placeholderTextColor="rgba(255,255,255,0.4)"
        name='ios-lock-closed-outline'
      />

      <MyPasswordInput
        value={verif}
        placeholder="Password verification"
        onChangeText={setVerif}
        keyboardType="password"
        secureTextEntry={true}
        placeholderTextColor="rgba(255,255,255,0.4)"
        name='ios-checkmark'
      />

      <TouchableOpacity onPress={(onRegister)} style={styles.button}>
        <Text style={styles.button.texte}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.orRegister}>Or register with:</Text>

      <View style={styles.ConnectButton}>
        <TouchableOpacity onPress={() => { }} style={styles.ConnectButton.button}>
          <Image source={require('../assets/google-icon.png')} style={styles.ConnectButton.icon} />
          <Text style={styles.ConnectButton.text}>Register with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.ConnectButton.button}>
          <Image source={require('../assets/github-white-icon.png')} style={styles.ConnectButton.icon} />
          <Text style={styles.ConnectButton.text}>Register with Github</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.inscription}>
        <Text>Already have an account? </Text>
        <Text style={styles.inscription.clickable} onPress={() => navigation.navigate('Login')}>Sign in</Text>
      </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22272e', // black
  },
  button: {
    texte: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      display: 'flex',
      alignSelf: 'center',
    },
    width: '80%',
    height: 'auto',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#316dca', // blue
    padding: 5,
  },
  orRegister: {
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

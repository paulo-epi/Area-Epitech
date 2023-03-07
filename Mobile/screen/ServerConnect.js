import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { MyTextInput } from "../components/Input";

export function ServerConnect({ navigation }) {
  const [serverIP, setServerIP] = useState("");

  const onConnect = () => {
    if (serverIP.trim() === '') {
      alert('Server IP is required.');
      return;
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyTextInput
        name='server-outline'
        value={serverIP}
        placeholder="Server IP"
        onChangeText={setServerIP}
        keyboardType="numeric"
        placeholderTextColor="rgba(255,255,255,0.4)"
      />
      <TouchableOpacity style={styles.button} onPress={(onConnect)} >
        <Text style={styles.button.text}>Connect to server</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22272e", // black
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
});
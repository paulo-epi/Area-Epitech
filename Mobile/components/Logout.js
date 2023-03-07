import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const MyLogout = ({ navigation }) => {
  const handleClick = () => {
    AsyncStorage.removeItem("@storage_Key")
      .then(() => console.log("Remove jwt."))
      .catch(error => console.log(error));
    AsyncStorage.removeItem("isConnected")
      .then(() => console.log("User is disconnected."))
      .catch(error => console.log(error));
    console.log("Logout");
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={(handleClick)} style={styles.button}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
  },
  button: {
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

export default MyLogout;

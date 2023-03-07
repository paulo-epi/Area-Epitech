import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import IonIcon from "react-native-vector-icons/Ionicons"

export function MyTextInput(props) {
  return (
    <View style={styles.input}>
      <IonIcon name={props.name} size={20} color="#316dca" style={{ marginRight: 10 }} />
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(text) => props.onChangeText(text)}
        style={styles.textInput}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}

export function MyPasswordInput(props) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View style={styles.input}>
      <IonIcon name={props.name} size={20} color="#316dca" style={{ marginRight: 10 }} />
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(text) => props.onChangeText(text)}
        style={styles.textInput}
        keyboardType={props.keyboardType}
        secureTextEntry={isPasswordSecure}
      />
      <IonIcon name={isPasswordSecure ? 'ios-eye-off-outline' : 'ios-eye-outline'} size={20} color="#fff" style={{ marginLeft: 10 }}
        onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    color: '#fff',
    flex: 1,
    fontSize: 15,
    opacity: 1,
  },
  input: {
    alignSelf: 'center',
    width: '80%',
    height: '4%',
    flexDirection: 'row',
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 20,
  },
});
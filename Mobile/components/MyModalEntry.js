import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet } from 'react-native';

import Modal from "react-native-modal";

const MyModalEntry = ({ isDataEntryModalVisibleAction, inputValue, setInputValue, handleDataEntrySubmit, placeholder, text }) => {
  return (
    <Modal
      animationIn='zoomIn'
      animationOut='zoomOut'
      transparent={true}
      backdropOpacity={0.7}
      statusBarTranslucent={true}
      isVisible={isDataEntryModalVisibleAction || false}
    >
      <View style={styles.popupView}>
        <View style={styles.popUp}>
          <Text style={styles.popUp.text}>{text}</Text>
          <TextInput
            value={inputValue}
            placeholder={placeholder}
            onChangeText={setInputValue}
            style={styles.popUp.input}
            keyboardType="email-address"
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <Button title='Save' onPress={handleDataEntrySubmit} color='#316dca' />
        </View>
      </View>
    </Modal>
  );
};

const MyModalEntryReaction0 = ({ isDataEntryModalVisibleReaction, inputValue1, inputValue2, inputValue3, setInputValue1, setInputValue2, setInputValue3, handleDataEntrySubmit }) => {
  return (
    <Modal
      animationIn='zoomIn'
      animationOut='zoomOut'
      transparent={true}
      backdropOpacity={0.7}
      statusBarTranslucent={true}
      isVisible={isDataEntryModalVisibleReaction || false}
    >
      <View style={styles.popupView}>
        <View style={styles.popUp}>
          <Text style={styles.popUp.text}>Enter content to send a mail:</Text>
          <TextInput
            value={inputValue1}
            placeholder="Email"
            onChangeText={setInputValue1}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <TextInput
            value={inputValue2}
            placeholder="Subject"
            onChangeText={setInputValue2}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <TextInput
            value={inputValue3}
            placeholder="Message"
            onChangeText={setInputValue3}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <Button title='Save' onPress={handleDataEntrySubmit} color='#316dca' />
        </View>
      </View>
    </Modal>
  );
};

const MyModalEntryReaction1 = ({ isDataEntryModalVisibleReaction, inputValue1, inputValue2, setInputValue1, setInputValue2, handleDataEntrySubmit }) => {
  return (
    <Modal
      animationIn='zoomIn'
      animationOut='zoomOut'
      transparent={true}
      backdropOpacity={0.7}
      statusBarTranslucent={true}
      isVisible={isDataEntryModalVisibleReaction || false}
    >
      <View style={styles.popupView}>
        <View style={styles.popUp}>
          <Text style={styles.popUp.text}>Enter content to send a mail:</Text>
          <TextInput
            value={inputValue1}
            placeholder="Subject"
            onChangeText={setInputValue1}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <TextInput
            value={inputValue2}
            placeholder="Message"
            onChangeText={setInputValue2}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <Button title='Save' onPress={handleDataEntrySubmit} color='#316dca' />
        </View>
      </View>
    </Modal>
  );
};

const MyModalEntryReaction2 = ({ isDataEntryModalVisibleReaction, inputValue1, inputValue2, setInputValue1, setInputValue2, handleDataEntrySubmit }) => {
  return (
    <Modal
      animationIn='zoomIn'
      animationOut='zoomOut'
      transparent={true}
      backdropOpacity={0.7}
      statusBarTranslucent={true}
      isVisible={isDataEntryModalVisibleReaction || false}
    >
      <View style={styles.popupView}>
        <View style={styles.popUp}>
          <Text style={styles.popUp.text}>Enter content to create a document:</Text>
          <TextInput
            value={inputValue1}
            placeholder="Title"
            onChangeText={setInputValue1}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <TextInput
            value={inputValue2}
            placeholder="Content"
            onChangeText={setInputValue2}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <Button title='Save' onPress={handleDataEntrySubmit} color='#316dca' />
        </View>
      </View>
    </Modal>
  );
};

const MyModalEntryReaction3 = ({ isDataEntryModalVisibleReaction, inputValue1, setInputValue1, handleDataEntrySubmit }) => {
  return (
    <Modal
      animationIn='zoomIn'
      animationOut='zoomOut'
      transparent={true}
      backdropOpacity={0.7}
      statusBarTranslucent={true}
      isVisible={isDataEntryModalVisibleReaction || false}
    >
      <View style={styles.popupView}>
        <View style={styles.popUp}>
          <Text style={styles.popUp.text}>Enter content to create a fork:</Text>
          <TextInput
            value={inputValue1}
            placeholder="GithubOwner/RepositoryName"
            onChangeText={setInputValue1}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <Button title='Save' onPress={handleDataEntrySubmit} color='#316dca' />
        </View>
      </View>
    </Modal>
  );
};

const MyModalEntryReaction4 = ({ isDataEntryModalVisibleReaction, inputValue1, inputValue2, inputValue3, setInputValue1, setInputValue2, setInputValue3, handleDataEntrySubmit }) => {
  return (
    <Modal
      animationIn='zoomIn'
      animationOut='zoomOut'
      transparent={true}
      backdropOpacity={0.7}
      statusBarTranslucent={true}
      isVisible={isDataEntryModalVisibleReaction || false}
    >
      <View style={styles.popupView}>
        <View style={styles.popUp}>
          <Text style={styles.popUp.text}>Enter content to create an issue:</Text>
          <TextInput
            value={inputValue1}
            placeholder="GithubOwner/RepositoryName"
            onChangeText={setInputValue1}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <TextInput
            value={inputValue2}
            placeholder="Title of the issue"
            onChangeText={setInputValue2}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <TextInput
            value={inputValue3}
            placeholder="Body of the issue"
            onChangeText={setInputValue3}
            style={styles.popUp.input}
            keyboardType=""
            placeholderTextColor="rgba(0,0,0,0.4)"
          />
          <Button title='Save' onPress={handleDataEntrySubmit} color='#316dca' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popUp: {
    text: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
    },
    input: {
      width: '90%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    width: '80%',
    height: 'auto',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 10,
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MyModalEntry;
export { MyModalEntry, MyModalEntryReaction0, MyModalEntryReaction1, MyModalEntryReaction2, MyModalEntryReaction3, MyModalEntryReaction4 };

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, FlatList, Image } from "react-native";

import IonIcon from "react-native-vector-icons/Ionicons";

import Modal from "react-native-modal";
import MyLogout from "./Logout";

const MySettings = ({ navigation, isDarkMode, onSwitchChange }) => {
  const [isSettingsOpen, setisSettingsOpen] = useState(false);

  // Dark mode
  const [styles, setStyles] = useState(isDarkMode ? styleDark : styleLight);

  useEffect(() => {
    // Update color when isDarkMode prop changes
    setStyles(isDarkMode ? styleDark : styleLight);
  }, [isDarkMode]);
  // End of Dark Mode

  const handleSettingsClick = () => {
    setisSettingsOpen(true);
  }

  const handleClick = () => {
    setisSettingsOpen(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleSettingsClick}>
        <IonIcon name="settings-sharp" size={28} color="white" style={styles.icon} />
      </TouchableOpacity>

      <Modal
        animationIn='slideInUp'
        animationOut='slideOutDown'
        transparent={true}
        backdropOpacity={0.5}
        statusBarTranslucent={true}
        backdropColor={isDarkMode ? '#0E0F10' : undefined}
        hideModalContentWhileAnimating={true}
        isVisible={isSettingsOpen || false}
        style={styles.modal}
        onBackdropPress={handleClick}
        useNativeDriverForBackdrop
        onSwipeComplete={handleClick}
        swipeDirection={['down']}
      >
        <View style={styles.topLine} />
        <View style={styles.window}>
          <View style={styles.modalHeader} />
          <Text style={styles.modalHeader.text}>Settings</Text>
          <Text style={styles.modalText}>You can change the theme by clicking on the switch</Text>
          <Switch
            value={isDarkMode}
            onValueChange={onSwitchChange}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />

          <Text style={styles.modalText}>You can disconnect of the application by clicking on the button below</Text>

          <MyLogout navigation={navigation} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styleDark = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  icon: {
    top: 5,
    left: 175
  },
  window: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22272e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    margin: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  modalHeader: {
    text: {
      position: 'absolute',
      top: 16,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    height: 1,
    backgroundColor: '#dcdcdc',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
  },
  topLine: {
    height: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 365,
    left: 172,
    right: 172,
    borderRadius: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
});

const styleLight = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  icon: {
    top: 5,
    left: 175
  },
  window: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    margin: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  modalHeader: {
    text: {
      position: 'absolute',
      top: 16,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    height: 1,
    backgroundColor: '#dcdcdc',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
  },
  topLine: {
    height: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 365,
    left: 172,
    right: 172,
    borderRadius: 10,
  },
  modalText: {
    color: 'black',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
});

export default MySettings;

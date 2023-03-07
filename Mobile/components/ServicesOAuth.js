import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import useGoogleSignIn from './Login/googleLogin';
import useDiscordSignIn from './Login/discordLogin';
import useGithubSignIn from './Login/githubLogin';
import useMicrosoftSignIn from './Login/microsoftLogin';

const ServicesOAuth = ({ isDarkMode }) => {
  // Dark mode
  const [styles, setStyles] = useState(isDarkMode ? styleDark : styleLight);

  useEffect(() => {
    // Update color when isDarkMode prop changes
    setStyles(isDarkMode ? styleDark : styleLight);
  }, [isDarkMode]);
  // End of Dark Mode

  // Discord signin
  const [authDiscord, handleLoginDiscord, handleOauth_Discord, discordLogout] = useDiscordSignIn();
  //End of Discord auth

  // Google signin
  const [authGoogle, handleLoginGoogle, handleOauth_Google, googleLogout] = useGoogleSignIn();
  // End of Google auth

  // Github signin
  const [authGithub, handleLoginGithub, handleOauth_Github, githubLogout] = useGithubSignIn();
  // End of Github auth

  // Microsoft signin
  const [authMicrosoft, handleLoginMicrosoft, handleOauth_Microsoft, microsoftLogout] = useMicrosoftSignIn();
  // End of Microsoft auth

  return (
    <View style={styles.servicesContainer}>
      <>
        {authGoogle ? undefined : <TouchableOpacity
          style={styles.SignInButton}
          onPress={handleLoginGoogle}>
          <Text style={styles.loginButtonText}>Connect to Google</Text>
        </TouchableOpacity>}
        {authGoogle ? <TouchableOpacity style={styles.SignOutButton} onPress={googleLogout}>
          <Text style={styles.logoutButtonText}>Disconnect from Google</Text>
        </TouchableOpacity> : undefined}
      </>
      <>
        {authDiscord ? undefined : <TouchableOpacity
          onPress={handleLoginDiscord}
          style={styles.SignInButton}>
          <Text style={styles.loginButtonText}>Connect to Discord</Text>
        </TouchableOpacity>}
        {authDiscord ? <TouchableOpacity style={styles.SignOutButton} onPress={discordLogout}>
          <Text style={styles.logoutButtonText}>Disconnect from Discord</Text>
        </TouchableOpacity> : undefined}
      </>
      <>
        {authGithub ? undefined : <TouchableOpacity
          onPress={handleLoginGithub}
          style={styles.SignInButton}>
          <Text style={styles.loginButtonText}>Connect to Github</Text>
        </TouchableOpacity>}
        {authGithub ? <TouchableOpacity style={styles.SignOutButton} onPress={githubLogout}>
          <Text style={styles.logoutButtonText}>Disconnect from Github</Text>
        </TouchableOpacity> : undefined}
      </>
      <>
        {authMicrosoft ? undefined : <TouchableOpacity
          onPress={handleLoginMicrosoft}
          style={styles.SignInButton}>
          <Text style={styles.loginButtonText}>Connect to Microsoft</Text>
        </TouchableOpacity>}
        {authMicrosoft ? <TouchableOpacity style={styles.SignOutButton} onPress={microsoftLogout}>
          <Text style={styles.logoutButtonText}>Disconnect from Microsoft</Text>
        </TouchableOpacity> : undefined}
      </>
    </View>
  );
}

const styleDark = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInButton: {
    width: '90%',
    backgroundColor: '#316dca',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  SignOutButton: {
    width: '90%',
    backgroundColor: '#dd4b39',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

const styleLight = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInButton: {
    width: '90%',
    backgroundColor: '#316dca',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  SignOutButton: {
    width: '90%',
    backgroundColor: '#dd4b39',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default ServicesOAuth;
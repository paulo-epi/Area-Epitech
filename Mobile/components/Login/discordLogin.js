import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

import { url } from '../Variables';

WebBrowser.maybeCompleteAuthSession();

const useDiscordSignIn = () => {
  // Discord signin
  const [authDiscord, setAuthDiscord] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const authConfig = {
    clientId: '1070713490228129812',
    clientSecret: '09ZD89GFOTxvOUFH9TxUmbaSoIZDaZsn',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['identify', 'email'] // Specify the scopes that your application requires
  };

  const [requestDiscord, responseDiscord, promptAsyncDiscord] = AuthSession.useAuthRequest({
    clientId: authConfig.clientId,
    responseType: AuthSession.ResponseType.Token,
    scopes: ['identify', 'email'],
    redirectUri: authConfig.redirectUri,
  },
    {
      authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
      tokenEndpoint: 'https://discord.com/api/oauth2/token',
    }
  );

  useEffect(() => {
    console.log("Discord:");
    console.log(responseDiscord);
    if (responseDiscord?.type === 'success') {
      // The user logged in and was redirected back to your app with an authorization code
      const { code } = responseDiscord.params;
      setAuthDiscord(responseDiscord.authentication);

      // Use the authorization code to obtain an access token
      fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: authConfig.redirectUri,
          client_id: authConfig.clientId,
          client_secret: authConfig.clientSecret,
        }),
      })
        .then(responseDiscord => responseDiscord.json())
        .catch(error => {
          console.error(error);
        });
      const persistAuth = async () => {
        await AsyncStorage.setItem("authDiscord", JSON.stringify(responseDiscord.authentication));
      };
      persistAuth();
    }
  }, [responseDiscord]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("authDiscord");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuthDiscord(authFromJson);
        // console.log(authFromJson);
      }
    };
    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (authDiscord) {
      handleOauth_Discord();
    }
  }, [authDiscord]);

  const handleOauth_Discord = () => {
    // get datetime for sql
    const expires_at = new Date(Date.now() + parseInt(authDiscord.expiresIn, 10) * 1000);
    const expires_at_sql = expires_at.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Discord Oauth");
    console.log(token);
    console.log(authDiscord.accessToken);
    console.log(authDiscord.refreshToken);
    console.log(authConfig.clientId);
    console.log(authConfig.clientSecret);
    console.log(expires_at_sql);
    console.log(url + 'add_oauth');
    const formData = new FormData();
    formData.append('service_id', '3');
    formData.append('token', authDiscord.accessToken);
    formData.append('refresh_token', authDiscord.refreshToken);
    formData.append('client_id', authConfig.clientId);
    formData.append('client_secret', authConfig.clientSecret);
    formData.append('expiry', expires_at_sql);

    fetch(url + 'add_oauth', {
      method: 'POST',
      headers: {
        'jwt': token,
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const discordLogout = async () => {
    console.log("Discord logout");
    await AuthSession.revokeAsync({
      token: authDiscord.accessToken
    }, {
      revocationEndpoint: "https://discord.com/api/oauth2/token/revoke"
    });

    setAuthDiscord(undefined);
    await AsyncStorage.removeItem("authDiscord");
  }

  const handleLoginDiscord = () => {
    promptAsyncDiscord({ useProxy: true, showInRecents: true });
  };

  return [
    authDiscord,
    handleLoginDiscord,
    handleOauth_Discord,
    discordLogout
  ];
};

export default useDiscordSignIn;
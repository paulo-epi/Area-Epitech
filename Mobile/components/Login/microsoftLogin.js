import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

import { url } from '../Variables';

WebBrowser.maybeCompleteAuthSession();

// secret_id: vlr8Q~2-UhsDM1dmBcOMMki742PvFysxL1X1ga1f
// client_id: f2da55f3-8ec8-4e7b-b5f7-e8c296717552

const MicrosoftLogin = () => {
  // Microsoft signin
  const [authMicrosoft, setAuthMicrosoft] = useState();
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
    clientId: 'f2da55f3-8ec8-4e7b-b5f7-e8c296717552',
    clientSecret: 'vlr8Q~2-UhsDM1dmBcOMMki742PvFysxL1X1ga1f',
    scopes: ['openid', 'profile', 'email', 'offline_access', 'https://graph.microsoft.com/Calendars.Read', 'https://graph.microsoft.com/Mail.Send', 'https://graph.microsoft.com/Mail.ReadWrite'],
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true })
  };

  // Endpoint
  const discovery = AuthSession.useAutoDiscovery('https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0');
  // Request
  const [requestMicrosoft, responseMicrosoft, promptAsyncMicrosoft] = AuthSession.useAuthRequest(
    {
      clientId: authConfig.clientId,
      scopes: authConfig.scopes,
      redirectUri: authConfig.redirectUri,
      grant_type: 'authorization_code',
    },
    discovery,
  );

  useEffect(() => {
    console.log("Microsoft:");
    console.log(responseMicrosoft);
    if (responseMicrosoft?.type === 'success') {
      // The user logged in and was redirected back to your app with an authorization code
      const { code } = responseMicrosoft.params;
      setAuthMicrosoft(responseMicrosoft.params);

      fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'grant_type=client_credentials&' +
          'code=' + code + '&' +
          'redirect_uri=' + authConfig.redirectUri + '&' +
          'client_id=' + authConfig.clientId + '&' +
          'client_secret=' + authConfig.clientSecret + '&' +
          'scope=2ff814a6-3304-4ab8-85cb-cd0e6f879c1d%2F.default'
      })
        .then(responseMicrosoft => responseMicrosoft.json())
        .then(data => {
          console.log(data);
          // Use the authorization code to obtain an access token
          const persistAuth = async () => {
            await AsyncStorage.setItem("authMicrosoft", JSON.stringify(data));
          };
          persistAuth();
          setAuthMicrosoft(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [responseMicrosoft]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("authMicrosoft");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuthMicrosoft(authFromJson);
        console.log(authFromJson);
      }
    };
    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (authMicrosoft) {
      handleOauth_Microsoft();
    }
  }, [authMicrosoft]);

  const handleOauth_Microsoft = () => {
    if (!authMicrosoft.access_token) {
      return;
    } else {
      // get datetime for sql
      const expires_at = new Date(Date.now() + authMicrosoft.expires_in * 1000 + 3600 * 1000);
      const expires_at_sql = expires_at.toISOString().slice(0, 19).replace('T', ' ');

      console.log("Microsoft Oauth");
      console.log(token);
      console.log(authMicrosoft.access_token);
      console.log(authMicrosoft.refreshToken);
      console.log(authConfig.clientId);
      console.log(authConfig.clientSecret);
      console.log(expires_at_sql);
      console.log(url + 'add_oauth');
      const formData = new FormData();
      formData.append('service_id', '1');
      formData.append('token', authMicrosoft.access_token);
      formData.append('refresh_token', authMicrosoft.refresh_token);
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
  }

  const MicrosoftLogout = async () => {
    console.log("Microsoft logout");
    // Revoke the access token
    await AuthSession.revokeAsync({
      token: authMicrosoft.access_token,
    }, {
      revocationEndpoint: discovery.endSessionEndpoint
    });

    // Clear the stored auth
    setAuthMicrosoft(undefined);
    await AsyncStorage.removeItem("authMicrosoft");
  };


  const handleLoginMicrosoft = () => {
    promptAsyncMicrosoft({ useProxy: true, showInRecents: true });
  };

  return [
    authMicrosoft,
    handleLoginMicrosoft,
    handleOauth_Microsoft,
    MicrosoftLogout
  ];
}

export default MicrosoftLogin;

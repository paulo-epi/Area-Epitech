import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

import { url } from '../Variables';

WebBrowser.maybeCompleteAuthSession();

const useGoogleSignIn = () => {
  // Google signin
  const [authGoogle, setAuthGoogle] = useState();
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
    clientId: '729389860999-g8jitbom2i0ksf802jkps52pkc4divco.apps.googleusercontent.com',
    clientSecret: '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',
  };

  const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
    androidClientId: "729389860999-597c72b8lpmmgmn7ibjdvc1p71bc6sj0.apps.googleusercontent.com",
    iosClientId: "729389860999-ekcn59n5t27qe9b68uafoh23f281l6bu.apps.googleusercontent.com",
    expoClientId: "729389860999-g8jitbom2i0ksf802jkps52pkc4divco.apps.googleusercontent.com",
    scopes: [
      "https://www.googleapis.com/auth/pubsub",
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/documents",
      "https://www.googleapis.com/auth/calendar.readonly"
    ]
  });

  useEffect(() => {
    console.log("Google:");
    console.log(responseGoogle);
    if (responseGoogle?.type === "success") {
      // The user logged in and was redirected back to your app with an authentication code
      setAuthGoogle(responseGoogle.authentication);

      const persistAuth = async () => {
        await AsyncStorage.setItem("authGoogle", JSON.stringify(responseGoogle.authentication));
      };
      persistAuth();
    }
  }, [responseGoogle]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("authGoogle");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuthGoogle(authFromJson);
        // console.log(authFromJson);
      }
    };
    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (authGoogle) {
      handleOauth_Google();
    }
  }, [authGoogle]);

  const handleOauth_Google = () => {
    // get datetime for sql
    const expires_at = new Date(Date.now() + authGoogle.expiresIn * 1000 + 3600 * 1000);
    const expires_at_sql = expires_at.toISOString().slice(0, 19).replace('T', ' ');

    console.log("Google Oauth");
    console.log(token);
    console.log(authGoogle.accessToken);
    console.log(authGoogle.refreshToken);
    console.log(authConfig.clientId);
    console.log(authConfig.clientSecret);
    console.log(authGoogle.expiresIn);
    console.log(expires_at_sql);
    console.log(url + 'add_oauth');
    const formData = new FormData();
    formData.append('service_id', '0');
    formData.append('token', authGoogle.accessToken);
    formData.append('refresh_token', "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI");
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
      .then(responseGoogle => responseGoogle.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const googleLogout = async () => {
    console.log("Google logout");
    await AuthSession.revokeAsync({
      token: authGoogle.accessToken
    }, {
      revocationEndpoint: "https://oauth2.googleapis.com/revoke"
    });

    setAuthGoogle(undefined);
    await AsyncStorage.removeItem("authGoogle");
  };

  const handleLoginGoogle = () => {
    promptAsyncGoogle({ useProxy: true, showInRecents: true });
  };

  return [
    authGoogle,
    handleLoginGoogle,
    handleOauth_Google,
    googleLogout
  ];
};

export default useGoogleSignIn;


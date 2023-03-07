import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

import { url } from '../Variables';

WebBrowser.maybeCompleteAuthSession();

const useGithubSignIn = () => {
  // Github signin
  const [authGithub, setAuthGithub] = useState();
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
    clientId: 'Iv1.7fadd6672ccfdd72',
    clientSecret: '6b0924ad55507ddb42c27a0ba6b78907211fa997',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['repo', 'user', 'read:org'],
  };

  // Endpoint
  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
  };

  const [requestGithub, responseGithub, promptAsyncGithub] = AuthSession.useAuthRequest({
    clientId: authConfig.clientId,
    scopes: authConfig.scopes,
    redirectUri: authConfig.redirectUri,
  },
    discovery
  );

  useEffect(() => {
    console.log("Github:");
    console.log(responseGithub);
    if (responseGithub?.type === 'success') {
      // The user logged in and was redirected back to your app with an authorization code
      const { code } = responseGithub.params;
      setAuthGithub(responseGithub);

      const params = "?client_id=" + authConfig.clientId + "&client_secret=" + authConfig.clientSecret + "&code=" + code + "&redirect_uri=" + authConfig.redirectUri;

      // Use the authorization code to obtain an access token
      fetch(discovery.tokenEndpoint + params, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(responseGithub => responseGithub.json())
        .then(data => {
          console.log(data);
          const persistAuth = async () => {
            await AsyncStorage.setItem("authGithub", JSON.stringify(data));
          };
          persistAuth();
          setAuthGithub(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [responseGithub]);


  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("authGithub");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuthGithub(authFromJson);
        console.log(authFromJson);
      }
    };
    getPersistedAuth();
  }, []);

  useEffect(() => {
    if (authGithub) {
      handleOauth_Github();
    }
  }, [authGithub]);

  const handleOauth_Github = () => {
    if (!authGithub.access_token) {
      return;
    } else {
      // get datetime for sql
      const expires_at = new Date(Date.now() + parseInt(authGithub.expires_in, 10) * 1000);
      const expires_at_sql = expires_at.toISOString().slice(0, 19).replace('T', ' ');
      console.log("Github Oauth");
      console.log(token);
      console.log(authGithub.access_token);
      console.log(authGithub.refresh_token);
      console.log(authConfig.clientId);
      console.log(authConfig.clientSecret);
      console.log(expires_at_sql);
      console.log(url + 'add_oauth');
      const formData = new FormData();
      formData.append('service_id', '2');
      formData.append('token', authGithub.access_token);
      formData.append('refresh_token', authGithub.refresh_token);
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

  const GithubLogout = async () => {
    console.log("Github logout");

    try {
      // Try to make a request to the Github API using the access token
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${authGithub.access_token}`
        }
      });

      // If the request succeeds, the token is still valid
      if (response.ok) {
        console.log("Token is still valid, logging out");
        setAuthGithub(undefined);
        await AsyncStorage.removeItem("authGithub");
      } else {
        // If the request fails with an unauthorized or forbidden error, the token is invalid
        console.log("Token is invalid, logging out");
        setAuthGithub(undefined);
        await AsyncStorage.removeItem("authGithub");
      }
    } catch (error) {
      console.error(error);
    }

    // Revoke the access token
    await AuthSession.revokeAsync({
      token: authGithub.access_token,
    }, {
      revocationEndpoint: discovery.revocationEndpoint
    });
  };


  const handleLoginGithub = () => {
    promptAsyncGithub({ useProxy: true, showInRecents: true });
  };

  return [
    authGithub,
    handleLoginGithub,
    handleOauth_Github,
    GithubLogout
  ];
}

export default useGithubSignIn;
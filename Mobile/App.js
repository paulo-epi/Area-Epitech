import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Connection } from './screen/SignIn';
import { Register } from './screen/SignUp';
import { Home } from './screen/Home';
import MyLogout from './components/Logout';
import { Text, View } from 'react-native';
import { ServerConnect } from './screen/ServerConnect';

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const value = await AsyncStorage.getItem('isConnected');
        if (value !== null) {
          setIsConnected(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkConnection();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isConnected ? 'Home' : 'Login'}>
        <Stack.Screen name="ServerConnect" component={ServerConnect} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Connection} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={MyLogout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}

export default App;

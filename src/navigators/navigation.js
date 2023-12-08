import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../Screen/Home';
import Login from '../Screen/Authentication/Login';
import SignUp from '../Screen/Authentication/SignUp';
import GetStarted from '../Screen/Authentication/GetStarted';
import ChatScreen from '../Screen/ChatScreens/ChatScreen';
import VideoCall from '../Screen/VideoCall/VideoCall';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({value}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, statusBarHidden: true}}
        initialRouteName={!value ? 'GetStarted' : 'Home'}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;

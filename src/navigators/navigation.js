import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';
import Message from '../Screen/Message/Message';
import Login from '../Screen/Authentication/Login';
import SignUp from '../Screen/Authentication/SignUp';
import VideoCall from '../Screen/VideoCall/VideoCall';
import ChatScreen from '../Screen/ChatScreens/ChatScreen';
import GetStarted from '../Screen/Authentication/GetStarted';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({value}) => {
  console.log('value', value)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, statusBarHidden: true}}
        initialRouteName={!value ? 'GetStarted' : 'TabNavigation'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        {/* <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="VideoCall" component={VideoCall} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;

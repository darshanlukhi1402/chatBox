import React, {useEffect, useState} from 'react';

import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DisplayNotification} from './src/utils/Global';
import MainStackNavigator from './src/navigators/navigation';

const App = () => {
  const [userExist, setUserExist] = useState('');

  useEffect(() => {
    SplashScreen.hide();
    getData();

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      DisplayNotification(remoteMessage);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      DisplayNotification(remoteMessage);
    });
    return () => {
      unsubscribeForeground();
    };
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('userAdded').then(res =>
        res ? setUserExist(res) : setUserExist(null),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return userExist !== '' ? <MainStackNavigator value={userExist} /> : <></>;
};

export default App;

import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MainStackNavigator from './src/navigators/navigation';

const App = () => {
  const [userExist, setUserExist] = useState('');

  useEffect(() => {
    getData();
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

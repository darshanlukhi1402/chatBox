import React, {useEffect} from 'react';
import MainStackNavigator from './src/navigators/navigation';
import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
  }, []);
  return <MainStackNavigator />;
};

export default App;

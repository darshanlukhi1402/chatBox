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

// //import liraries
// import React, {Component} from 'react';
// import {View, Text, StyleSheet, Button} from 'react-native';
// import notifee from '@notifee/react-native';

// // create a component
// const App = () => {
//   async function onDisplayNotification() {
//     await notifee.requestPermission()

//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });

//     await notifee.displayNotification({
//       title: 'Notification Title',
//       body: 'Main body content of the notification',
//       android: {
//         channelId,
//         smallIcon: 'ic_notification', 
//         pressAction: {
//           id: 'default',
//         },
//       },
//     });
//   }
//   return (
//     <View>
//       <Button title="Display Notification" onPress={() => {onDisplayNotification()}} />
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// //make this component available to the app
// export default App;

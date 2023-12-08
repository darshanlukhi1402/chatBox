// import React, {useState} from 'react';

// import AgoraUIKit from 'agora-rn-uikit';
// import {useNavigation} from '@react-navigation/native';

// const VideoCall = ({navigation}) => {
//   const {goBack} = useNavigation();
  
//   const [videoCall, setVideoCall] = useState(true);

//   const connectionData = {
//     appId: '1a27184418b1471e91a8616684abb507',
//     channel: 'As Your Wish',
//     token:
//       '007eJxTYDi1ds80h5wz6W//165XUJtY6n/57uTDXG9m35p6J4Dx84N1CgyGiUbmhhYmJoYWSYYm5oaploaJFmaGZmYWJolJSaYG5vFbi1IbAhkZ7uQeYWJkgEAQn4fBsVghMr+0SCE8sziDgQEAYg0lCA==',
//   };

//   const callbacks = {
//     EndCall: () => {
//       setVideoCall(false);
//       goBack();
//     },
//   };

//   return (
//     videoCall && (
//       <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
//     )
//   );
// };

// export default VideoCall;

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const VideoCall = () => {
  return (
    <View style={styles.container}>
      <Text>VideoCall</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default VideoCall;


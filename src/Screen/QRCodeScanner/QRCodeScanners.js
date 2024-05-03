import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, Linking} from 'react-native';

import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScanners = () => {
  return (
    <QRCodeScanner
      onRead={async ({data}) => {
        await Linking.openURL(data);
      }}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      //   <Text style={styles.centerText}>
      //     Go to{' '}
      //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
      //     your computer and scan the QR code.
      //   </Text>
      // }
      // bottomContent={
      //   <TouchableOpacity style={styles.buttonTouchable}>
      //     <Text style={styles.buttonText}>OK. Got it!</Text>
      //   </TouchableOpacity>
      // }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeScanners;

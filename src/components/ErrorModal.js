import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import ReactNativeModal from 'react-native-modal';

import {wp} from '../utils/constant';
import {colors} from '../utils/themes';
import LinearButton from './LinearButton';

const ErrorModal = ({visible, message, onClose}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      animationIn={'slideInUp'}
      // animationInTiming={500}
      // animationOutTiming={500}
      backdropOpacity={0.8}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorMessage}>{message}</Text>
          <LinearButton
            label={'Close'}
            onPress={onClose}
            labelView={{paddingHorizontal: wp(30)}}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ErrorModal;

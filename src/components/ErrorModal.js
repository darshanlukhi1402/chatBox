import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import LinearButton from './LinearButton';
import {wp} from '../utils/constant';
import { colors } from '../utils/themes';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: colors.black
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ErrorModal;

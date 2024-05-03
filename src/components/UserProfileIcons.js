import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {hp, wp} from '../utils/constant';

const UserProfileIcons = ({source, onPress}) => {
  return (
    <TouchableOpacity style={styles.conStyle} onPress={onPress}>
      <Image source={source} style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

export default UserProfileIcons;

const styles = StyleSheet.create({
  iconStyle: {
    height: hp(20),
    width: hp(20),
  },
  conStyle: {
    height: hp(44),
    width: hp(44),
    backgroundColor: '#454B65',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(24),
  },
});

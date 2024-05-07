import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {images} from '../assets';
import {hp} from '../utils/constant';
import {colors} from '../utils/themes';

const PlusIcon = ({plusIconPress}) => {
  return (
    <TouchableOpacity style={styles.plusCon} onPress={plusIconPress}>
      <Image source={images.plus_icon} style={styles.plusIconStyle} />
    </TouchableOpacity>
  );
};

export default PlusIcon;

const styles = StyleSheet.create({
  plusIconStyle: {
    width: hp(10),
    height: hp(10),
  },
  plusCon: {
    top: hp(42),
    left: hp(42),
    width: hp(16),
    height: hp(16),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: hp(20),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

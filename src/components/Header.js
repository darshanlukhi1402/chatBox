import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {colors} from '../utils/themes';
import {hp, wp} from '../utils/constant';

const Header = ({source, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={styles.backIconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIconStyle: {
    width: hp(24),
    height: hp(24),
    marginTop: hp(17),
    marginLeft: wp(24),
    tintColor: colors.backTintColor,
  },
});

export default Header;

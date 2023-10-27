import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {hp, wp} from '../utils/constant';
import {colors} from '../utils/colors';

const Header = ({source}) => {
  return (
    <TouchableOpacity>
      <Image source={source} style={styles.backIconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIconStyle: {
    height: hp(24),
    width: hp(24),
    marginTop: hp(17),
    marginLeft: wp(24),
    tintColor: colors.backTintColor,
  },
});

export default Header;

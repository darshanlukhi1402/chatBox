import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../utils/themes';
import {fontSize, hp, wp} from '../../utils/constant';

const UserDetails = ({value, label}) => {
  return (
    <View style={styles.conStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Text style={styles.valueStyle}>{value}</Text>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  valueStyle: {
    fontSize: fontSize(18),
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    marginLeft: wp(6),
  },
  labelStyle: {
    fontSize: fontSize(14),
    fontFamily: 'Poppins-Regular',
  },
  conStyle: {
    marginVertical: hp(10),
  },
});

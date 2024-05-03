import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';

const LineConstant = ({label, labelStyle}) => {
  return (
    <View style={styles.con}>
      <View style={styles.lineStyle}></View>
      <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
      <View style={styles.lineStyle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: fontSize(12),
    marginHorizontal: wp(15),
    color: colors.constantOne,
    fontFamily: 'Poppins-ExtraBold',
  },
  con: {
    marginTop: hp(36),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lineStyle: {
    width: wp(132),
    height: hp(1),
    backgroundColor: colors.lineColor,
  },
});

export default LineConstant;

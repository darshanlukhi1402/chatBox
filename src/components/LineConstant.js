import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontSize, hp, wp} from '../utils/constant';
import {colors} from '../utils/colors';

const LineConstant = ({label}) => {
  return (
    <View style={styles.con}>
      <View style={styles.lineStyle}></View>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.lineStyle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: fontSize(12),
    fontFamily: 'Poppins-ExtraBold',
    color: colors.constantOne,
    marginHorizontal: wp(15),
  },
  con: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(36),
  },
  lineStyle: {
    width: wp(132),
    height: hp(1),
    backgroundColor: colors.lineColor,
  },
});

export default LineConstant;

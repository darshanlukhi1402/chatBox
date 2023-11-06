import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fontSize, hp, wp} from '../utils/constant';
import {colors} from '../utils/colors';

const StatusLabel = ({PrimaryLabel, subLabel, onPress}) => {
  return (
    <TouchableOpacity style={styles.conStatusStyles} onPress={onPress}>
      <Image source={{}} style={styles.userImageStyle} />
      <View>
        <Text style={styles.labelTextStyle}>{PrimaryLabel}</Text>
        <Text style={styles.subTextStyle}>{subLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conStatusStyles: {
    flexDirection: 'row',
    marginHorizontal: wp(24),
    marginBottom: hp(30),
    alignItems: 'center',
  },
  labelTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(18),
    marginLeft: wp(12),
    color: colors.black
  },
  subTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(14),
    marginLeft: wp(12),
    color: colors.subMessageText,
    justifyContent: 'space-between',
  },
  userImageStyle: {
    height: hp(52),
    width: hp(52),
    borderWidth: 1,
    borderRadius: hp(52 / 2),
    borderColor : colors.black
  },
});

export default StatusLabel;

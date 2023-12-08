import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';

const StatusLabel = ({
  source,
  onPress,
  subLabel,
  PrimaryLabel,
  userImageStyle,
  conStatusStyles,
  userStatusBorderStyle,
}) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.conStatusStyles, conStatusStyles]}
        onPress={onPress}>
        <View style={[styles.userStatusBorderStyle, userStatusBorderStyle]}>
          <Image
            source={source}
            style={[styles.userImageStyle, userImageStyle]}
          />
        </View>
        <View>
          <Text style={styles.labelTextStyle}>{PrimaryLabel}</Text>
          <Text style={styles.subTextStyle}>{subLabel}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.highlightStyle}></View>
    </>
  );
};

const styles = StyleSheet.create({
  conStatusStyles: {
    flexDirection: 'row',
    marginHorizontal: wp(24),
    marginBottom: hp(20),
    alignItems: 'center',
  },
  labelTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(18),
    marginLeft: wp(12),
    color: colors.black,
  },
  subTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(14),
    marginLeft: wp(12),
    color: colors.subMessageText,
    justifyContent: 'space-between',
  },
  userImageStyle: {
    height: hp(48),
    width: hp(48),
  },
  userStatusBorderStyle: {
    padding: hp(8),
    borderRadius: hp(80 / 2),
    borderWidth: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  highlightStyle: {
    width: wp(320),
    borderWidth: hp(0.2),
    alignSelf: 'center',
    marginBottom: hp(20),
    borderColor: colors.subMessageText,
  },
});

export default StatusLabel;

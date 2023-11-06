import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {images} from '../assets';
import {strings} from '../utils/string';
import {fontSize, hp, wp} from '../utils/constant';
import {colors} from '../utils/colors';

const HeaderCon = ({rightSource, label, leftSource}) => {
  return (
    <SafeAreaView style={styles.headerConStyle}>
      <View style={styles.imageSubView}>
        <Image source={leftSource} style={styles.searchIconStyle} />
      </View>
      <Text style={styles.headerTitleStyle}>{label}</Text>
      <Image source={rightSource} style={styles.userIconStyle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerConStyle: {
    marginHorizontal: wp(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageSubView: {
    borderRadius: 40,
    height: hp(40),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.searchBackgroundColor,
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: 'Poppins-Regular',
  },
  userIconStyle: {
    height: hp(32),
    width: hp(32),
  },
  searchIconStyle: {
    height: hp(22),
    width: hp(22),
  },
});

export default HeaderCon;

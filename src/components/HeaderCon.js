import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import {images} from '../assets';
import {strings} from '../utils/string';
import {fontSize, hp, wp} from '../utils/constant';
import {colors} from '../utils/themes';

const HeaderCon = ({rightSource, label, leftSource, headerTitleStyle}) => {
  return (
    <SafeAreaView style={styles.headerConStyle}>
      <View style={styles.imageSubView}>
        <Image source={leftSource} style={styles.searchIconStyle} />
      </View>
      <Text style={[styles.headerTitleStyle,headerTitleStyle]}>{label}</Text>
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
    marginTop: Platform.OS == 'android' ? hp(10) : 0,
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

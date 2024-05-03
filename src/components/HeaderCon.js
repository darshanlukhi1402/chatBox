import React, {Component, useEffect, useRef} from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Platform, TouchableOpacity, View, TextInput, Animated, Easing} from 'react-native';

import {images} from '../assets';
import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';

const HeaderCon = ({ rightSource, label, leftSource, headerTitleStyle, searchOnPress, searchStatus, onChangeSearchText, removeOnPress, searchValue, leftIcon}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searchStatus) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, 
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [searchStatus]);
  return (
    <>
      {!searchStatus ? (
        <SafeAreaView style={styles.headerConStyle}>
          <TouchableOpacity style={leftIcon && styles.imageSubView} onPress={searchOnPress}>
            <Image source={leftSource} style={styles.searchIconStyle} />
          </TouchableOpacity>
          <Text style={[styles.headerTitleStyle, headerTitleStyle]}>{label}</Text>
          <Image source={rightSource} style={styles.userIconStyle} />
        </SafeAreaView>
      ) : (
        <Animated.View style={[styles.searchView, { opacity: fadeAnim }]}>
          <TextInput placeholder="Search ..." style={styles.searchUserTextInputStyle} onChangeText={onChangeSearchText} placeholderTextColor={colors.buttonFirstColor} autoCapitalize='none' autoCorrect={false} value={searchValue}/>
          <TouchableOpacity onPress={() => {
            Animated.timing(fadeAnim, { toValue: 0, duration: 500, easing: Easing.linear, useNativeDriver: false})
            .start(() => { removeOnPress(); fadeAnim.setValue(1) });
          }}>
            <Image source={images.remove} style={styles.removeIconStyle} tintColor={colors.buttonFirstColor}/>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  userIconStyle: {
    height: hp(36),
    width: hp(36),
  },
  searchIconStyle: {
    height: hp(18),
    width: hp(18),
  },
  searchUserTextInputStyle: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    color: colors.buttonFirstColor,
  },
  removeIconStyle: {
    height: hp(22),
    width: hp(22),
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: 'Poppins-Regular',
  },
  headerConStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(24),
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'android' ? hp(30) : 0,
  },
  imageSubView: {
    width: hp(36),
    height: hp(36),
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.searchBackgroundColor,
  },
  searchView: {
    borderRadius: wp(10),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(24),
    paddingHorizontal: wp(10),
    backgroundColor: colors.white,
    marginTop: Platform.OS == 'android' ? hp(20) : 0,
  },
});

export default HeaderCon;

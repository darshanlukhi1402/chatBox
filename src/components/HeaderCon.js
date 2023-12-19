import React, {Component, useEffect, useRef} from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Platform, TouchableOpacity, View, TextInput, Animated, Easing} from 'react-native';
import {fontSize, hp, wp} from '../utils/constant';
import {colors} from '../utils/themes';
import {images} from '../assets';

const HeaderCon = ({ rightSource, label, leftSource, headerTitleStyle, searchOnPress, searchStatus, onChangeSearchText, removeOnPress, searchValue}) => {
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
          <TouchableOpacity style={styles.imageSubView} onPress={searchOnPress}>
            <Image source={leftSource} style={styles.searchIconStyle} />
          </TouchableOpacity>
          <Text style={[styles.headerTitleStyle, headerTitleStyle]}>{label}</Text>
          <Image source={rightSource} style={styles.userIconStyle} />
        </SafeAreaView>
      ) : (
        <Animated.View style={[styles.searchView, { opacity: fadeAnim }]}>
          <TextInput placeholder="Search User Name ..." style={styles.searchUserTextInputStyle} onChangeText={onChangeSearchText} placeholderTextColor={colors.buttonFirstColor} autoCapitalize='none' autoCorrect={false} value={searchValue}/>
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
  searchView: {
    backgroundColor: colors.white,
    marginHorizontal: wp(24),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    borderRadius: wp(10),
    marginTop: Platform.OS == 'android' ? hp(20) : 0,
  },
  searchUserTextInputStyle: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    color: colors.buttonFirstColor
  },
  removeIconStyle: {
    height: hp(22),
    width: hp(22),
  },
  headerConStyle: {
    marginHorizontal: wp(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? hp(20) : 0,
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

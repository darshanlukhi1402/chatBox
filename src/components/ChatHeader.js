import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';

const ChatHeader = ({
  leftIcon,
  userIcon,
  callIcon,
  userName,
  callOnPress,
  onlineStatus,
  videoCallIcon,
  leftIconOnPress,
  videoCallOnPress,
}) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={leftIconOnPress}>
        <Image source={leftIcon} style={styles.leftIconStyle} />
      </TouchableOpacity>
      <Image source={userIcon} style={styles.userDpIconStyle} />
      <View style={styles.userDetailsStyle}>
        <Text style={styles.userNameStyle}>{userName}</Text>
        <Text style={styles.onlineStatusStyle}>{onlineStatus}</Text>
      </View>
      <TouchableOpacity onPress={callOnPress}>
        <Image source={callIcon} style={styles.callIconStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={videoCallOnPress}>
        <Image source={videoCallIcon} style={styles.videoCallIconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftIconStyle: {
    width: wp(18),
    height: hp(18),
  },
  userDpIconStyle: {
    width: wp(38),
    height: hp(38),
    marginLeft: wp(12),
    borderRadius: hp(40)
  },
  userDetailsStyle: {
    flex: 1,
    marginLeft: wp(12),
  },
  userNameStyle: {
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: 'Poppins-SemiBold',
  },
  onlineStatusStyle: {
    fontSize: fontSize(10),
    color: colors.onlineStatus,
    fontFamily: 'Poppins-SemiBold',
  },
  callIconStyle: {
    width: wp(20),
    height: hp(20),
    marginLeft: wp(49),
  },
  videoCallIconStyle: {
    width: wp(20),
    height: hp(20),
    marginLeft: wp(16),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
  },
  containerStyle: {
    height: hp(75),
    marginTop: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(24),
  },
});

export default ChatHeader;

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {fontSize, hp, wp} from '../utils/constant';
import {colors} from '../utils/colors';

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
  containerStyle: {
    height: hp(75),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(24),
    marginTop: hp(10),
  },
  leftIconStyle: {
    height: hp(22),
    width: wp(22),
  },
  userDpIconStyle: {
    height: hp(24),
    width: wp(24),
    marginLeft: wp(12),
  },
  userDetailsStyle: {
    marginLeft: wp(12),
    flex: 1,
  },
  userNameStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    fontSize: fontSize(15),
  },
  onlineStatusStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.onlineStatus,
    fontSize: fontSize(10),
  },
  callIconStyle: {
    height: hp(20),
    width: wp(20),
    marginLeft: wp(49),
  },
  videoCallIconStyle: {
    height: hp(20),
    width: wp(20),
    marginLeft: wp(16),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default ChatHeader;

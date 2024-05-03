import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';
import {images} from '../assets';
import moment from 'moment';

const StatusLabel = ({
  source,
  onPress,
  subLabel,
  downBorder,
  PrimaryLabel,
  statusOnOff,
  lastOffTime,
  statusSource,
  subTextStyle,
  userImageStyle,
  labelTextStyle,
  highlightStyle,
  conStatusStyles,
  userProfilePress,
  userStatusBorderStyle,
}) => {
  return (
    <>
      <View style={[styles.conStatusStyles, conStatusStyles]}>
        <TouchableOpacity
          style={[styles.userStatusBorderStyle, userStatusBorderStyle]}
          onPress={userProfilePress}>
          <Image
            source={source}
            style={[styles.userImageStyle, userImageStyle]}
          />
        </TouchableOpacity>
        {statusOnOff && (
          <Image
            source={statusSource ? images.onlineStatus : images.offlineStatus}
            style={styles.statusStyle}
          />
        )}
        <TouchableOpacity style={{flex: 1}} onPress={onPress}>
          <Text style={[styles.labelTextStyle, labelTextStyle]}>
            {PrimaryLabel}
          </Text>
          <Text style={[styles.subTextStyle, subTextStyle]}>{subLabel}</Text>
        </TouchableOpacity>
        {statusOnOff && !statusSource && lastOffTime && (
          <Text style={styles.lastTimeStyle}>
            {moment(lastOffTime.toDate()).fromNow()}
          </Text>
        )}
      </View>
      {downBorder && (
        <View style={[styles.highlightStyle, highlightStyle]}></View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lastTimeStyle: {
    marginTop: hp(10),
    fontSize: fontSize(10),
    alignSelf: 'flex-start',
    color: colors.subMessageText,
    fontFamily: 'Poppins-Regular',
  },
  statusStyle: {
    top: hp(24),
    width: hp(8),
    right: wp(14),
    height: hp(8),
  },
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

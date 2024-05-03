import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';

const LinearButton = ({label, labelView, onPress, loading}) => {
  return (
    <TouchableOpacity onPress={loading ? null : onPress} disabled={loading}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.labelView, labelView]}>
        {loading ? (
          <View style={{marginVertical: hp(10)}}>
            <ActivityIndicator size="small" color={colors.loginTextColor} />
          </View>
        ) : (
          <Text style={styles.labelStyle}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  labelView: {
    alignItems: 'center',
    borderRadius: hp(15),
    marginHorizontal: wp(24),
  },
  labelStyle: {
    marginVertical: hp(10),
    fontSize: fontSize(14),
    fontFamily: 'Poppins-Bold',
    color: colors.loginTextColor,
  },
});

export default LinearButton;

import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {images} from '../../assets';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import {fontSize, hp, wp} from '../../utils/constant';
import LineConstant from '../../components/LineConstant';

const GetStarted = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.labelView]}>
        <Text style={styles.titleText}>{strings.getStartedTitle}</Text>
        <Text style={styles.detailText}>{strings.getStartedTitleMessage}</Text>
        <View style={styles.imageMainView}>
          <View style={styles.imageSubView}>
            <Image source={images.facebook} style={styles.image} />
          </View>
          <View style={styles.imageSubView}>
            <Image source={images.gPay} style={styles.image} />
          </View>
          <View style={styles.imageSubView}>
            <Image source={images.apple} style={styles.image} />
          </View>
        </View>
        <LineConstant label={strings.or} labelStyle={styles.labelStyle} />
        <TouchableOpacity
          style={styles.buttonViewStyle}
          onPress={() => navigate('SignUp')}>
          <Text style={styles.buttonTextStyle}>{strings.getStartedSignUp}</Text>
        </TouchableOpacity>
        <View style={styles.loginStyle}>
          <Text style={styles.loginTextStyle}>{strings.existingAccount} </Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={[styles.loginTextStyle, styles.subText]}>
              {strings.log_in}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelView: {
    flex: 1,
  },
  subText: {
    fontFamily: 'Poppins-Bold',
  },
  labelStyle: {
    color: colors.white,
  },
  image: {
    width: wp(30),
    height: hp(30),
  },
  labelStyle: {
    fontSize: fontSize(14),
    marginVertical: hp(10),
    fontFamily: 'Poppins-Bold',
    color: colors.loginTextColor,
  },
  titleText: {
    marginTop: hp(80),
    marginLeft: wp(26),
    fontSize: fontSize(57),
    fontFamily: 'Poppins-Medium',
    color: colors.loginTextColor,
  },
  detailText: {
    marginTop: hp(10),
    fontSize: fontSize(16),
    marginHorizontal: wp(26),
    fontFamily: 'Poppins-Regular',
    color: colors.subTitleTextColor,
  },
  imageMainView: {
    marginTop: hp(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(98),
    justifyContent: 'space-around',
  },
  imageSubView: {
    width: wp(40),
    height: hp(40),
    borderRadius: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff30',
  },
  buttonViewStyle: {
    borderRadius: 40,
    marginTop: hp(30),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(22),
    backgroundColor: '#ffffff5e',
  },
  buttonTextStyle: {
    color: colors.white,
    fontSize: fontSize(16),
    paddingVertical: hp(16),
    paddingHorizontal: wp(89),
    fontFamily: 'Poppins-Medium',
  },
  loginStyle: {
    marginTop: hp(20),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginTextStyle: {
    color: colors.white,
    fontSize: fontSize(14),
    fontFamily: 'Poppins-Regular',
  },
});

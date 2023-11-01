import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/colors';
import {fontSize, hp, wp} from '../../utils/constant';
import {images} from '../../assets';
import LineConstant from '../../components/LineConstant';
import {strings} from '../../utils/string';
import {useNavigation} from '@react-navigation/native';

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
        <TouchableOpacity style={styles.buttonViewStyle} onPress={() => navigate('SignUp')}>
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
    flex: 1
  },
  labelStyle: {
    marginVertical: hp(10),
    fontFamily: 'Poppins-Bold',
    color: colors.loginTextColor,
    fontSize: fontSize(14),
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(57),
    color: colors.loginTextColor,
    marginTop: hp(80),
    marginLeft: wp(26),
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(16),
    color: colors.subTitleTextColor,
    marginTop: hp(10),
    marginHorizontal: wp(26),
  },
  imageMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(44),
    justifyContent: 'space-around',
    marginHorizontal: wp(98),
  },
  imageSubView: {
    backgroundColor: '#ffffff30',
    borderRadius: 40,
    height: hp(40),
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: wp(30),
    height: hp(30),
  },
  labelStyle: {
    color: colors.white,
  },
  buttonViewStyle: {
    marginHorizontal: wp(22),
    backgroundColor: '#ffffff5e',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginTop: hp(30),
  },
  buttonTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(16),
    color: colors.white,
    paddingHorizontal: wp(89),
    paddingVertical: hp(16),
  },
  loginStyle: {
    marginTop: hp(30),
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  loginTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(14),
    color: colors.white,
  },
  subText: {
    fontFamily: 'Poppins-Bold',
  },
});

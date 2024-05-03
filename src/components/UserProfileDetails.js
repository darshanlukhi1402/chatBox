import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {images} from '../assets';
import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';
import UserProfileIcons from './UserProfileIcons';
import UserDetails from '../Screen/Message/UserDetails';

const UserProfileDetails = () => {
  const route = useRoute().params;
  const {navigate, goBack} = useNavigation();

  const userChatPress = user => {
    navigate('ChatScreen', user);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.container]}>
        <View style={{}}>
          <TouchableOpacity style={styles.backButtonStyle} onPress={goBack}>
            <Image source={images.back} style={styles.leftIconStyle} />
          </TouchableOpacity>
          <View style={styles.bioProfileStyle}>
            <View style={styles.userProfileView}>
              <Image
                source={{uri: route?.userDpUri}}
                style={styles.profileIconStyle}
              />
            </View>
            <Text style={styles.userNameStyle}>{route?.name}</Text>
            <Text style={styles.userBioNameStyle}>@{route?.name}</Text>
          </View>
          <View style={styles.conUserFet}>
            <UserProfileIcons
              source={images.groupP}
              onPress={() => userChatPress(route)}
            />
            <UserProfileIcons source={images.videosP} />
            <UserProfileIcons source={images.callP} />
            <UserProfileIcons source={images.more} />
          </View>
        </View>
        <View style={styles.listConView}>
          <UserDetails value={route.name} label={'Display Name'} />
          <UserDetails value={route.email} label={'Email Address'} />
          <UserDetails
            value={'33 street west subidbazar,sylhet'}
            label={'Address'}
          />
          <UserDetails value={'(320) 555-0104'} label={'Phone  Number'} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userNameStyle: {
    color: colors.white,
    marginVertical: hp(4),
    fontSize: fontSize(20),
    fontFamily: 'Poppins-Bold',
  },
  userBioNameStyle: {
    marginTop: hp(-6),
    color: colors.white,
    fontSize: fontSize(12),
    fontFamily: 'Poppins-Regular',
  },
  profileIconStyle: {
    width: hp(70),
    height: hp(70),
  },
  bioProfileStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonStyle: {
    marginTop: hp(20),
    marginLeft: wp(24),
  },
  listConView: {
    flex: 1,
    paddingTop: hp(30),
    borderTopEndRadius: wp(40),
    borderTopStartRadius: wp(40),
    backgroundColor: colors.white,
    paddingLeft: wp(24),
  },
  leftIconStyle: {
    width: wp(22),
    height: hp(22),
    tintColor: colors.white,
  },
  conUserFet: {
    width: '70%',
    marginTop: hp(16),
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: hp(20),
    justifyContent: 'space-around',
  },
  userProfileView: {
    width: hp(86),
    height: hp(86),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: wp(50),
    justifyContent: 'center',
    borderColor: colors.white,
  },
});

export default UserProfileDetails;

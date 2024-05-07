import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

import {images} from '../assets';
import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';
import {useNavigation} from '@react-navigation/native';

const BioBox = ({currentUserData}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.profileCon}>
      <Image
        source={{uri: currentUserData?.userDpUri}}
        style={styles.profileIcon}
      />
      <View style={styles.userBioView}>
        <Text style={styles.userLabel}>
          {`${currentUserData?.firstName} ${currentUserData?.lastName}`}
        </Text>
        <Text style={styles.userNotesStyle}>{currentUserData?.about}</Text>
      </View>
      <TouchableOpacity onPress={() => navigate('QRCodeScanners')}>
        <Image source={images?.qrCode} style={styles.qrIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default BioBox;

const styles = StyleSheet.create({
  qrIcon: {
    width: hp(22),
    height: hp(22),
  },
  profileIcon: {
    width: hp(60),
    height: hp(60),
    borderRadius: hp(40)
  },
  userBioView: {
    flex: 1,
    marginLeft: wp(14),
  },
  profileCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLabel: {
    color: colors.black,
    fontSize: fontSize(18),
    fontFamily: 'Poppins-Bold',
  },
  userNotesStyle: {
    marginTop: hp(-6),
    marginLeft: wp(2),
    color: colors.grey,
    fontSize: fontSize(12),
    fontFamily: 'Poppins-Regular',
  },
});

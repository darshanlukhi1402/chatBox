import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {images} from '../assets';
import {hp, wp} from '../utils/constant';
import {colors} from '../utils/themes';

const UpdateUser = ({currentUserData, editPress, loader}) => {
  return (
    <View style={styles.userProfileIconViewStyle}>
      {loader ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="small" color={colors.textColor} />
        </View>
      ) : (
        <>
          <Image
            style={styles.userProfileIconStyle}
            source={{uri: currentUserData?.userDpUri}}
          />
          <TouchableOpacity
            onPress={editPress}
            activeOpacity={0.6}
            style={styles.userEditIconViewStyle}>
            <Image
              source={images?.userProfileEditIcon}
              style={styles.editIconStyle}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  editIconStyle: {
    height: hp(18),
    width: hp(18),
  },
  userProfileIconStyle: {
    width: hp(100),
    height: hp(100),
    borderRadius: hp(60),
  },
  userProfileIconViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(20),
    flexDirection: 'row',
  },
  userEditIconViewStyle: {
    top: hp(30),
    right: wp(26),
    width: hp(28),
    height: hp(28),
    borderWidth: wp(2),
    alignItems: 'center',
    borderRadius: hp(20),
    justifyContent: 'center',
    borderColor: colors.white,
    backgroundColor: colors.textColor,
  },
  loaderStyle: {
    width: hp(100),
    height: hp(100),
    borderWidth: wp(0.2),
    borderRadius: hp(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.textColor,
  },
});

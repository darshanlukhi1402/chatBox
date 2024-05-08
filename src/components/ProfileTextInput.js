import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {images} from '../assets';
import {colors} from '../utils/themes';
import {hp, wp} from '../utils/constant';

const ProfileTextInput = ({
  editMode,
  inputRef,
  aboutText,
  setAboutText,
  blurOnSubmit,
  toggleEditMode,
  onSubmitEditing,
}) => {
  return (
    <View style={styles.aboutConStyle}>
      <Image source={images?.about} style={styles.aboutIconStyle} />
      <View style={styles.aboutViewStyle}>
        <Text style={styles.aboutTextStyle}>About</Text>
        {editMode ? (
          <TextInput
            editable
            ref={inputRef}
            multiline={true}
            value={aboutText}
            blurOnSubmit={blurOnSubmit}
            style={[styles.inputStyle]}
            onSubmitEditing={onSubmitEditing}
            onChangeText={text => setAboutText(text)}
          />
        ) : (
          <TextInput
            value={aboutText}
            editable={false}
            style={[styles.inputStyle]}
          />
        )}
      </View>
      <TouchableOpacity style={{marginRight: wp(20)}} onPress={toggleEditMode}>
        <Image source={images?.pen} style={styles.editAboutIconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTextInput;

const styles = StyleSheet.create({
  aboutTextStyle: {
    color: colors.grey,
    fontFamily: 'Poppins-Medium',
  },
  aboutIconStyle: {
    width: hp(20),
    height: hp(20),
    tintColor: colors.textColor,
  },
  aboutViewStyle: {
    flex: 1,
    maxHeight: hp(80),
    marginLeft: wp(24),
  },
  editAboutIconStyle: {
    width: hp(20),
    height: hp(20),
    tintColor: colors.grey,
  },
  aboutConStyle: {
    marginTop: hp(60),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(24),
  },
  inputStyle: {
    margin: 0,
    padding: 0,
    maxHeight: hp(60),
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
});

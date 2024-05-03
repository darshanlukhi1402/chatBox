import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {images} from '../assets';
import {colors} from '../utils/themes';
import {fontSize, hp, wp} from '../utils/constant';

const ChatTextInput = ({
  value,
  onFocus,
  content,
  onChangeText,
  placeholder,
  leftOnPress,
  sendOnPress,
  camerOnPress,
  voiceOnPress,
}) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={leftOnPress}>
        <Image source={images.clip} style={styles.iconStyle} />
      </TouchableOpacity>
      <View style={styles.chatTextInputStyle}>
        {content ? (
          <View style={{flex: 1}}>
            <Image
              source={
                content == 'image/jpeg'
                  ? images.selectedImages
                  : content == 'application/pdf'
                  ? images.selectedPdf
                  : images.selectedVideo
              }
              style={styles.selectedContentStyle}
            />
          </View>
        ) : (
          <TextInput
            value={value}
            onFocus={onFocus}
            style={styles.chatStyle}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor={colors.onlineStatus}
            autoCapitalize="none"
          />
        )}
        <TouchableOpacity onPress={sendOnPress}>
          <Image
            source={images.send}
            style={styles.iconStyle}
            tintColor={colors.sendButtonColor}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={camerOnPress} style={{marginLeft: wp(16)}}>
        <Image source={images.camera} style={styles.iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={voiceOnPress} style={{marginLeft: wp(12)}}>
        <Image source={images.microphone} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    height: hp(20),
    width: wp(20),
  },
  selectedContentStyle: {
    width: hp(20),
    height: hp(20),
  },
  containerStyle: {
    height: hp(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(24),
  },
  chatStyle: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: fontSize(12),
    fontFamily: 'Poppins-Light',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
  },
  chatTextInputStyle: {
    flex: 1,
    height: hp(40),
    borderRadius: 10,
    marginLeft: wp(11),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(8),
    backgroundColor: colors.chatTextInput,
  },
});

export default ChatTextInput;

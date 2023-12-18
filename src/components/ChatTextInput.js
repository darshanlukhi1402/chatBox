import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {fontSize, hp, wp} from '../utils/constant';
import {images} from '../assets';
import {colors} from '../utils/themes';

const ChatTextInput = ({
  value,
  onFocus,
  onChangeText,
  placeholder,
  leftOnPress,
  sendOnPress,
  camerOnPress,
  voiceOnPress,
  content,
}) => {
  console.log('content', content?.fileCopyUri);
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={leftOnPress}>
        <Image source={images.clip} style={styles.iconStyle} />
      </TouchableOpacity>
      <View style={styles.chatTextInputStyle}>
        {content?.type ? (
          <View style={{flex: 1}}>
            <Image
              source={
                content?.type == 'image/jpeg'
                  ? images.selectedImages
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
  selectedContentStyle: {
    height: hp(20),
    width: hp(20),
  },
  containerStyle: {
    height: hp(90),
    marginHorizontal: wp(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: fontSize(12),
    flex: 1,
    marginLeft: wp(2),
  },
  chatTextInputStyle: {
    flex: 1,
    backgroundColor: colors.chatTextInput,
    height: hp(40),
    marginLeft: wp(11),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  iconStyle: {height: hp(20), width: wp(20)},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default ChatTextInput;

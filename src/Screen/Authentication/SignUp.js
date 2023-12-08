import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  // TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
// import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
// import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {images} from '../../assets';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import Header from '../../components/Header';
import Felids from '../../components/Felids';
import {fontSize, hp, wp} from '../../utils/constant';
import LinearButton from '../../components/LinearButton';

const SignUp = () => {
  const {navigate, goBack} = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('D12345');
  const [conPassword, setConPassword] = useState('D12345');

  // const [imageData, setImageData] = useState('');
  // const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  // useEffect(() => {}, [email, name]);

  // const pickImage = async () => {
  //   try {
  //     const res = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.images],
  //       copyTo: 'cachesDirectory',
  //     });
  //     setImageData(res);
  //     Alert.alert('Image Selected Successfully');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const uploadImage = async () => {
  //   if (imageData.uri < 0) return Alert.alert('Enter the All Data');
  //   else {
  //     try {
  //       const response = storage().ref(`/UsersProfileIcon/${name}`);
  //       const put = await response.putFile(imageData.fileCopyUri);
  //       console.log(put);
  //       const url = await response.getDownloadURL();
  //       setImgDownloadUrl(url);
  //       return url;
  //     } catch (err) {
  //       console.log('err >---->', err);
  //     }
  //   }
  // };

  const handleSignup = async () => {
    try {
      if (name && email && password && conPassword) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log(response);

        // const imageUrl = await uploadImage();

        const userData = {
          name: name,
          email: email,
          password: password,
          // userDpUri: imageUrl,
          id: response.user.uid,
          confirm_password: conPassword,
          created: firestore.Timestamp.fromDate(new Date()),
        };

        await firestore()
          .collection('users')
          .doc(response.user.uid)
          .set(userData);

        Alert.alert('Account Is Created ...');
        navigate('Login');
      } else Alert.alert('Enter the All Data');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header source={images.back} onPress={() => goBack()} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerStyle}>
          <Text style={styles.loinTextStyle}>{strings.sign_up_with_email}</Text>
          <Text style={styles.welcomeMessage}>{strings.signUpLine}</Text>
        </View>
        {/* <TouchableOpacity style={styles.imageStyles} onPress={pickImage}>
        <Text>jhjnjj</Text>
      </TouchableOpacity> */}
        <Felids
          label={strings.your_name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <Felids
          label={strings.your_email}
          onChangeText={text => {
            setEmail(text);
          }}
          autoCapitalize={false}
        />
        <Felids
          label={strings.password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry
          autoCapitalize={false}
        />
        <Felids
          label={strings.confirm_password}
          onChangeText={text => {
            setConPassword(text);
          }}
          secureTextEntry
          autoCapitalize={false}
        />
        <View style={styles.downStyle}>
          <LinearButton
            label={strings.create_an_account}
            onPress={handleSignup}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // imageStyles: {
  //   height: hp(100),
  //   width: hp(100),
  //   borderWidth: 1,
  //   alignSelf: 'center',
  // },
  headerStyle: {
    marginTop: hp(60),
    marginBottom: hp(30),
  },
  downStyle: {
    marginTop: hp(180),
  },
  forgotView: {
    alignSelf: 'center',
    marginTop: hp(16),
  },
  forgotStyle: {
    color: colors.textColor,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(11),
  },
  loginIconView: {
    width: wp(184),
    height: hp(48),
    alignSelf: 'center',
    marginTop: hp(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginIconStyle: {
    height: hp(36),
    width: wp(46),
  },
  welcomeMessage: {
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize(12),
    color: '#797C7B',
    marginTop: hp(19),
  },
  loinTextStyle: {
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    fontSize: fontSize(17),
    color: colors.textColor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backGroundColor,
  },
});

export default SignUp;

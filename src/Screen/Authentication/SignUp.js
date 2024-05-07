import React, {useState} from 'react';
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
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [conPasswordError, setConPasswordError] = useState('');

  const handleSignup = async () => {
    try {
      if (!name) {
        setNameError('Please enter a name');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email address');
        return;
      }

      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      }

      if (password !== conPassword) {
        setConPasswordError('Passwords do not match');
        return;
      }

      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const userData = {
        name: name,
        email: email.toLowerCase(),
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

      Alert.alert('Success', 'Account created successfully');
      navigate('Login');
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
            setNameError('');
          }}
          error={nameError}
          value={name}
        />
        <Felids
          label={strings.your_email}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
          autoCapitalize={false}
          error={emailError}
          value={email}
        />
        <Felids
          label={strings.password}
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
          }}
          secureTextEntry
          autoCapitalize={false}
          error={passwordError}
          value={password}
        />
        <Felids
          label={strings.confirm_password}
          onChangeText={text => {
            setConPassword(text);
            setConPasswordError('');
          }}
          secureTextEntry
          autoCapitalize={false}
          error={conPasswordError}
          value={conPassword}
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
  container: {
    flex: 1,
    backgroundColor: colors.backGroundColor,
  },
  headerStyle: {
    marginTop: hp(60),
    marginBottom: hp(30),
  },
  downStyle: {
    marginTop: hp(160),
  },
  forgotView: {
    alignSelf: 'center',
    marginTop: hp(16),
  },
  forgotStyle: {
    fontSize: fontSize(11),
    color: colors.textColor,
    fontFamily: 'Poppins-Regular',
  },
  loginIconView: {
    width: wp(184),
    height: hp(48),
    marginTop: hp(36),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginIconStyle: {
    height: hp(36),
    width: wp(46),
  },
  welcomeMessage: {
    color: '#797C7B',
    marginTop: hp(19),
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: fontSize(12),
    fontFamily: 'Poppins-Regular',
  },
  loinTextStyle: {
    alignSelf: 'center',
    fontSize: fontSize(17),
    color: colors.textColor,
    fontFamily: 'Poppins-Bold',
  },
});

export default SignUp;

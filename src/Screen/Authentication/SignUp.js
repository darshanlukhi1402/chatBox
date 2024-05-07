import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
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
import {defaultUserUrl} from '../../utils/Global';

const SignUp = () => {
  const {navigate, goBack} = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [conPasswordError, setConPasswordError] = useState('');

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (!firstName) {
        setFirstNameError('Please enter your first name');
        setLoading(false);
        return;
      }

      if (!lastName) {
        setLastNameError('Please enter your last name');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email address');
        setLoading(false);
        return;
      }

      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(phoneNumber)) {
        setPhoneNumberError('Please enter a valid phone number');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (password !== conPassword) {
        setConPasswordError('Passwords do not match');
        setLoading(false);
        return;
      }
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const userData = {
        lastName: lastName,
        password: password,
        firstName: firstName,
        id: response.user.uid,
        phoneNumber: phoneNumber,
        email: email.toLowerCase(),
        userDpUri: defaultUserUrl,
        confirm_password: conPassword,
        created: firestore.Timestamp.fromDate(new Date()),
      };

      await firestore()
        .collection('users')
        .doc(response.user.uid)
        .set(userData);

      Alert.alert('Success', 'Account created successfully');
      navigate('Login');
      setLoading(false);
      // emptyState();
    } catch (err) {
      setLoading(false);

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage =
              'This email address is already in use. Please use a different email.';
            break;
          case 'auth/invalid-email':
            errorMessage =
              'Invalid email address. Please provide a valid email.';
            break;
          case 'auth/weak-password':
            errorMessage =
              'Weak password. Password must be at least 6 characters long.';
            break;
          case 'auth/user-not-found':
            errorMessage =
              'User not found. Please check your email and try again.';
            break;
          case 'auth/wrong-password':
            errorMessage =
              'Incorrect password. Please check your password and try again.';
            break;
          default:
            errorMessage = 'An error occurred. Please try again later.';
            break;
        }
      }

      Alert.alert('Error', errorMessage);
    }
  };

  const validPhoneNumber = text => {
    if (/^\d+$/.test(text) || text === '') {
      setPhoneNumber(text);
      setPhoneNumberError('');
    }
  };

  const emptyState = () => {
    setEmail('');
    setLastName('');
    setPassword('');
    setFirstName('');
    setPhoneNumber('');
    setConPassword('');
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
          value={firstName}
          error={firstNameError}
          label={strings.first_name}
          onChangeText={text => {
            setFirstName(text);
            setFirstNameError('');
          }}
        />
        <Felids
          value={lastName}
          error={lastNameError}
          label={strings.last_name}
          onChangeText={text => {
            setLastName(text);
            setLastNameError('');
          }}
        />
        <Felids
          value={email}
          error={emailError}
          autoCapitalize={false}
          label={strings.your_email}
          keyboardType={'email-address'}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
        />
        <Felids
          maxLength={10}
          value={phoneNumber}
          error={phoneNumberError}
          keyboardType={'number-pad'}
          label={strings.phone_number}
          onChangeText={text => validPhoneNumber(text)}
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
            loading={loading}
            onPress={handleSignup}
            label={strings.create_an_account}
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
    marginTop: hp(60),
    marginBottom: hp(20),
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

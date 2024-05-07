import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {images} from '../../assets';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import Header from '../../components/Header';
import Felids from '../../components/Felids';
import ErrorModal from '../../components/ErrorModal';
import {fontSize, hp, wp} from '../../utils/constant';
import LineConstant from '../../components/LineConstant';
import LinearButton from '../../components/LinearButton';

const Login = () => {
  const {navigate, goBack, dispatch} = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('D12345');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState({visible: false, message: ''});

  const handleLogin = async () => {
    try {
      setLoading(true);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email address');
        setLoading(false);
        return;
      } else {
        setEmailError('');
      }

      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        setLoading(false);
        return;
      } else {
        setPasswordError('');
      }

      await auth()
        .signInWithEmailAndPassword(email.toLowerCase(), password)
        .then(async () => {
          await AsyncStorage.setItem('userAdded', 'user');
          const token = await messaging().getToken();
          await firestore()
            .collection('users')
            .doc(`${auth().currentUser.uid}`)
            .update({fcm_token: token});

          dispatch(StackActions.replace('TabNavigation'));
        })
        .catch(error => {
          setError({visible: true, message: getErrorMessage(error)});
        });
      setLoading(false);
    } catch (err) {}
  };

  const getErrorMessage = error => {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email address or password';
      case 'auth/invalid-login':
        return 'Invalid login credentials. Please check your email and password.';
      default:
        return 'An error occurred while logging in. Please try again later.';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header source={images?.back} onPress={() => goBack()} />
      <ErrorModal
        visible={error.visible}
        message={error.message}
        onClose={() => setError({visible: false})}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerStyle}>
          <Text style={styles.loinTextStyle}>{strings.log_in_chatBox}</Text>
          <Text style={styles.welcomeMessage}>{strings.welcomeLine}</Text>
        </View>
        <View style={styles.loginIconView}>
          <Image style={styles.loginIconStyle} source={images.facebook} />
          <Image style={styles.loginIconStyle} source={images.gPay} />
          <Image style={styles.loginIconStyle} source={images.apple} />
        </View>
        <LineConstant label={strings.or} />
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
        <View style={styles.downStyle}>
          <LinearButton
            label={strings.log_in}
            onPress={handleLogin}
            loading={loading}
          />
          <TouchableOpacity
            style={styles.forgotView}
            onPress={() => {
              navigate('SignUp');
            }}>
            <Text style={styles.forgotStyle}>{strings.forgot_password}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: hp(50),
  },
  downStyle: {
    marginTop: hp(210),
  },
  container: {
    flex: 1,
    backgroundColor: colors.backGroundColor,
  },
  forgotView: {
    alignSelf: 'center',
    marginTop: hp(16),
    marginBottom: hp(10),
  },
  forgotStyle: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
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
    marginTop: hp(19),
    color: '#797C7B',
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

export default Login;

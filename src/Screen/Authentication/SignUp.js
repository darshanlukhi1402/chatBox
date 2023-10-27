import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet, SafeAreaView} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {images} from '../../assets';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/string';
import Header from '../../components/Header';
import Felids from '../../components/Felids';
import {fontSize, hp, wp} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import LinearButton from '../../components/LinearButton';

const SignUp = () => {
  const {navigate} = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const handleSignup = async () => {
    try {
      if (name && email && password && conPassword) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log(response);

        const userData = {
          name: name,
          email: email,
          password: password,
          id: response.user.uid,
          confirm_password: conPassword,
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
      <Header source={images.back} />
      <View style={styles.headerStyle}>
        <Text style={styles.loinTextStyle}>{strings.sign_up_with_email}</Text>
        <Text style={styles.welcomeMessage}>{strings.signUpLine}</Text>
      </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: hp(60),
    marginBottom: hp(30),
  },
  downStyle: {
    flex: 1,
    justifyContent: 'flex-end',
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

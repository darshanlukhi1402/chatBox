import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {images} from '../../assets';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import BioBox from '../../components/BioBox';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';
import {getUserData, settingData} from '../../utils/Global';

const Settings = () => {
  const {dispatch} = useNavigation();
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userId = auth().currentUser.uid;
    const userData = await getUserData(userId);
    setCurrentUserData(userData);
  };

  const updateOnlineStatus = async () => {
    const userId = auth().currentUser.uid;
    const userRef = firestore().collection('users').doc(userId);
    await userRef.update({
      online: false,
      lastOnlineTime: firestore.Timestamp.fromDate(new Date()),
    });
  };

  const logOutPress = async () => {
    await updateOnlineStatus();
    await auth().signOut();
    AsyncStorage.clear();
    dispatch(StackActions.replace('GetStarted'));
  };

  const renderSettingItem = ({item}) => {
    return (
      <View style={styles.settingFetStyle}>
        <Image source={item?.icon} style={styles.settingsFetIcons} />
        <TouchableOpacity style={styles.settingsFetLabels}>
          <Text style={styles.settingsLabelTextStyle}>{item.label}</Text>
          {item.sabLabel && (
            <Text style={styles.settingSubLabelStyle}>{item.sabLabel}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.container]}>
        <HeaderCon label={strings.settings} />
        <View style={styles.listConView}>
          <BioBox {...{currentUserData}} />
          <View style={[styles.highlightStyle]}></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList data={settingData} renderItem={renderSettingItem} />
            <TouchableOpacity
              onPress={logOutPress}
              style={styles.logoutButtonStyle}>
              <Image source={images.logout} style={styles.logoutIconStyle} />
              <Text style={styles.logoutTextStyle}>{strings?.Logout}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutIconStyle: {
    width: hp(20),
    height: hp(20),
  },
  settingsFetIcons: {
    width: hp(44),
    height: hp(44),
  },
  settingsFetLabels: {
    flex: 1,
    marginLeft: wp(14),
    justifyContent: 'center',
  },
  settingFetStyle: {
    flexDirection: 'row',
    marginBottom: hp(30),
  },
  settingsLabelTextStyle: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: 'Poppins-SemiBold',
  },
  settingSubLabelStyle: {
    marginLeft: wp(2),
    color: colors.grey,
    fontSize: fontSize(12),
    fontFamily: 'Poppins-Light',
  },
  logoutButtonStyle: {
    flex: 1,
    marginLeft: wp(14),
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp(50),
    justifyContent: 'flex-start',
  },
  logoutTextStyle: {
    marginLeft: wp(14),
    color: colors.red,
    fontSize: fontSize(16),
    fontFamily: 'Poppins-Medium',
  },
  listConView: {
    flex: 1,
    top: hp(40),
    paddingTop: hp(30),
    paddingHorizontal: wp(24),
    borderTopEndRadius: wp(40),
    borderTopStartRadius: wp(40),
    backgroundColor: colors.white,
  },
  highlightStyle: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: hp(26),
    borderWidth: hp(0.2),
    marginVertical: hp(20),
    borderColor: colors.subMessageText,
  },
});

export default Settings;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
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
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userId = auth().currentUser.uid;
    const userData = await getUserData(userId);
    setCurrentUserData(userData);
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
          {/* <TouchableOpacity
            onPress={async () => {
              await auth().signOut();
              AsyncStorage.clear();
              dispatch(StackActions.replace('GetStarted'));
            }}>
            <Text>Logout</Text>
          </TouchableOpacity> */}
          {/* <View style={{flexDirection: 'row', borderWidth: 1}}> */}
          <BioBox {...{currentUserData}} />
          <View style={[styles.highlightStyle]}></View>
          <FlatList
            data={settingData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.settingFetStyle}>
                  <Image source={item?.icon} style={styles.settingsFetIcons} />
                  <View style={styles.settingsFetLabels}>
                    <Text style={styles.settingsLabelTextStyle}>
                      {item.label}
                    </Text>
                    <Text style={styles.settingSubLabelStyle}>
                      {item.sabLabel}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsFetLabels: {
    flex: 1,
    marginLeft: wp(14),
  },
  settingsFetIcons: {
    width: hp(44),
    height: hp(44),
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
  listConView: {
    flex: 1,
    top: hp(40),
    paddingTop: hp(30),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: wp(24),
    backgroundColor: colors.white,
  },
  highlightStyle: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: hp(40),
    borderWidth: hp(0.2),
    marginVertical: hp(20),
    borderColor: colors.subMessageText,
  },
});

export default Settings;

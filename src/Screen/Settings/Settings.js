import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const {dispatch} = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.container]}>
        <HeaderCon label={strings.settings} />
        <View style={styles.listConView}>
          <TouchableOpacity
            onPress={async () => {
              await auth().signOut();
              AsyncStorage.clear();
              dispatch(StackActions.replace('GetStarted'));
            }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listConView: {
    flex: 1,
    top: hp(10),
    paddingTop: hp(30),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.white,
  },
});

export default Settings;

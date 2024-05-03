import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';

const Calls = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.container]}>
        <HeaderCon label={strings.calls} />
        <View style={styles.listConView}></View>
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
    borderTopEndRadius: wp(40),
    borderTopStartRadius: wp(40),
    backgroundColor: colors.white,
  },
});

export default Calls;

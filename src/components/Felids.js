import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {hp, wp} from '../utils/constant';
import {colors} from '../utils/colors';

const Felids = ({
  label,
  onChangeText,
  autoCapitalize,
  secureTextEntry,
  value,
}) => {
  return (
    <View style={styles.con}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        value={value}
        style={styles.textInputStyle}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: 'Poppins-Medium',
    color: colors.textColor,
  },
  textInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDD1D0',
    paddingBottom: hp(5),
    fontFamily: 'Poppins-Regular',
  },
  con: {
    height: hp(58),
    marginHorizontal: wp(20),
    justifyContent: 'space-between',
    marginTop: hp(30),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Felids;

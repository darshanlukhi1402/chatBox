import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {colors} from '../utils/themes';
import {hp, wp} from '../utils/constant';

const Felids = ({
  value,
  label,
  error,
  maxLength,
  keyboardType,
  onChangeText,
  autoCapitalize,
  secureTextEntry,
}) => {
  return (
    <View style={styles.con}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.textInputStyle}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    paddingBottom: hp(5),
    borderBottomColor: '#CDD1D0',
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  con: {
    height: hp(58),
    marginTop: hp(30),
    marginHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Felids;

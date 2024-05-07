import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';

import {images} from '../../../assets';
import {colors} from '../../../utils/themes';
import {getUserData} from '../../../utils/Global';
import HeaderCon from '../../../components/HeaderCon';
import UpdateUser from '../../../components/UpdateUser';
import {fontSize, hp, wp} from '../../../utils/constant';
import ProfileTextInput from '../../../components/ProfileTextInput';

const Account = () => {
  const inputRef = useRef(null);
  const {goBack} = useNavigation();

  const [loading, setLoading] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentUserData, setCurrentUserData] = useState();
  const [localImageData, setLocalImageData] = useState('');
  const [storageImageData, setStorageImageData] = useState('');

  useEffect(() => {
    const userId = auth().currentUser.uid;
    getUserData(userId).then(res => {
      setCurrentUserData(res);
      setAboutText(res?.about || '');
    });
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const userEditPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
        copyTo: 'cachesDirectory',
      });
      setLoading(true);
      setLocalImageData(res);
      if (res.length !== 0) {
        const filePath = `/profile/${res[0].name}`;
        const response = storage().ref(filePath);
        await response.putFile(res[0].uri);
        const url = await response.getDownloadURL();

        setStorageImageData(url);

        await firestore()
          .collection('users')
          .doc(currentUserData.id)
          .update({userDpUri: url});
      }

      const userId = auth().currentUser.uid;
      const updatedUserData = await getUserData(userId);
      setCurrentUserData(updatedUserData);

      setLoading(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled.');
      } else {
        console.error('Error while picking/uploading a file:', err);
      }
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <HeaderCon
          label={'Account'}
          searchOnPress={goBack}
          leftSource={images?.back}
          headerConStyle={styles.headerTopStyle}
          headerTitleStyle={styles.headerConSTyle}
        />
        <View style={[styles.highlightStyle]}></View>
        <View>
          <UpdateUser
            loader={loading}
            currentUserData={currentUserData}
            editPress={() => userEditPress()}
          />
          <ProfileTextInput
            {...{
              editMode,
              inputRef,
              aboutText,
              setAboutText,
              toggleEditMode,
            }}
          />
          <View style={{...styles.highlightStyle, width: '80%'}}></View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTopStyle: {
    marginTop: hp(16),
  },
  headerConSTyle: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: 'Poppins-Medium',
  },
  highlightStyle: {
    width: '100%',
    marginTop: hp(14),
    alignSelf: 'center',
    marginBottom: hp(20),
    borderWidth: hp(0.2),
    borderColor: colors.subMessageText,
  },
});

export default Account;

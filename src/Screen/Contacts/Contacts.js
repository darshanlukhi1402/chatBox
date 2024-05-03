import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Text,
} from 'react-native';

import Contact from 'react-native-contacts';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {images} from '../../assets';
import {border} from '../../utils/dummy';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';
import StatusLabel from '../../components/StatusLabel';

const Contacts = () => {
  const {navigate} = useNavigation();

  const isFocused = useIsFocused();
  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserData, setCurrentUserData] = useState([]);
  const [searchFunctionality, setSearchFunctionality] = useState(false);

  useEffect(() => {
    getPermission();
    getUserData();
  }, [isFocused]);

  const getUserData = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(`${auth().currentUser.uid}`)
        .get()
        .then(res => {
          setCurrentUserData(res._data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res === 'granted') {
        Contact.getAll()
          .then(con => {
            setContactList(con);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  const handleRemove = () => {
    setSearchFunctionality(false);
    setSearchQuery('');
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const filteredContacts = contactList.filter(contact =>
    contact.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.container]}>
        <HeaderCon
          leftIcon
          label={strings.contacts}
          searchValue={searchQuery}
          leftSource={images.search}
          removeOnPress={handleRemove}
          onChangeSearchText={handleSearch}
          searchStatus={searchFunctionality}
          rightSource={{uri: currentUserData.userDpUri}}
          searchOnPress={() => setSearchFunctionality(true)}
        />
        <View style={styles.listConView}>
          <Text style={styles.contactLabelStyle}>{strings.my_Contact}</Text>
          <FlatList
            data={filteredContacts}
            bounces={false}
            style={{marginBottom: hp(30)}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <StatusLabel
                  PrimaryLabel={item?.displayName}
                  subTextStyle={styles.subTextStyles}
                  labelTextStyle={styles.labelStyles}
                  subLabel={item.phoneNumbers[0].number}
                  userImageStyle={styles.userImageStyles}
                  conStatusStyles={{marginBottom: hp(30)}}
                  highlightStyle={styles.downBorderStyle}
                  userStatusBorderStyle={{
                    borderColor: border[index % border.length],
                  }}
                />
              );
            }}
            keyExtractor={item => item.recordID}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  contactLabelStyle: {
    marginHorizontal: wp(12),
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    fontSize: fontSize(16),
    marginBottom: hp(20),
  },
  subTextStyles: {
    fontSize: fontSize(12),
    color: colors.constantOne,
  },
  labelStyles: {
    fontSize: fontSize(16),
  },
  downBorderStyle: {
    marginBottom: hp(16),
  },
  userImageStyles: {
    height: hp(36),
    width: hp(36),
  },
  numberTextStyle: {
    color: '#000',
    marginTop: 4,
  },
  conTextStyle: {
    color: '#000E08',
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(16),
  },
  conListStyle: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
  myConStyle: {
    color: '#000E08',
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(16),
    marginBottom: hp(20),
    paddingLeft: wp(20),
  },
  listConView: {
    flex: 1,
    // top: hp(20),
    top: hp(40),
    paddingTop: hp(30),
    borderTopEndRadius: wp(40),
    borderTopStartRadius: wp(40),
    backgroundColor: colors.white,
  },
  searchInput: {
    height: 40,
    borderColor: colors.constantOne,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    color: colors.constantOne,
  },
});

export default Contacts;

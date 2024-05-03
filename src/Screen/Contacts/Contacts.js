import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
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
  container: {
    flex: 1,
  },
  conListStyle: {
    padding: 10,
  },
  userImageStyles: {
    height: hp(36),
    width: hp(36),
  },
  numberTextStyle: {
    color: '#000',
    marginTop: 4,
  },
  labelStyles: {
    fontSize: fontSize(16),
  },
  downBorderStyle: {
    marginBottom: hp(16),
  },
  subTextStyles: {
    fontSize: fontSize(12),
    color: colors.constantOne,
  },
  conTextStyle: {
    color: '#000E08',
    fontSize: fontSize(16),
    fontFamily: 'Poppins-Medium',
  },
  myConStyle: {
    color: '#000E08',
    paddingLeft: wp(20),
    marginBottom: hp(20),
    fontSize: fontSize(16),
    fontFamily: 'Poppins-Medium',
  },
  listConView: {
    flex: 1,
    top: hp(40),
    paddingTop: hp(30),
    borderTopEndRadius: wp(40),
    borderTopStartRadius: wp(40),
    backgroundColor: colors.white,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: colors.constantOne,
    borderColor: colors.constantOne,
  },
  contactLabelStyle: {
    color: colors.black,
    marginBottom: hp(20),
    fontSize: fontSize(16),
    marginHorizontal: wp(12),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Contacts;

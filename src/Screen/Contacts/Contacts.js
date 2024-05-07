import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import Contact from 'react-native-contacts';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {border} from '../../utils/dummy';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import {images, lottie} from '../../assets';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';
import StatusLabel from '../../components/StatusLabel';

const Contacts = () => {
  const isFocused = useIsFocused();
  const {navigate} = useNavigation();

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
          })
          .finally(() => {
            setLoading(false);
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

  const EmptyListComponent = () => (
    <View style={styles.emptyDataViewStyle}>
      <LottieView
        source={lottie.no_contacts}
        autoPlay
        loop
        style={styles.lottieStyle}
      />
      <Text style={styles.emptyDataStyle}>{strings.no_contact_found}</Text>
    </View>
  );

  const renderContactItem = ({item, index}) => {
    return (
      <StatusLabel
        source={images?.defaultUser}
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
  };

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
          leftSource={images?.search}
          removeOnPress={handleRemove}
          onChangeSearchText={handleSearch}
          searchStatus={searchFunctionality}
          rightSource={{uri: currentUserData?.userDpUri}}
          searchOnPress={() => setSearchFunctionality(true)}
        />
        <View style={styles.listConView}>
          <Text style={styles.contactLabelStyle}>{strings.my_Contact}</Text>
          {loading ? (
            <View style={styles.emptyDataViewStyle}>
              <ActivityIndicator size="large" color={colors.textColor} />
            </View>
          ) : (
            <FlatList
              bounces={false}
              data={filteredContacts}
              renderItem={renderContactItem}
              style={{marginBottom: hp(30)}}
              keyExtractor={item => item.recordID}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={EmptyListComponent}
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
  conListStyle: {
    padding: 10,
  },
  userImageStyles: {
    height: hp(36),
    width: hp(36),
  },
  lottieStyle: {
    width: hp(150),
    height: hp(150),
    tintColor: colors.textColor,
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
  emptyDataStyle: {
    fontSize: fontSize(20),
    fontFamily: 'Poppins-Bold',
    color: colors?.empty_data,
  },
  conTextStyle: {
    color: '#000E08',
    fontSize: fontSize(16),
    fontFamily: 'Poppins-Medium',
  },
  emptyDataViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

import {border} from '../../utils/dummy';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import {images, lottie} from '../../assets';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';
import StatusLabel from '../../components/StatusLabel';

const Message = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [searchFunctionality, setSearchFunctionality] = useState(false);

  const {navigate} = useNavigation();

  useEffect(() => {
    getData();
    getUserData();
  }, []);

  const getData = () => {
    firestore()
      .collection('users')
      .where('created', '<=', new Date())
      .orderBy('created', 'desc')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setData(users);
      });
  };

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

  const statusRenderItem = ({item, index}) => {
    const currentUser = auth().currentUser.uid == item.id;
    return (
      !currentUser && (
        <View style={{marginHorizontal: wp(8.5)}}>
          <View
            style={{
              ...styles.userStatusBorderStyle,
              borderColor: border[index % border.length],
            }}>
            <Image
              source={{uri: item.userDpUri}}
              style={styles.userImageStyle}
            />
          </View>
          <Text style={styles.statusUserName}>{item.name}</Text>
        </View>
      )
    );
  };

  const onUserPress = user => {
    navigate('ChatScreen', user);
  };

  const handleSearch = text => {
    setSearchText(text);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchResults(filteredData);
  };

  const handleRemove = () => {
    setSearchFunctionality(false);
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.buttonFirstColor, colors.buttonSecondColor]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.container]}>
          <HeaderCon
            label={strings.home}
            searchValue={searchText}
            leftSource={images.search}
            onChangeSearchText={handleSearch}
            searchStatus={searchFunctionality}
            rightSource={{uri: currentUserData.userDpUri}}
            searchOnPress={() => setSearchFunctionality(true)}
            removeOnPress={handleRemove}
            leftIcon
          />
        <View style={styles.statusListStyle}>
          <FlatList
            data={data}
            style={styles.statusListSubStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={statusRenderItem}
          />
        </View>
        <View style={styles.listConView}>
          <FlatList
            data={searchText ? searchResults : data}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListEmptyComponent={() => {
              return (
                <View style={styles.emptyDataViewStyle}>
                  <LottieView
                    source={lottie.no_user}
                    autoPlay
                    loop
                    style={styles.lottieStyle}
                  />
                  <Text style={styles.emptyDataStyle}>
                    {strings.no_user_found}
                  </Text>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              const currentUser = auth().currentUser.uid == item.id;
              return (
                <>
                  {!currentUser && (
                    <StatusLabel
                      onPress={() => onUserPress(item)}
                      PrimaryLabel={item?.name}
                      userStatusBorderStyle={{
                        borderColor: border[index % border.length],
                      }}
                      source={{uri: item.userDpUri}}
                      subLabel={'How are you today?'}
                    />
                  )}
                </>
              );
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieStyle: {
    height: hp(150),
    width: hp(150),
  },
  emptyDataViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDataStyle: {
    fontSize: fontSize(20),
    color: colors.buttonFirstColor,
    fontFamily: 'Poppins-Bold',
  },
  container: {
    flex: 1,
  },
  statusListSubStyle: {
    marginTop: hp(40),
    marginHorizontal: wp(12),
  },
  statusListStyle: {
    height: hp(150),
  },
  userImageStyle: {
    height: hp(52),
    width: hp(52),
  },
  listConView: {
    flex: 1,
    top: hp(10),
    paddingTop: hp(30),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.white,
  },
  statusUserName: {
    marginTop: hp(7),
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
  userStatusBorderStyle: {
    padding: hp(10),
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: wp(1.5),
    justifyContent: 'center',
    borderRadius: hp(80 / 2),
  },
});

export default Message;

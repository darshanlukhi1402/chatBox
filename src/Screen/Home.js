import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

import {images} from '../assets';
import {colors} from '../utils/colors';
import {strings} from '../utils/string';
import HeaderCon from '../components/HeaderCon';
import {border, userData} from '../utils/dummy';
import {fontSize, hp, wp} from '../utils/constant';
import StatusLabel from '../components/StatusLabel';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [data, setData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);

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
    // 1. Navigate to the Chat Screen
    navigate('ChatScreen', {
      userId: user.id,
      userName: user.name,
      userDpUri: user.userDpUri,
    });
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
          leftSource={images.search}
          rightSource={{uri: currentUserData.userDpUri}}
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
            data={data}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({item, index}) => {
              const currentUser = auth().currentUser.uid == item.id;
              return (
                <>
                  {!currentUser && (
                    <StatusLabel
                      onPress={onUserPress}
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
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: 'white',
    paddingTop: hp(30),
  },
  statusUserName: {
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    marginTop: hp(7),
    textAlign: 'center',
  },
  userStatusBorderStyle: {
    padding: hp(10),
    borderRadius: hp(80 / 2),
    borderWidth: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Home;

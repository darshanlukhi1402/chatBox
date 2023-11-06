import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import {fontSize, hp, wp} from '../utils/constant';
import {images} from '../assets';
import {strings} from '../utils/string';
import {border, userData} from '../utils/dummy';
import firestore from '@react-native-firebase/firestore';
import StatusLabel from '../components/StatusLabel';
import HeaderCon from '../components/HeaderCon';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firestore()
      .collection('users')
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

  const statusRenderItem = ({item, index}) => {
    return (
      <View style={{marginHorizontal: wp(8.5)}}>
        <View
          style={{
            ...styles.userStatusBorderStyle,
            borderColor: border[index % border.length],
          }}>
          <Image source={item?.userImage} style={styles.userImageStyle} />
        </View>
        <Text style={styles.statusUserName}>{item.name}</Text>
      </View>
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
          label={strings.home}
          leftSource={images.search}
          rightSource={images.my_user}
        />
        <View style={styles.statusListStyle}>
          <FlatList
            data={userData}
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
            renderItem={({item}) => {
              return (
                <StatusLabel
                  PrimaryLabel={item?.name}
                  subLabel={'How are you today?'}
                />
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
    paddingTop: hp(41),
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

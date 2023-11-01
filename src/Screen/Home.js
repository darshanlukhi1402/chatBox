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
        <SafeAreaView style={styles.searchIconStyle}>
          <View style={styles.imageSubView}>
            <Image source={images.search} style={styles.searchIconStyle} />
          </View>
          <Text style={styles.headerTitleStyle}>{strings.home}</Text>
          <Image source={images.my_user} style={styles.userIconStyle} />
        </SafeAreaView>
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
  conStatusStyles: {
    flexDirection: 'row',
    marginHorizontal: wp(24),
    marginBottom: hp(30),
    alignItems: 'center',
  },
  labelTextStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(18),
    marginLeft: wp(12),
  },
  subTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(14),
    marginLeft: wp(12),
    color: colors.subMessageText,
    justifyContent: 'space-between',
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
    overflow:'hidden'
  },
  searchIconStyle: {
    height: hp(22),
    width: hp(22),
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: fontSize(18),
    fontFamily: 'Poppins-Regular',
  },
  userIconStyle: {
    height: hp(32),
    width: hp(32),
  },
  searchIconStyle: {
    marginHorizontal: wp(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  imageSubView: {
    borderRadius: 40,
    height: hp(40),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.searchBackgroundColor,
  },
});

export default Home;

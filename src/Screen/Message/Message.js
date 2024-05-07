import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  AppState,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import InstaStory from 'react-native-insta-story';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

import {border} from '../../utils/dummy';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import {images, lottie} from '../../assets';
import {getUserData} from '../../utils/Global';
import PlusIcon from '../../components/PlusIcon';
import HeaderCon from '../../components/HeaderCon';
import {fontSize, hp, wp} from '../../utils/constant';
import StatusLabel from '../../components/StatusLabel';

const Message = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [searchFunctionality, setSearchFunctionality] = useState(false);
  // const [storyData, setStoryData] = useState([]);

  // const transformData = originalData => {
  //   return originalData.map((item, index) => {
  //     return {
  //       user_id: index + 1,
  //       user_image: item?.userDpUri,
  //       user_name: item?.name,
  //       stories: Array.from({length: 16}, (_, storyIndex) => ({
  //         story_id: index + 1,
  //         story_image: `https://picsum.photos/500/800?random=${Math.random()}`,
  //         swipeText: 'Custom swipe text for this story',
  //       })),
  //     };
  //   });
  // };

  const {navigate} = useNavigation();

  useEffect(() => {
    getData();
    fetchUserData();
    updateUserStatus(true);
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      // AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const getData = () => {
    setLoading(true);
    try {
      firestore()
        .collection('users')
        .where('created', '<=', new Date())
        .orderBy('created', 'desc')
        .onSnapshot(async querySnapshot => {
          const users = [];
          querySnapshot.forEach(documentSnapshot => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setData(users);
          setLoading(false);
          // const transformedData = await transformData(users);
          // setStoryData(transformedData);
        });
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const fetchUserData = async () => {
    const userId = auth().currentUser.uid;
    const userData = await getUserData(userId);
    setCurrentUserData(userData);
  };

  const updateUserStatus = online => {
    const userId = auth().currentUser.uid;
    const userRef = firestore().collection('users').doc(userId);
    userRef.update({online});
  };

  const handleAppStateChange = nextAppState => {
    const userId = auth().currentUser.uid;
    const userRef = firestore().collection('users').doc(userId);
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      userRef.update({
        online: false,
        lastOnlineTime: firestore.Timestamp.fromDate(new Date()),
      });
    } else if (nextAppState === 'active') {
      userRef.update({online: true});
    }
  };

  const statusRenderItem = ({item, index}) => {
    const currentUser = auth()?.currentUser?.uid == item?.id;
    return (
      !currentUser && (
        <View style={{marginHorizontal: wp(8.5)}}>
          <TouchableOpacity
            style={{
              ...styles.userStatusBorderStyle,
              borderColor: border[index % border.length],
            }}>
            <Image
              source={{uri: item.userDpUri}}
              style={styles.userImageStyle}
            />
          </TouchableOpacity>
          <Text style={styles.statusUserName}>{item?.firstName}</Text>
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

  const userProfilePress = item => {
    navigate('UserProfileDetails', item);
  };

  const RenderItemComponent = ({item, index}) => {
    const currentUser = auth()?.currentUser?.uid === item?.id;
    const isLastItem = index === data.length - 1;
    return (
      <>
        {!currentUser && (
          <StatusLabel
            downBorder
            statusOnOff
            isLastItem={isLastItem}
            statusSource={item?.online}
            source={{uri: item.userDpUri}}
            subLabel={'How are you today?'}
            onPress={() => onUserPress(item)}
            lastOffTime={item?.lastOnlineTime}
            userProfilePress={() => userProfilePress(item)}
            PrimaryLabel={`${item?.firstName} ${item?.lastName}`}
            userStatusBorderStyle={{
              borderColor: border[index % border.length],
            }}
          />
        )}
      </>
    );
  };

  const EmptyListComponent = () => (
    <View style={styles.emptyDataViewStyle}>
      <LottieView
        source={lottie.no_user}
        autoPlay
        loop
        style={styles.lottieStyle}
      />
      <Text style={styles.emptyDataStyle}>{strings.no_user_found}</Text>
    </View>
  );

  const renderListHeaderComponent = () => {
    return (
      <View style={{marginHorizontal: wp(8.5)}}>
        <TouchableOpacity
          style={{
            ...styles.userStatusBorderStyle,
            borderColor: colors.white,
            borderWidth: hp(1),
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: currentUserData.userDpUri}}
            style={styles.userImageStyle}
          />
        </TouchableOpacity>
        <PlusIcon plusIconPress={() => navigate('AddStatusScreen')} />
        <Text style={styles.statusUserName}>{strings?.my_status}</Text>
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
          leftIcon
          label={strings.home}
          searchValue={searchText}
          leftSource={images.search}
          removeOnPress={handleRemove}
          onChangeSearchText={handleSearch}
          searchStatus={searchFunctionality}
          rightSource={{uri: currentUserData.userDpUri}}
          searchOnPress={() => setSearchFunctionality(true)}
        />
        <View style={styles.statusListStyle}>
          {loading ? (
            <View style={{flex: 1}}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <FlatList
              horizontal
              data={data}
              renderItem={statusRenderItem}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={renderListHeaderComponent}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        <View style={styles.listConView}>
          {loading ? (
            <View style={styles.emptyDataViewStyle}>
              <ActivityIndicator size="large" color={colors.textColor} />
            </View>
          ) : (
            <FlatList
              bounces={false}
              renderItem={RenderItemComponent}
              style={styles.chatConBorderStyle}
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={EmptyListComponent}
              data={searchText ? searchResults : data}
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
  chatConBorderStyle: {
    marginBottom: hp(20),
  },
  userImageStyle: {
    width: hp(52),
    height: hp(52),
  },
  lottieStyle: {
    width: hp(150),
    height: hp(150),
  },
  statusListSubStyle: {
    marginHorizontal: wp(12),
  },
  emptyDataViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDataStyle: {
    fontSize: fontSize(20),
    fontFamily: 'Poppins-Bold',
    color: colors?.empty_data,
  },
  statusListStyle: {
    height: hp(140),
    paddingTop: hp(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  listConView: {
    flex: 1,
    top: hp(10),
    paddingTop: hp(30),
    borderTopEndRadius: wp(40),
    borderTopStartRadius: wp(40),
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

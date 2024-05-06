import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import moment from 'moment';
import Video from 'react-native-video';
import notifee from '@notifee/react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import ReactNativeModal from 'react-native-modal';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation, useRoute} from '@react-navigation/native';

import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import {images, lottie} from '../../assets';
import {dummyData} from '../../utils/Global';
import ChatHeader from '../../components/ChatHeader';
import {fontSize, hp, wp} from '../../utils/constant';
import ChatTextInput from '../../components/ChatTextInput';

const ChatScreen = () => {
  const userRef = useRef(null);
  const chatInputRef = useRef(null);
  const lastDisplayedDateRef = useRef(null);

  const user = useRoute().params;
  const {navigate, goBack} = useNavigation();

  const [chat, setChat] = useState([]);
  const [chatText, setChatText] = useState('');
  const [contentData, setContentData] = useState('');
  const [contentPdfData, setContentPdfData] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [dow_contentData, setDowContentData] = useState('');
  const [contentDataType, setContentDataType] = useState('');

  useEffect(() => {
    getMessagesData();
  }, [contentDataType]);

  const currentUserUid = auth().currentUser.uid;
  const chatId =
    currentUserUid > user.id
      ? `${currentUserUid} - ${user.id}`
      : `${user.id} - ${currentUserUid}`;

  const getMessagesData = () => {
    firestore()
      .collection('userChatMessages')
      .doc(chatId)
      .onSnapshot(documentSnapshot => {
        documentSnapshot.data() && setChat(documentSnapshot.data().chat);
      });
  };

  const onChatLongPress = () => {
    console.log('11111');
  };

  const callPress = () => {};

  const shareOnPress = () => {
    setModalVisible(true);
  };

  const displayNotification = async () => {
    const notification = await notifee.buildNotification({
      title: 'New Message',
      body: 'You have received a new message.',
    });
    await notifee.displayNotification(notification);
  };

  const contentOnPress = async name => {
    if (name == 'Media') {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images],
          copyTo: 'cachesDirectory',
        });
        setContentData(res);
        setContentDataType(res?.type);
        setModalVisible(!isModalVisible);
      } catch (error) {
        console.log(error);
      }
    }
    // else if (name == 'Documents') {
    //   try {
    //     const res = await DocumentPicker.pickSingle({
    //       type: [DocumentPicker.types.pdf],
    //       copyTo: 'cachesDirectory',
    //     });
    //     setContentDataType(res?.type);
    //     setModalVisible(!isModalVisible);
    //     setContentPdfData(res?.fileCopyUri);
    //   } catch (error) {
    //     console.log(err);
    //   }
    // }
  };

  const uploadContent = async () => {
    if (contentData.uri < 0) return Alert.alert('Enter the All Data');
    else {
      try {
        const response = storage().ref(`/UsersProfileIcon/`);
        const url = await response.getDownloadURL();
        setDowContentData(url);
        return url;
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const onSendMessagePress = async () => {
    setChatText('');
    Keyboard.dismiss();
    const content_data = await uploadContent();
    const obj = {
      isSeen: false,
      sentTo: user.id,
      sentBy: currentUserUid,
      // contentPdf: contentPdfData,
      contentType: contentDataType,
      Messages: chatText && chatText,
      content: contentData && content_data,
      createdAt: firestore.Timestamp.fromDate(new Date()),
    };
    try {
      if (chat.length > 0) {
        await firestore()
          .collection('userChatMessages')
          .doc(chatId)
          .update({chat: [...chat, obj]})
          .then(() => {
            setChatText('');
            setContentData('');
            setContentPdfData('');
            setContentDataType('');
          });
      } else {
        await firestore()
          .collection('userChatMessages')
          .doc(chatId)
          .set({chat: [obj]})
          .then(() => {
            setChatText('');
            setContentData('');
            setContentPdfData('');
            setContentDataType('');
          });
      }
      chatInputRef.current.blur();
      displayNotification();
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderChatItem = ({item, index}) => {
    const currentDate = new Date();
    const chatDate = new Date(item?.createdAt?.toDate());

    const formattedChatDate = moment(chatDate).format('ddd MMM DD YYYY');
    const formattedCurrentDate = moment(currentDate).format('ddd MMM DD YYYY');

    const isNewDate = lastDisplayedDateRef.current !== chatDate.toDateString();
    if (isNewDate) {
      lastDisplayedDateRef.current = chatDate.toDateString();
    }

    return (
      <TouchableOpacity
        disabled
        style={{margin: hp(12)}}
        onLongPress={() => onChatLongPress()}>
        {isNewDate && (
          <Text style={styles.currentDateStyle}>
            {formattedChatDate == formattedCurrentDate
              ? strings.today
              : moment(item.createdAt.toDate()).format('MMM D, YYYY')}
          </Text>
        )}
        {item?.content && item?.contentType == 'image/jpeg' && (
          <Image
            source={{uri: item?.content}}
            resizeMode="contain"
            style={
              currentUserUid == item?.sentBy
                ? styles.contentFledStyle
                : styles.contentFledStyle1
            }
          />
        )}
        {item?.content && item?.contentType == 'video/mp4' && (
          <Video
            source={{uri: item?.content}}
            resizeMode="contain"
            style={
              currentUserUid == item?.sentBy
                ? styles.contentFledStyle
                : styles.contentFledStyle1
            }
          />
        )}
        {item?.Messages && (
          <>
            <View
              style={[
                styles.chatTextStyle,
                currentUserUid == item?.sentBy
                  ? styles.rightChat
                  : styles.leftChat,
              ]}>
              <Text
                style={{
                  ...styles.regularChatStyle,
                  color:
                    currentUserUid == item?.sentBy
                      ? colors.white
                      : colors.backTintColor,
                }}>
                {item.Messages}
              </Text>
            </View>
            <Text
              style={[
                styles.dateShowStyle,
                currentUserUid == item?.sentBy
                  ? styles.rightDate
                  : styles.leftDate,
              ]}>
              {moment(item.createdAt.toDate()).format('hh:mm A')}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const renderDocItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.contentStyle}
        onPress={() => contentOnPress(item.name)}>
        <View style={styles.modalIconStyle}>
          <Image source={item?.icon} style={styles.removeIconStyle} />
        </View>
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.titleStringStyle}>{item?.name}</Text>
          {item.sub && <Text style={styles.subStringStyle}>{item.sub}</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  const EmptyListComponent = () => (
    <View style={styles.emptyDataViewStyle}>
      <LottieView
        source={lottie.no_chat}
        autoPlay
        loop
        style={styles.lottieStyle}
      />
      <Text style={styles.emptyDataStyle}>{strings.no_chat_found}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ChatHeader
        userName={user.name}
        leftIcon={images.back}
        callIcon={images.calll}
        callOnPress={callPress}
        userIcon={{uri: user.userDpUri}}
        videoCallIcon={images.videoCall}
        leftIconOnPress={() => goBack()}
        onlineStatus={
          user?.online == true
            ? strings.active_now
            : moment(user?.lastOnlineTime.toDate()).fromNow()
        }
      />
      <View style={styles.chatConView}>
        <FlatList
          data={chat}
          ref={userRef}
          bounces={false}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={EmptyListComponent}
          onLayout={() => userRef?.current?.scrollToEnd()}
          onContentSizeChange={() => userRef.current.scrollToEnd()}
        />
      </View>
      <ChatTextInput
        value={chatText}
        content={contentDataType}
        leftOnPress={shareOnPress}
        textInputRef={chatInputRef}
        sendOnPress={onSendMessagePress}
        onChangeText={text => setChatText(text)}
        placeholder={strings.write_your_message}
      />
      <ReactNativeModal
        backdropOpacity={0.8}
        animationInTiming={500}
        animationIn={'slideInUp'}
        style={styles.modalStyle}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <View style={styles.modelViewStyle}>
          <View style={styles.modelHeaderView}>
            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Image source={images.remove} style={styles.removeIconStyle} />
            </TouchableOpacity>
            <Text style={styles.shareContentStyle}>
              {strings.share_Content}
            </Text>
          </View>
          <FlatList data={dummyData} renderItem={renderDocItem} />
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  rightDate: {
    alignSelf: 'flex-end',
  },
  leftDate: {
    alignSelf: 'flex-start',
  },
  regularChatStyle: {
    fontFamily: 'Poppins-Regular',
  },
  removeIconStyle: {
    width: hp(24),
    height: hp(24),
  },
  lottieStyle: {
    width: hp(320),
    height: hp(320),
  },
  modelHeaderView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalStyle: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatConView: {
    flex: 1,
    backgroundColor: colors.chatBackgroundColor,
  },
  dateShowStyle: {
    marginTop: hp(4),
    fontSize: fontSize(10),
    fontFamily: 'Poppins-SemiBold',
  },
  emptyDataViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDataStyle: {
    bottom: hp(20),
    fontSize: fontSize(18),
    fontFamily: 'Poppins-Bold',
    color: colors?.empty_data,
  },
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(18),
  },
  titleStringStyle: {
    color: colors.black,
    fontSize: fontSize(13),
    fontFamily: 'Poppins-Bold',
  },
  subStringStyle: {
    fontSize: fontSize(11),
    fontFamily: 'Poppins-Regular',
  },
  contentFledStyle: {
    width: hp(160),
    height: hp(160),
    alignSelf: 'flex-end',
  },
  contentFledStyle1: {
    width: hp(160),
    height: hp(160),
    alignSelf: 'flex-start',
  },
  modalIconStyle: {
    width: wp(44),
    height: hp(44),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.modalBackGroundColor,
  },
  modelViewStyle: {
    paddingTop: hp(28),
    paddingLeft: wp(24),
    borderTopRightRadius: hp(30),
    borderTopLeftRadius: hp(30),
    backgroundColor: colors.white,
  },
  shareContentStyle: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    marginRight: wp(44),
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: 'Poppins-Medium',
  },
  currentDateStyle: {
    alignSelf: 'center',
    marginVertical: hp(10),
    fontFamily: 'Poppins-Bold',
  },
  chatTextStyle: {
    padding: hp(12),
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  leftChat: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
  },
  rightChat: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    backgroundColor: colors.textColor,
  },
});

export default ChatScreen;

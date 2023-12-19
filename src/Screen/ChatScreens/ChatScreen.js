import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import moment from 'moment';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';
import ReactNativeModal from 'react-native-modal';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation, useRoute} from '@react-navigation/native';

import {images} from '../../assets';
import {colors} from '../../utils/themes';
import {strings} from '../../utils/string';
import ChatHeader from '../../components/ChatHeader';
import {fontSize, hp, wp} from '../../utils/constant';
import ChatTextInput from '../../components/ChatTextInput';

const ChatScreen = () => {
  const userRef = useRef(null);
  const lastDisplayedDateRef = useRef(null);

  const user = useRoute().params;
  const {navigate, goBack} = useNavigation();

  const [chat, setChat] = useState([]);
  const [chatText, setChatText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [contentData, setContentData] = useState('');
  const [contentPdfData, setContentPdfData] = useState('');
  const [contentDataType, setContentDataType] = useState('');
  const [dow_contentData, setDowContentData] = useState('');

  const dummyData = [
    {name: 'Camera', icon: images.camera},
    {name: 'Documents', sub: 'Share your files', icon: images.doc},
    {name: 'Media', sub: 'Share photos and videos', icon: images.media},
    {name: 'Location', sub: 'Share your location', icon: images.pin},
  ];

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

  const contentOnPress = async name => {
    if (name == 'Media') {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.video, DocumentPicker.types.images],
          copyTo: 'cachesDirectory',
        });
        console.log('res', res);
        setContentData(res);
        setContentDataType(res?.type);
        setModalVisible(!isModalVisible);
      } catch (error) {
        console.log(err);
      }
    } else if (name == 'Documents') {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.pdf],
          copyTo: 'cachesDirectory',
        });
        setContentDataType(res?.type);
        setModalVisible(!isModalVisible);
        setContentPdfData(res?.fileCopyUri);
      } catch (error) {
        console.log(err);
      }
    }
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
    const content_data = await uploadContent();
    const obj = {
      isSeen: false,
      sentTo: user.id,
      sentBy: currentUserUid,
      contentPdf: contentPdfData,
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
          });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <ChatHeader
        userName={user.name}
        leftIcon={images.back}
        callIcon={images.calll}
        callOnPress={callPress}
        userIcon={{uri: user.userDpUri}}
        videoCallIcon={images.videoCall}
        onlineStatus={strings.active_now}
        leftIconOnPress={() => goBack()}
      />
      <View style={styles.chatConView}>
        <FlatList
          data={chat}
          ref={userRef}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({item, index}) => {
            const currentDate = new Date();
            const chatDate = new Date(item?.createdAt?.toDate());

            const formattedChatDate =
              moment(chatDate).format('ddd MMM DD YYYY');
            const formattedCurrentDate =
              moment(currentDate).format('ddd MMM DD YYYY');

            const isNewDate =
              lastDisplayedDateRef.current !== chatDate.toDateString();
            if (isNewDate) {
              lastDisplayedDateRef.current = chatDate.toDateString();
            }

            return (
              <TouchableOpacity
                style={{margin: hp(12)}}
                disabled
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
          }}
          onLayout={() => userRef?.current?.scrollToEnd()}
          onContentSizeChange={() => userRef.current.scrollToEnd()}
        />
      </View>
      <ChatTextInput
        placeholder={strings.write_your_message}
        onChangeText={text => setChatText(text)}
        sendOnPress={onSendMessagePress}
        value={chatText}
        leftOnPress={shareOnPress}
        content={contentDataType}
      />
      <ReactNativeModal
        animationIn={'slideInUp'}
        animationInTiming={500}
        isVisible={isModalVisible}
        backdropOpacity={0.8}
        style={styles.modalStyle}
        onBackdropPress={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.modelViewStyle}>
          <View style={styles.modelHeaderView}>
            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Image source={images.remove} style={styles.removeIconStyle} />
            </TouchableOpacity>
            <Text style={styles.shareContentStyle}>
              {strings.share_Content}
            </Text>
          </View>
          <FlatList
            data={dummyData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.contentStyle}
                  onPress={() => contentOnPress(item.name)}>
                  <View style={styles.modalIconStyle}>
                    <Image source={item?.icon} style={styles.removeIconStyle} />
                  </View>
                  <View style={{marginLeft: wp(12)}}>
                    <Text style={styles.titleStringStyle}>{item?.name}</Text>
                    {item.sub && (
                      <Text style={styles.subStringStyle}>{item.sub}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    marginVertical: hp(18),
    alignItems: 'center',
  },
  titleStringStyle: {
    fontFamily: 'Poppins-Bold',
    color: colors.black,
    fontSize: fontSize(13),
  },
  subStringStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize(11),
  },
  modalIconStyle: {
    height: hp(44),
    width: wp(44),
    backgroundColor: colors.modalBackGroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(100),
  },
  modelViewStyle: {
    backgroundColor: colors.white,
    paddingTop: hp(28),
    paddingLeft: wp(24),
    borderTopRightRadius: hp(30),
    borderTopLeftRadius: hp(30),
  },
  modelHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeIconStyle: {
    height: hp(24),
    width: hp(24),
  },
  shareContentStyle: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize(16),
    alignSelf: 'center',
    textAlign: 'center',
    marginRight: wp(44),
    color: colors.black,
  },
  currentDateStyle: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    marginVertical: hp(10),
  },
  chatTextStyle: {
    padding: hp(12),
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatConView: {
    flex: 1,
    backgroundColor: colors.chatBackgroundColor,
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
  regularChatStyle: {
    fontFamily: 'Poppins-Regular',
  },
  leftDate: {
    alignSelf: 'flex-start',
  },
  rightDate: {
    alignSelf: 'flex-end',
  },
  dateShowStyle: {
    marginTop: hp(4),
    fontFamily: 'Poppins-SemiBold',
    fontSize: fontSize(10),
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFledStyle: {
    height: hp(160),
    width: hp(160),
    alignSelf: 'flex-end',
  },
  contentFledStyle1: {
    height: hp(160),
    width: hp(160),
    alignSelf: 'flex-start',
  },
});

export default ChatScreen;

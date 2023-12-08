import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

  useEffect(() => {
    getMessagesData();
  }, []);

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

  const onSendMessagePress = async () => {
    const obj = {
      isSeen: false,
      sentTo: user.id,
      Messages: chatText,
      sentBy: currentUserUid,
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
          });
      } else {
        await firestore()
          .collection('userChatMessages')
          .doc(chatId)
          .set({chat: [obj]})
          .then(() => {
            setChatText('');
          });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const callPress = () => {};

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
              <View style={{margin: hp(12)}}>
                {isNewDate && (
                  <Text style={styles.currentDateStyle}>
                    {formattedChatDate == formattedCurrentDate
                      ? strings.today
                      : moment(item.createdAt.toDate()).format('MMM D, YYYY')}
                  </Text>
                )}
                {/* {isNewDate && (
                  <View style={{flexDirection: 'row', marginBottom: hp(5)}}>
                    <Image
                      source={{uri: user.userDpUri}}
                      style={{height: hp(20), width: wp(20)}}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        marginLeft: wp(5),
                        fontSize: fontSize(14),
                      }}>
                      {user.name}
                    </Text>
                  </View>
                )} */}
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
                  {moment(item.createdAt.toDate()).format('hh:mm')}
                </Text>
              </View>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: hp(1),
  },
});

export default ChatScreen;

import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';

import {images} from '../../assets';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/string';
import ChatHeader from '../../components/ChatHeader';
import {fontSize, hp, wp} from '../../utils/constant';
import ChatTextInput from '../../components/ChatTextInput';

const ChatScreen = () => {
  const userRef = useRef(null);
  const user = useRoute().params;
  const {navigate, goBack} = useNavigation();

  const [chat, setChat] = useState([]);
  const [chatText, setChatText] = useState('');

  useEffect(() => {
    getMessagesData();
  }, []);

  const currentUserUid = auth().currentUser.uid;
  const chatId = currentUserUid > user.id ? `${currentUserUid} - ${user.id}` : `${user.id} - ${currentUserUid}`;

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

  const callPress = () => navigate('VideoCall');

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
            return (
              <View style={{margin: hp(12)}}>
                <View style={[styles.chatTextStyle, currentUserUid == item?.sentBy ? styles.rightChat : styles.leftChat]}>
                  <Text style={{color:currentUserUid == item?.sentBy? colors.white: colors.backTintColor}}>
                    {item.Messages}
                  </Text>
                </View>
                <Text style={{ alignSelf: currentUserUid == item?.sentBy ? 'flex-end' : 'flex-start', marginTop: hp(1)}}>
                  {moment(item.createdAt.toDate()).format('hh:mm')}
                </Text>
              </View>
            );
          }}
          onLayout={() => userRef?.current?.scrollToEnd()}
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
});

export default ChatScreen;

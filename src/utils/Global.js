import firestore from '@react-native-firebase/firestore';
import notifee, {AndroidImportance} from '@notifee/react-native';

import {images} from '../assets';

export const getUserData = async userId => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const getMessagesData = chatId => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('userChatMessages')
      .doc(chatId)
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists) {
            resolve(documentSnapshot.data().chat);
          } else {
            reject(new Error('Document does not exist'));
          }
        },
        error => {
          reject(error);
        },
      );
  });
};

export const settingData = [
  {
    label: 'Account',
    sabLabel: 'Privacy, security, change number',
    icon: images.account,
  },
  {
    label: 'Chat',
    sabLabel: 'Chat history, theme, wallpapers',
    icon: images.chat,
  },
  {
    label: 'Notifications',
    sabLabel: 'Messages, group and others',
    icon: images.notifications,
  },
  {
    label: 'Storage and data',
    sabLabel: 'Network usage, storage usage',
    icon: images.storage,
  },
  {
    label: 'Help',
    sabLabel: 'Messages, group and others',
    icon: images.help,
  },
  {
    label: 'Invite a friend',
    icon: images.friend,
  },
];

export const dummyData = [
  {name: 'Camera', icon: images.camera},
  {name: 'Documents', sub: 'Share your files', icon: images.doc},
  {name: 'Media', sub: 'Share photos and videos', icon: images.media},
  {name: 'Location', sub: 'Share your location', icon: images.pin},
];

export const DisplayNotification = async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'important',
    name: 'Important Notifications',
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    title: remoteMessage?.data?.title,
    body: remoteMessage?.data?.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
    },
  });
};

export const server_key =
  'AAAAGQzVeDU:APA91bFaGarR5HiCqumm_YtGkWuegtmIra4SvUFd31crvoY9gf_3tpP8RiS8SJ0YliB3OlpV-d-7xCn7obZwbaRn88x7tsp3we4_CrRbOkdzAbEVijcihDYSqF4oRgjYrXt3wdxrs5A_';

export const defaultUserUrl =
  'https://firebasestorage.googleapis.com/v0/b/chatbox-f5584.appspot.com/o/UsersProfileIcon%2FdefaultUser.png?alt=media&token=12ddff8b-696a-467a-8edb-ff5b99698669';

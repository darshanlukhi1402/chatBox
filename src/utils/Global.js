import firestore from '@react-native-firebase/firestore';
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

export const getMessagesData = (chatId) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('userChatMessages')
      .doc(chatId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          resolve(documentSnapshot.data().chat);
        } else {
          reject(new Error('Document does not exist'));
        }
      }, error => {
        reject(error);
      });
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
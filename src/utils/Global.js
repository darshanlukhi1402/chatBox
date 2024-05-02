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
    label: 'Help',
    sabLabel: 'Messages, group and others',
    icon: images.help,
  },
  {
    label: 'Storage and data',
    sabLabel: 'Network usage, storage usage',
    icon: images.storage,
  },
];

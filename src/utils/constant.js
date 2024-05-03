import {Platform} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const isIos = Platform.OS === 'ios';

export const statusBarHeight = getStatusBarHeight();

export const fontSize = val => RFValue(val, 812);

export const wp = val => widthPercentageToDP((val * 100) / 375);

export const hp = val => heightPercentageToDP((val * 100) / 812);

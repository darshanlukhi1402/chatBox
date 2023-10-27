import {Platform} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {RFValue} from 'react-native-responsive-fontsize';

export const wp = (val) => widthPercentageToDP(val * 100 / 375);

export const hp = (val) => heightPercentageToDP(val * 100 / 812);

export const statusBarHeight = getStatusBarHeight();

export const isIos = Platform.OS === 'ios';

export const fontSize = (val) => RFValue(val, 812);

import {Platform} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {RFValue} from 'react-native-responsive-fontsize';

export const wp = () => widthPercentageToDP(val);

export const hp = () => heightPercentageToDP(val);

export const statusBarHeight = getStatusBarHeight();

export const isIos = Platform.OS === 'ios';

export const fontSize = () => RFValue(val, 812);

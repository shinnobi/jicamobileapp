/**
 * Created by KhanhNQ on 20/12/2016.
 *
 * @format
 */

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const minTabletWidth = 581;
const isIphoneX =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height >= 812 || width >= 812);
const isTablet = Platform.isPad || (width >= minTabletWidth && height >= minTabletWidth);

const Device = {
  isIphoneX,
  isTablet,
  minTabletWidth,
  Window: {
    width,
    height: Platform.OS !== 'ios' ? height : height - 20,
  },
};

export default Device;

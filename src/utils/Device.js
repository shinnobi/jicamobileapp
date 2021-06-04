
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const minTableWidth = 581;
const isIphoneX = 
    Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height >= 812 || width >= 812) ;
const isTablet = Platform.isPad || (width >= minTableWidth && height >= minTableWidth)

const Device = {
    isIphoneX,
    isTablet,
    minTableWidth,
    Window :{
        width,
        height: Platform.OS !== "ios" ? height : height - 20
    },
};

export default Device;
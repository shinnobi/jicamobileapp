import { Platform } from 'react-native';

// import Constants from './utils/Constants';
import Device from './utils/Device';

const _headerHeight = Device.isTablet
    ? 56
    : Platform.OS === 'ios'
    ? Device.isIphoneX
        ? 5
        : 40
    : 52;
const _toolbarHeight = Platform.OS === 'ios' ? (Device.isIphoneX ? 55 :5) : 5;

const _colorSet = {
    background: 'white',
    activeColor: '#000000',
    alternativeColor: '#4CD964',
    inActiveColor: '#828282',
  
    kttvPrimary: '#2875bd',
    kttvSecondary: '#6abe35',
    // analyticsColor: '#5f65fc',
    // tasksColor: '#6fb168',
  
    black: '#000000',
    textWhite: '#ffffff',
    white: '#ffffff',
    red: 'red',
    blue: '#007AFF',
    organge: '#FF5055',
    lightGrey: '#828282',
    darkGrey: '#616161',
    border: '#D1D1D6',
    // common
    Text: '#333',
    Header: '#000',
    subtextColor: '#464646',
  
    sectionBackground: '#fff',
    sectionSeparatorColor: '#D8D8D8',
    sectionSeparatorColorOpacity: 'rgba(216, 216, 216, 0.25)', // '#D8D8D8',
  
    sky: {
      blue: '#3eb0f7',
      lightBlue: '#87cefa',
      lightNight: '#2B2F77',
      night: '#141852',
      darkNight: '#070B34',
      rainy: '#736a86',
      rainyNight: '#7C3F94',
    },
  };
  
  const _fontSizeSet = {
    xxxlarge: 24,
    xxlarge: 22,
    xlarge: 20,
    large: 18,
    subLarge: 17,
    middle: 16,
    subMiddle: 15,
    normal: 14,
    subNormal: 13,
    small: 12,
    xsmall: 11,
  };

if (Device.isTablet){
    Object.keys(_fontSizeSet).forEach(sizeKey => {
        _fontSizeSet[sizeKey] =
            _fontSizeSet[sizeKey] <= 18 ? _fontSizeSet[sizeKey] + 2 : _fontSizeSet[sizeKey] + 4;
    });
}  

const _styleSet = {
    app: {
      flexGrow: 1,
    },
  
    headerBar: {
      marginTop: _toolbarHeight,
      backgroundColor: _colorSet.background,
      zIndex: 1,
      // paddingLeft: 15,
      // paddingRight: 15,
      paddingTop: 4,
      borderBottomWidth: 1,
      borderBottomColor: 'transparent',
      height: _headerHeight,
  
      ...Platform.select({
        ios: {
          // height: Device.isIphoneX ? 5 : 40,
        },
        android: {
          // height: 52,
          paddingTop: 6,
          marginTop: 0,
          elevation: 0,
        },
      }),
    },
  
    headerStyle: {
      color: _colorSet.mainTextColor,
      fontSize: _fontSizeSet.subLarge,
      fontWeight: '600',
      lineHeight: 25,
      alignSelf: 'center',
      // textAlign: 'left',
      // flex: 1,
      height: 40,
      backgroundColor: 'transparent',
      marginLeft: 5,
  
      // fontFamily: Constants.fontFamily,
      ...Platform.select({
        ios: {
          marginTop: Device.isIphoneX ? -18 : 10,
          marginBottom: 0,
        },
        android: {
          marginTop: 14,
          marginBottom: 0,
        },
      }),
    },
    headerTitleStyle: {
      // color: _colorSet.mainTextColor,
      fontSize: _fontSizeSet.middle,
      height: 40,
      textAlign: 'center',
      // fontFamily: Constants.fontFamily,
      alignSelf: 'center',
      ...Platform.select({
        ios: {
          marginBottom: 0,
          marginTop: Device.isIphoneX ? -10 : 12,
        },
        android: {
          marginTop: 25,
        },
      }),
    },
  
    transparentNavContainter: {
      height: _headerHeight + _toolbarHeight + 20,
    },
    transparentStatusBar: {
      height: _toolbarHeight,
      backgroundColor: 'transparent',
    },
    transparentNavBar: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 25,
      height: _headerHeight,
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
    },
    transparentHeaderTitle: {
      fontSize: _fontSizeSet.middle,
      fontWeight: '600',
      color: _colorSet.textWhite,
    },
    transparentContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      // paddingTop: (Device.Window.height * 6) / 100,
      // paddingHorizontal: 10,
    },
  
    menuButton: {
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    columnCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    ColumnCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    ColumnCenterTop: {
      alignItems: 'center',
    },
    ColumnCenterBottom: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    ColumnCenterLeft: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    ColumnCenterRight: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    navRow: {
        flexDirection: 'row',
        top: 0,

        ...Platform.select({
            ios: {
                top: Device.isIphoneX ? -20 : 0,
            },
            android: {
               top: 0, 
            },
        }),        
    },
    navIconContainer: {
        ...Platform.select({
            ios: {
                top: Device.isIphoneX ? -30 : 0,
            },
            android: {
              top: 0,  
            },
        }),
    },

  // Modal
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 10,
    top: (Device.Window.height * 7) / 100,
    // height: (Device.Window.height * 83) / 100,
    width: (Device.Window.width * 94) / 100,
    marginLeft: (Device.Window.width * 3) / 100,
    // paddingHorizontal: 15,
    backgroundColor: _colorSet.background,
    // backgroundColor: 'rgba(51, 51, 51, 0.75)',
    zIndex: 10,
    // right: null,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },

  modalContainer: {
    paddingVertical: 25,
    maxHeight: '100%',
  },

  modalInfo: {
    paddingHorizontal: 25,
    maxWidth: 600,
  },
};

const _fontSet = {
    regular: 'OpenSans-Regular',
    bold: 'OpenSans-Bold',
};

export const colorSet = _colorSet;
export const styleSet = _styleSet;
export const fontSet = _fontSet;
export const fontSizeSet = _fontSizeSet;
export const headerHeight = _toolbarHeight + _headerHeight;

export const convertHex = (hexColor, opacity) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    return result;
};
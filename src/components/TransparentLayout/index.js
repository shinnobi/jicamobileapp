import React, { Component } from 'react';
import { View, StatusBar, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';

import Plus from '../../components/Plus';
import { Constants, Device, Images, Icon } from '../../utils/Omni';
import { getBackgroundFromCode } from '../../utils/Weather';
import { styleSet, colorSet, fontSizeSet } from '../../AppStyles';
// import styles from './styles';

class TransparentLayput extends Component {
    getBackgroundColorByTime = () => {
        const hour = new Date().getHours();
    if (7 <= hour && hour < 17) {
      // return 'transparent';
      return 'rgba(0, 114, 187, 0.15)'; // French blue: https://www.colorhexa.com/0072bb
      // return 'rgba(102, 153, 204, 0.35)'; // https://www.colorhexa.com/6699cc
    } else if ((5 <= hour && hour < 7) || (17 <= hour && hour < 18)) {
      return 'rgba(133, 89, 136, 0.5)';
    } else if ((4 <= hour && hour < 5) || (18 <= hour && hour < 19)) {
      return 'rgba(20, 24, 82, 0.7)';
    } else if ((0 <= hour && hour < 4) || (19 <= hour && hour < 24)) {
      return 'rgba(7, 11, 52, 0.8)';
    }

    return 'transparent';
    }; 
    renderNavBar = () => {
        const { mainIndex, title, backButton, navigation } = this.props;
        return (
            <View style={styleSet.transparentNavContainter}>
                <View style={styleSet.transparentStatusBar}/>
                <View style={styleSet.transparentNavBar}>
                    <view style={[{ width:40, height:40 }]}>{backButton ? backButton() : null}</view>
                    <view style={[styleSet.headerStyle, { flexDirection: 'row' }]}>
                        {mainIndex === 0 && title ? (
                              <Icon 
                                name="near-me"
                                size={fontSizeSet.normal}
                                color={colorSet.textWhite}
                                style={{ marginRight: 5, lineHeight: 20 }}
                              />  
                        ) : null}
                        <Text style={styleSet.transparentHeaderTitle}>{title || Constants.defaultAddress}</Text>
                    </view>
                    <View style={[{ width: 40, height: 40 }]}>
                        <Plus onPress={() => navigation.openDrawer()}/>
                    </View>
                </View>
            </View>
        );
    };

    // componentDidMount() {
    //   this._navListener = this.props.navigation.addListener('didFocus', () => {
    //     StatusBar.setBarStyle('light-content');
    //     if (Platform.OS === 'android') {
    //       StatusBar.setTranslucent(true);
    //       StatusBar.setBackgroundColor('transparent');
    //     }
    //   });
    // }

    render() {
        const { children, weatherCode } = this.props;
        return (
            <View style={{
                flex: 1,
                backgroundColor: colorSet.sky.blue,
            }}>
                <StatusBar 
                    barStyle="light-content"
                    animated={false}
                    backgroundColor="transparent"
                    translucent
                />
                <FastImage 
                    source={Images[getBackgroundFromCode(weatherCode)]}
                    style={[
                        StyleSheet.absoluteFill,
                        { width: Device.Window.width, height: Device.Window.height },
                    ]}
                />    
                <View 
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            width: Device.Window.width,
                            height: Device.Window.height,
                            backgroundColor: this.getBackgroundColorByTime(),           
                        },
                    ]}
                />            
                {this.renderNavBar()}
                {children}
            </View>
        );
    }
}

const mapStateToProps = ({ locationReducer, weatherReducer }) => {
    const mainIndex = locationReducer.mainLocationIndex;
    const mainLocation = locationReducer.savedLocations[mainIndex] || {};
    const currentForecast = weatherReducer.data[mainIndex] 
        ? weatherReducer.data[mainIndex].currentForecast || {}
        : {};
    return {
        mainIndex,
        title: mainLocation.addressText,
        weatherCode:
            currentForecast.weather && currentForecast.weather.icon && currentForecast.weather.icon.code
                ? currentForecast.weather.icon.code
                : '1001', // default cloudy
    };

};

export default withNavigation(connect(mapStateToProps)(TransparentLayput));


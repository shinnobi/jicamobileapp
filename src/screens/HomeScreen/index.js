import React from 'react';
import { ScrollView, Platform, Linking, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { actions as appActions } from '../../redux/AppRedux';
import { actions as locationActions } from '../../redux/LocationRedux';
import { actions as weatherActions, checkIsFetching } from '../../redux/WeatherRedux';
import { Languages, Constants, toast } from '../../utils/Omni';
// import { styleSet, colorSet } from '../../AppStyles';
import TransparentLayout from '../../components/TransparentLayout';
import CurrentCard from '../../components/CurentCard';
import ForecastHorizontalList from '../../components/ForecastHorizontalList';
import ConfirmModel from '../../components/ConfirmModal';
// import Spinner from '../../components/Spinner';
import { styleSet, colorSet } from '../../AppStyles';
// import styles from './styles';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null,
    });

    constructor(props){
        supper(props);

        this.state = {
            hasNewVersion: false,
            isConfirmModalOpen: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { currentForecast, conciseForecast, dailyForecast } = nextProps;
        const isFetching = 
            checkIsFetching(currentForecast) ||
            checkIsFetching(conciseForecast) ||
            checkIsFetching(dailyForecast);
        if (!isFetching && Date.now() - nextProps.lastGetTime > Constants.interval) {
            nextProps.getWeatherData();        
        }

        if (nextProps.hasNewVersion !== prevState.hasNewVersion){
            return { hasNewVersion: nextProps.hasNewVersion, isConfirmModalOpen: true };
        }

        return null;
    }

    onRefresh = () => {
        this.props.getWeatherData(true);
    };

    componentDidMount(){
        this.props.checkNewAppVersion();
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.props.getWeatherData();
        });
    }

    closeConfirmModal = () => {
        this.setState({ isConfirmModalOpen: false });
    };

    goToStore = () =>{
        const APP_STORE_LINK = `itms-apps://itunes.apple.com/app/apple-store/id${Constants.appStoreId}?mt=8`;
        const PLAY_STORE_LINK = `market://details?id=${Constants.bundleId}`;
        const storeLink = Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK;

        this.closeConfirmModal();
        Linking.openURL(storeLink).catch(() => {
            toast('Có lỗi khi cập nhật');
        });
    };

    renderConfirmModal = () => {
        return (
            <ConfirmModel
                isModalVisible={this.setState.isConfirmModalOpen}
                messageText={'Đã có phiên bản mới, hãy cập nhật!'}
                closeModal={this.closeConfirmModal}
                onPressYes={this.goToStore}
                yesText={Languages.UpdateApp}
                cancelText={Languages.Later}
                style={{ height: 151 }}
            />
        );
    };

    viewDetail = startTime => {
        this.props.navigation.navigate('DetailScreen', { startTime });
    };

    viewExtended = tabKey => {
        this.props.navigation.navigate('ExtendedScreen', { tabKey });
    }

    render () {
        const {
            currentForecast,
            conciseForecast,
            dailyForecast,
            currentWeather,
            conciseWeather,
            dailyWeather,
        } = this.props;
        const isFetching =
            checkIsFetching(currentForecast) ||
            checkIsFetching(conciseForecast) ||
            checkIsFetching(dailyForecast);

        return (
            <React.Fragment>
                <TransparentLayout>
                    <ScrollView 
                        contentContainerStyle={{
                            justifyContent: 'Center',
                        }}
                        style={styleSet.transparentContainer}
                        refreshControl={
                            <RefreshControl 
                                refreshing={isFetching}
                                onRefresh={this.onRefresh}
                                tintColor={colorSet.textWhite}
                            />
                        }
                    >
                    <CurrentCard detail={currentWeather} onRetry={this.onRefresh} isLoading={isFetching} />
                    <ForecastHorizontalList
                        forecastList={conciseForecast}
                        label={Languages.Detail}
                        mode="detail"
                        onViewDetail={this.viewDetail}
                        onViewMore={ () => this.viewExtended('daily') }
                    />
                    </ScrollView>
                </TransparentLayout>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ netInfo, app, locationReducer, weatherReducer }) => {
    const mainIndex = locationReducer.mainIndex;
    const { currentForecast = {}, conciseForecast = {}, dailyForecast = {} } = weatherReducer.data[mainIndex] || {};

    return {
        netInfo,
        hasNewVersion : app.hasNewVersion,
        // add here so that the gds function will run when location changed.
        mainLocation: locationReducer.savedLocations[mainIndex],
        mainIndex,
        currentForecast,
        conciseForecast,
        dailyForecast, 
        lastGetTime: Math.max(
            currentForecast.lastGetTime,
            conciseForecast.lastGetTime,
            dailyForecast.lastGetTime
        ),
        currentForecast: currentForecast.weather,
        conciseForecast: conciseForecast.weather,
        dailyWeather: dailyForecast.weather,
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const {
        netInfo: { isConnected },
        mainIndex,
        mainLocation,
    } = stateProps;
    const { dispatch } = dispatchProps;

    return {
        ...ownProps,
        ...stateProps,
        checkNewAppVersion: () => {
            if (isConnected){
                dispatch(appActions.checkNewAppVersion());
            }
        },
        getWeatherData: (force = false) => {
            if (isConnected){
                dispatch(weatherActions.getAllWeatherData(-1, force));

                // geolocation
                if (mainIndex === 0){
                    if (mainLocation.latitude && mainLocation.longitude) {
                        if (!mainLocation.addressText) {
                            dispatch(locationActions.getGeolocationAddress(mainLocation));                            
                        }
                    } else {
                        dispatch(locationActions.rewatchGeolocation());
                    }
                }
            }

        },
    };
};

export default connect(
    mapStateToProps,
    undefined,
    mergeProps
)(HomeScreen);


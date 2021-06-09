import React from 'react';
import {View, Text, Platform, PermissionsAndroid} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';

import {actions as netInfoActions} from './redux/NetInfoRedux';
import {actions as locationActions} from './redux/LocationRedux';

import MyToast from './components/MyToast';
import AppNavigation from './AppNavigation';

import {toast} from './utils/Omni';
import {styleSet, colorSet} from './AppStyles';

class Router extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      // watchingLocation: false,
      requestLocationPermission: this.requestLocationPermission,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (!prevState.initialized) {
      nextProps.renewConnectionStatus();
      nextProps.subscribeToConnectionStatus();

      prevState.requestLocationPermission();

      newState.initialized = true;
    }

    return Object.keys(newState).length ? newState : null;
  }

  // componentWillMount() {
  //   const { updateConnectionStatus } = this.props;

  //   NetInfo.getConnectionInfo().then(connectionInfo => {
  //     updateConnectionStatus(connectionInfo.type !== 'none');
  //     this.setState({ loading: false });
  //   });

  //   if (Platform.OS === 'android') {
  //     this.requestLocationPermission();
  //   }
  // }

  async componentDidMount() {}

  componentWillUnmount() {}

  requestLocationPermission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (!granted) {
            return PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Chia sẻ vị trí của bạn',
                message:
                  'Chúng tôi cần biết vị trí của bạn để đưa ra dự báo thời tiết chính xác.',
                buttonNeutral: 'Để sau',
                buttonNegative: 'Không',
                buttonPositive: 'Cho phép',
              },
            ).then(granted => {
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.props.hasGeolocationPermission(true);
                this.props.watchGeolocation();
              } else {
                this.props.hasGeolocationPermission(false);
              }
            });
          }

          this.props.hasGeolocationPermission(true);
          this.props.watchGeolocation();
          return Promise.resolve();
        })
        .catch(() => {});
    } else {
      this.props.watchGeolocation();
    }
  };

  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast('Hiện không thể xem màn hình này');
    }
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  };

  render() {
    if (this.state.loading) {
      return <View />;
    }

    return (
      <View style={[styleSet.app, {backgroundColor: colorSet.white}]}>
        <MyToast />
        {/* <Text>jica</Text> */}
        <AppNavigation ref={comp => (this.navigator = comp)} />
      </View>
    );
  }
}

const mapStateToProps = ({netInfo}) => ({
  isConnected: netInfo.isConnected,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // const { isConnected } = stateProps;
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    renewConnectionStatus: () => netInfoActions.renewConnectionStatus(dispatch),
    subscribeToConnectionStatus: () =>
      dispatch(netInfoActions.subscribeToConnectionStatus()),
    watchGeolocation: () => {
      dispatch(locationActions.watchGeolocation());
    },
    hasGeolocationPermission: permission => {
      dispatch(locationActions.hasGeolocationPermission(permission));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Router);

/* eslint-disable */

import * as React from 'react';
import { connect } from 'react-redux';
import { View, Platform, PermissionsAndroid } from 'react-native';
import { styleSet, colorSet } from './AppStyles';
import AppNavigation from './AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { actions as netInfoActions } from './redux/NetInfoRedux';

class Router extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {          
          loading: true,
          initialized: false,
        };
      }

    static getDerivedStateFromProps(nextProps, prevState) {
      const newState = {};
      if (!prevState.initialized){
        nextProps.renewConnectionStatus();
        nextProps.subscribeToConnectionStatus();

        newState.initialized = true;
      }            
      return Object.keys(newState).length ? newState : null;
    }

      render() {               
        return (
          // <View style={[styleSet.app, { backgroundColor: colorSet.white }]}>           
          //   <AppNavigation ref={comp => (this.navigator = comp)} />
          // </View>
          <NavigationContainer>
            <AppNavigation/>
          </NavigationContainer>
        );
      }
}

const mapStateToProps = ({ netInfo }) => ({
  isConnected: netInfo.isConnected,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    renewConnectionStatus: () => netInfoActions.renewConnectionStatus(dispatch),
    subscribeToConnectionStatus: () => dispatch(netInfoActions.subscribeToConnectionStatus()),
  }
} 

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Router);
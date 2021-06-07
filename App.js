import React from 'react';
import { AppRegistry, YellowBox, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Geolocation from 'react-native-geolocation-service';
import BackgroundFetch from 'react-native-background-fetch';
import firebase from 'react-native-firebase';

import { log } from './src/utils/log';
import store from './src/configureStore';
import Router from './src/Rounter';
import { headlessGetAndStoreAllData } from './src/utils/headLessFetch';

class App extends React.Component {
    componentDidMount () {
        YellowBox.ignoreWarnings([
            'Require cycle:',
            'Warning: Slider has been extracted', // because of react-native-gesture-handler
            // 'Warning: NetInfo has been extracted',
            // 'Module RNBackgroundFetch requires', // because background-task is using an old version 2.0.x of backgroundFetch
          ]);

        if (Platform.OS == 'ios'){
            Geolocation.requestAuthorization();
        }

        // Cancel existing tasks
        BackgroundFetch.stop();

        BackgroundFetch.configure(
            {
                minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
                // Android options
                stopOnTerminate: false,
                startOnBoot: true,
                enableHeadless: true,
                requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NOT_ROAMING,
                requiresCharging: false, // Default
                requiresDeviceIdle: false, // Default
                requiresBatteryNotLow: true, // Default
                requiresStorageNotLow: false, // Default
            },
            () => {
                log('[js] Received background-fetch event');
                Promise.all([headlessGetAndStoreAllData()])
                .then(() => BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA))
                .catch(() => BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED));
            },
            () => {
                log('[js] RNBackgroundFetch failed to start');
            }
        )
    }
    render() {
        const persistor = persistStore(store);
        return (
            
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router/>
                </PersistGate>
            </Provider>
        )
    }
}

export default App;







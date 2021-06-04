
import { AppRegistry, Text } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import App from './App';
import { name as appName } from './app.json';
import {
    headlessGetAndStoreAllData,
  } from './src/utils/headLessFetch';
import { log } from './src/utils/log';

// Stop changing font size
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);

const BackgroundFetchHeadlessTask = async () => {
    log('[BackgroundFetch HeadlessTask] start');
    Promise.all([headlessGetAndStoreAllData()])        
        .then(() => BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA))
        .catch(() => BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED));
    }

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask);
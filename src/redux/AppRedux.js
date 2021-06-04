import { Platform, Linking } from 'react-native';
import compareVersions from 'compare-versions';
import VersionNumber from 'react-native-version-number';
import { getAppstoreAppVersion } from 'react-native-appstore-version-checker';
// import kttvWorker from '../utils/kttvWorker';
import { Constants, showAltert, toast, log } from '../utils/Omni';

const types = {
    HAS_NEW_VERSION: 'HAS_NEW_VERSION',
    CHECK_NEW_APP_VERSION: 'CHECK_NEW_APP_VERSION',    
};

const goToStore = () => {
    const APP_STORE_LINK = `itms-apps://itunes.apple.com/app/apple-store/id${Constants.appStoreId}?mt=8`
    const PLAY_STORE_LINK = `market://details?id=${Constants.bundleId}`;
    const storeLink = Platform.OS === 'ios' ? APP_STORE_LINK : PLAY_STORE_LINK
    
    Linking.openURL(storeLink).catch(() => {
        toast('Có lỗi khi cập nhật');            
    });
};

export const actions = {
    checkNewAppVersion: () => (dispatch, getState) =>{
        const { app: appState } = getState();

        const now = Date.now();
        const interval = 28800000; // 8 hours

        if (now > appState.lastCheckVersionTime + interval){
            const currentVersion = VersionNumber.appVersion;
            
            const appId = Platform.OS === 'ios' ? Constants.appStoreId : Constants.bundleId;
            getAppstoreAppVersion(appId).then(appVersion =>{
                const hasUpdate = 
                currentVersion && appVersion 
                ? compareVersions(currentVersion, appVersion) === -1 
                : false;
                if (hasUpdate){
                    showAltert('Đã có phiên bản mới', 'Hãy cập nhật để có trải nghiệm tốt nhất.', goToStore)
                }
                dispatch({
                    type: types.HAS_NEW_VERSION,
                    hasNewVersion: hasUpdate,
                    now,
                });
            })
            .catch(() => {
                log('error when check app version');
            })
        }else{
            dispatch({
                type: types.HAS_NEW_VERSION,
                hasNewVersion: false,
                now: appState.lastCheckVersionTime,
            });
        }
    },
};

const initialState = {
    hasNewVersion: false,
    lastCheckVersionTime: 0,
};

export const reducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case types.HAS_NEW_VERSION:
            return {
                ...state,
                hasNewVersion: action.hasNewVersion, 
                lastCheckVersionTime: action.now,
            };
        default:
            return state;
    }
};

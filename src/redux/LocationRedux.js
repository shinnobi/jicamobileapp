
import Geolocation from 'react-native-geolocation-service';
import kttvWorker from '../utils/kttvWorker';
import { parseLocationAddress } from '../utils/address';
import { setStoredItem } from '../utils/asyncStorage';
import { Constants, toast, log } from '../utils/Omni';
import { checkLoading } from './common';
import { actions as weatherActions } from './WeatherRedux';

const types = {
    WATCHING_GEOLOCATION: 'WATCHING_GEOLOCATION',
    GEOLOCATION_UPDATED: 'GEOLOCATION_UPDATED',
    GET_GEOLOCATION_ERROR: 'GET_GEOLOCATION_ERROR',
    HAS_GEOLOCATION_PERMISSION: 'HAS_GEOLOCATION_PERMISSION',
  
    GETTING_GEOLOCATION_ADDRESS: 'GETTING_GEOLOCATION_ADDRESS',
    UPDATE_GEOLOCATION_ADDRESS: 'UPDATE_GEOLOCATION_ADDRESS',
    GET_GEOLOCATION_ADDRESS_ERROR: 'GET_GEOLOCATION_ADDRESS_ERROR',
  
    SAVE_LOCATION: 'SAVE_LOCATION',
    REMOVE_LOCATION: 'REMOVE_LOCATION',
    REMOVE_LOCATION_INDEX: 'REMOVE_LOCATION_INDEX',
    SET_MAIN_LOCATION_INDEX: 'SET_MAIN_LOCATION_INDEX',
  };

  export const actions = {
    watchGeolocation: (toastErr = true) => (dispatch, getState) => {
        const { locationReducer } = getState();
        const watchId = Geolocation.watchGeolocation(
            position => {
                const coords = position.coords || false;
                // const mainLocationIndex = locationReducer.mainLocationIndex;
                if(coords){
                    const newLocation = {
                        latitude: coords.latitude.toFixed(3), // fixed 3 decimals to have the
                        longitude: coords.longitude.toFixed(3), // accuracy of 110m
                    };
                    const location = getSavedGeolocation(locationReducer) || {};
                    if (
                        newLocation.latitude !== location.latitude ||
                        newLocation.longitude !== location.longitude
                    ){
                        setStoredItem(Constants.asyncStorageKey.location, newLocation);
                        dispatch(actions.updateGeolocation(newLocation));
                        dispatch(actions.getGeolocationAddress(newLocation));
                        dispatch(weatherActions.getAllWeatherData(0, true));
                    }else if (location.latitude && location.longitude && !location.addresText){
                        dispatch(actions.getGeolocationAddress(location));
                    }
                }

                // log(`watchingId: ${watchId}`);
                dispatch(actions.watchingLocation(watchId));
            },
            error => {
                if (toastErr){
                    toast('Có lỗi lấy vị trí của bạn');
                }
                dispatch(actions.getGeolocationError(error));
            },
            // 10 minutes, 250m distance, HighAccuracy
            { enableHighAccuracy: true, interval: 600000, distanceFilter: 250 }
        );
    },
    rewatchGeolocation: () => (dispatch, getState) => {
        const { locationReducer } = getState();
        const { watchingLocationId, hasGeolocationPermission } =  locationReducer;
        if (hasGeolocationPermission){
            if (watchingLocationId !== undefined && watchingLocationId >= 0){
                Geolocation.clearWatch(watchingLocationId);
            }

            dispatch(actions.watchGeolocation(false));
        }
    },
    hasGeolocationPermission: permission => {
        log(`dispatch hasPermission: ${permission}`);
        return {
            type: types.HAS_GEOLOCATION_PERMISSION,
            permission,
        };
    },
    getGeolocationAddress: location => (dispatch, getState) => {
        const { locationReducer } = getState();
        if (
            location &&
            location.latitude &&
            location.longitude &&
            !checkLoading(locationReducer.gettingGeolocationAddress)
        ){
            dispatch(actions.gettingLocationAddress);
            kttvWorker
            .getLocationAddress(location)
            .then(data => {
                // log(data.data.features[0]);
                if (
                    data === undefined ||
                    data.error ||
                    !data.data ||
                    !data.data.features ||
                    !data.data.features[0]
                ){
                    dispatch({
                        type: types.GET_GEOLOCATION_ADDRESS_ERROR,
                     });
                }else{
                    const { addresText, state, district, ward } = parseLocationAddress(
                        data.data.features[0]         
                    );
                    const newLocation = {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        state,
                        district,
                        ward,
                        addresText, 
                    };
                    setStoredItem(Constants.asyncStorageKey.location, newLocation);
                    dispatch({
                        type: types.UPDATE_GEOLOCATION_ADDRESS,
                        addresText,
                        state,
                        district,
                        ward,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.GET_GEOLOCATION_ADDRESS_ERROR,
                });
            });
        }
    },
    gettingLocationAddress: {
        type: types.GETTING_GEOLOCATION_ADDRESS,
        now: Date.now(),
    },
    watchingLocation: watchId => {
        return { type: types.WATCHING_GEOLOCATION, watchId };
    },
    updateGeolocation: location => {
        return { type: types.GEOLOCATION_UPDATED, location };
    },
    getGeolocationError: error => {
        return { type: types.GET_GEOLOCATION_ERROR, error };
    },
    saveLocation: location => (dispatch, getState) =>{
        const { locationReducer } = getState();
        const index = locationReducer.savedLocations.findIndex(item => isSameLocation(item, location));
        if (index <0 ){
            dispatch({ type: types.SAVE_LOCATION, location });
            dispatch(weatherActions.getSavedLocationsCurrentWeather());
        }
    },
    removeLocation: location => (dispatch, getState) => {
        const { locationReducer } = getState();
        const removingIndex = locationReducer.savedLocations.findIndex(item => 
            isSameLocation(item, location));
        
        if (removingIndex >0 ){
            dispatch({ type: types.REMOVE_LOCATION_INDEX, index: removingIndex });
            dispatch(weatherActions.getAllWeatherData(index, false));
        }
    },

  };

  const initialState = {
    watchingLocationId: -1,
    gettingGeolocationAddress: 0, // the time to start getting address
    hasGeolocationPermission: false,
    savedLocation: [
        {
            latitude: 0,
            longitude: 0,
            addressText: '',
        },
    ], // index 0 is geolocation
    mainLocationIndex: 0, // 0 is geolocation
  };

  export const reducer = (state = initialState, action) => {
    const { type, location } = action;
    let { savedLocations } = state;
    let geolocation;

    switch (type){
        case types.GEOLOCATION_UPDATED:
            geolocation = {
                ...savedLocations[0],
                ...location,        
            };
            savedLocations[0] = geolocation;
            return {
                ...state,
                savedLocations,
            };
        case types.WATCHING_GEOLOCATION:
            return {
                ...state,
                watchingLocationId: action.watchId,
            };
        case types.GET_GEOLOCATION_ERROR:
            geolocation = {
                latitude: 0,
                longitude: 0,
                addresText: '',
            };
            savedLocations[0] = geolocation;
            return {
                ...state,
                savedLocations,
            };
        case types.HAS_GEOLOCATION_PERMISSION:
            return {
                ...state,
                getGeolocationAddress: action.now,
                // addressError: false,
            };
        case types.UPDATE_GEOLOCATION_ADDRESS:
            geolocation = {
                ...savedLocations[0],
                addresText: action.addresText,
                state: action.state,
                district: action.district,
                ward: action.ward,
            };
            savedLocations[0] = geolocation;
            return {
                ...state,
            };
        case types.GET_GEOLOCATION_ADDRESS_ERROR:
            return {
                ...state,
            };
        case types.SAVE_LOCATION:
            state.savedLocations.push(location);
            return {
                ...state,
            };
        case types.REMOVE_LOCATION_INDEX:
            state.savedLocations.splice(action.index, 1);
            return {
                ...state,
                // if removing the main location, reset to geolocation
                mainLocationIndex: 
                    action.index === state.mainLocationIndex
                    ? 0
                    : action.index < state.mainLocationIndex
                    ? state.mainLocationIndex - 1
                    : state.mainLocationIndex,            
            };
        case types.SET_MAIN_LOCATION_INDEX:
            return {
                ...state,
                mainLocationIndex: action.index,
            };
        default:
            return state;
    }
  };

  export const getMainLocation = state => {
    return state.savedLocation[state.mainLocationIndex];
  };

  const getSavedGeolocation = state => {
    return state.savedLocation[0];
  };

  const isSameLocation = (locationA, locationB) => {
    return (
        locationA.latitude === locationB.latitude &&
        locationA.longitude === locationB.longitude &&
        locationA.addresText === locationB.addresText
    );
  };

// const isMainLocation = (location, state) => {
//   const mainLocation = state.savedLocations[state.mainLocationIndex];

//   return isSameLocation(mainLocation, location);
// };

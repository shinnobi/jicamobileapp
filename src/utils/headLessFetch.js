import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';
import moment from 'moment';
import Constants from './Constants';
import kttvWorker from './kttvWorker';
import { log } from './log';
import { parseLocationAddress } from './address';
import { getStoredItem, setStoredItem } from './asyncStorage';

const { asyncStorageKey } = Constants;
const getPositionPromise = options => {
    return new Promise(function(resolve, reject){
        Geolocation.getCurrentPosition(resolve, reject, options);
    });
};

// const getLocation = () => {
//   return getPositionPromise()
//     .then(position => {
//       const coords = position.coords || false;
//       if (coords) {
//         const newLocation = {
//           latitude: coords.latitude.toFixed(3), // fixed 3 decimals to have the
//           longitude: coords.longitude.toFixed(3), // accuracy of 110m
//         };

//         setStoredItem(asyncStorageKey.location, newLocation);
//         return newLocation;
//       }

//       return null;
//     })
//     .catch(() => null);
// };

export const headlessGetCurrentWeather = () => {
    return getStoredItem(asyncStorageKey.location)
    .then(location => {
         // if (!location) {
        //   return Promise.resolve(null);
        // }

        const currentLocation = location || Constants.defaultLocation;
        return kttvWorker
            .getCurrentWeather(currentLocation)
            .then(json => {
                if (json && !json.error){
                    return setStoredItem(asyncStorageKey.current, json).then(() => json);     
                }
                
                return getStoredItem(asyncStorageKey.current);
            })
            .catch(() => getStoredItem(asyncStorageKey.current));
    });    
}

const getAndCompareLocation = () => {
    return Promise.all([
        getPositionPromise().catch(() => null),
        getStoredItem(asyncStorageKey.location),
        ])
        .then(([position, storedLocation]) => {
            const coords = position && position.coords ? position.coords : false;

            if (coords) {
                const newLocation = {
                    latitude: coords.latitude.toFixed(3),// fixed 3 decimals to have the
                    longitude: coords.longitude.toFixed(3),// accuracy of 110m
                };

                if (
                    !storedLocation ||
                    newLocation.latitude !== storedLocation.latitude ||
                    newLocation.longitude !== storedLocation.longitude 
                ) {
                    setStoredItem(asyncStorageKey.location, newLocation);
                    return { location: newLocation, isNew: true};
                } else {
                    return { location: storedLocation, isNew: false };
                }   
            } else if (storedLocation){
                return { location: storedLocation, isNew: false };
            }
                    
            return null;
        })
        .catch(() => null);
};

const getAddressFromLocation = location => {
    if (location.addressText) {
        return Promise.resolve(location.addressText);
    }
    return kttvWorker
        .getLocationAddress(location)
        .then(data => {
            if (data && !data.error && data.features && data.features[0]){
                const { addressText, state, district, ward } = parseLocationAddress(data.features[0]);
                const newLocation = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    state,
                    district,
                    ward,
                    addressText,
                  };

                setStoredItem(asyncStorageKey.location, newLocation);
                return addressText;
            }

            return Constants.defaultAddress;
        })
        .catch(() => Constants.defaultAddress);
}

export const headlessGetCurrentAddress = () => {
    return getAndCompareLocation().then(data => {
        if (!data || !data.location){
            return Constants.defaultAddress;
        }
        const { location, isNew } = data;
        if (isNew || !location.addressText){
            return getAddressFromLocation(location);
        }

        return location.addressText;
    })
}

export const headlessGetAndStoreAllData = () => {
    return Promise.all([
        headlessGetCurrentAddress(),//included get location
        headlessGetCurrentWeather(),
    ]).catch(() => Promise.resolve());
}

export const getStoreWeatherData = () => {
    return Promise.all([
        getStoredItem(asyncStorageKey.location),
        getStoreWeatherData(asyncStorageKey.current),
    ]).catch(() => []);
}

const getAlertId = (alert, withFilter = false) => {
    if (!alert) return '';
    const hour = moment().hour();
    if (withFilter) {
      if (!alert.type || !alert.title || alert.id === undefined) {
        return '';
      }
      if (alert.type === 'tomorrow' && (hour < 18 || hour >= 22)) {
        return '';
      }
      if (alert.type === 'today' && (hour < 6 || hour >= 9)) {
        return '';
      }
    }
    const today = moment().format('YYYY-MM-DD');
    return `${today}-${alert.type}-${alert.id}`;
  };
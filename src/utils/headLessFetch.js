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
  return new Promise(function(resolve, reject) {
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
  return getStoredItem(asyncStorageKey.location).then(location => {
    // if (!location) {
    //   return Promise.resolve(null);
    // }

    const currentLocation = location || Constants.defaultLocation;
    return kttvWorker
      .getCurrentWeather(currentLocation)
      .then(json => {
        if (json && !json.error) {
          return setStoredItem(asyncStorageKey.current, json).then(() => json);
        }

        return getStoredItem(asyncStorageKey.current);
      })
      .catch(() => getStoredItem(asyncStorageKey.current));
  });
};

const getAndCompareLocation = () => {
  return Promise.all([
    getPositionPromise().catch(() => null),
    getStoredItem(asyncStorageKey.location),
  ])
    .then(([position, storedLocation]) => {
      const coords = position && position.coords ? position.coords : false;

      if (coords) {
        const newLocation = {
          latitude: coords.latitude.toFixed(3), // fixed 3 decimals to have the
          longitude: coords.longitude.toFixed(3), // accuracy of 110m
        };

        if (
          !storedLocation ||
          newLocation.latitude !== storedLocation.latitude ||
          newLocation.longitude !== storedLocation.longitude
        ) {
          setStoredItem(asyncStorageKey.location, newLocation);
          return { location: newLocation, isNew: true };
        } else {
          return { location: storedLocation, isNew: false };
        }
      } else if (storedLocation) {
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
      if (data && !data.error && data.features && data.features[0]) {
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
};

export const headlessGetCurrentAndress = () => {
  return getAndCompareLocation().then(data => {
    if (!data || !data.location) {
      return Constants.defaultAddress;
    }
    const { location, isNew } = data;
    if (isNew || !location.addressText) {
      return getAddressFromLocation(location);
    }

    return location.addressText;
  });
};

export const headlessGetAndStoreAllData = () => {
  return Promise.all([
    headlessGetCurrentAndress(), // included get location
    headlessGetCurrentWeather(),
  ]).catch(() => Promise.resolve());
};

export const getStoredWeatherData = () => {
  return Promise.all([
    getStoredItem(asyncStorageKey.location),
    getStoredItem(asyncStorageKey.current),
  ]).catch(() => []);
};

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

export const headlessGetAlertThenFireNotification = () => {
  return Promise.all([
    getStoredItem(asyncStorageKey.location),
    getStoredItem(asyncStorageKey.viewedAlert),
  ]).then(([savedLocation, viewedAlerts]) => {
    if (!savedLocation || !savedLocation.latitude || !savedLocation.longitude) {
      return Promise.resolve();
    }

    const city = savedLocation.state || '';
    const district = savedLocation.district || '';

    return kttvWorker.getAlert(city, district, savedLocation).then(json => {
      if (json && !json.error) {
        const viewed = viewedAlerts && Array.isArray(viewedAlerts) ? viewedAlerts : [];
        const filteredAlerts = json.filter(item => {
          const alertId = getAlertId(item, true);
          if (viewed.length) {
            return alertId && !viewed.includes(alertId);
          }

          return alertId;
        });
        if (filteredAlerts && filteredAlerts.length) {
          let lastAlert = {};
          let alertId = '';
          let index = filteredAlerts.length - 1;
          while (!alertId && index >= 0) {
            lastAlert = { ...filteredAlerts[index] };
            alertId = getAlertId(lastAlert, true);
            index = index - 1;
            if (alertId) {
              break;
            }
          }
          if (!alertId) {
            return Promise.resolve();
          }

          const { type } = lastAlert;
          const newNotification = new firebase.notifications.Notification().setNotificationId(
            alertId
          );
          if (type === 'alert') {
            newNotification.setTitle(lastAlert.title).setBody(lastAlert.summary);
            if (lastAlert.newsId) {
              newNotification.setData({ newsId: lastAlert.newsId });
            }
          } else if (type === 'tomorrow') {
            newNotification.setTitle('Thời tiết ngày mai').setBody(lastAlert.title);
          } else if (type === 'today') {
            newNotification.setTitle('Thời tiết hôm nay').setBody(lastAlert.title);
          } else {
            newNotification.setTitle(lastAlert.title);
          }
          if (newNotification.android) {
            newNotification.android
              .setChannelId('weather-channel')
              .android.setSmallIcon('ic_launcher') // noti icon
              .android.setColor('#FFFFFF');
          }
          // if (Platform.OS === 'ios') {
          //   newNotification.ios.setBadge(0);
          // }
          firebase.notifications().displayNotification(newNotification);

          // save to storage
          filteredAlerts.splice(filteredAlerts.length - 1, 1);
          viewed.push(alertId);

          return setStoredItem(asyncStorageKey.viewedAlert, viewed);
        }
      }
    });
  });
};

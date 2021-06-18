/**
 * Created by KhanhNQ on 20/12/2016.
 *
 * @format
 */

const Constants = {
  appStoreId: '1485682279',
  bundleId: 'vn.weathervietnam.jicamobileapp',
  devDomain: 'http://api.jica.weathervietnam.vn/api',
  deeplinkBase: 'kttvweather',
  VND: '₫',
  oC: '&#8451;',
  kmH: 'Km/H',
  km: 'Km',
  mb: 'MB',
  hPa: 'hPa',
  interval: 600000, // 10 minutes = 600000
  timeout: 20000, // 20 seconds
  defaultLocation: {
    latitude: 21.033, // default Hanoi
    longitude: 105.85,
  },
  shortDateFormat: 'D-M-YY',
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm',
  openWeatherAPI: '9d04a2c677e587fe682f6d326a754f8f',
  weatherLevels: ['none', 'small', 'high', 'very_high', 'special'],
  defaultAddress: 'Hà Nội',
  address: {
    Ward: 'Phường',
    Village: 'Xã',
    Commune: 'Thị xã',
    Town: 'Thị trấn',
    District: 'Quận',
    County: 'Huyện',
    State: 'Tỉnh',
    City: 'Thành phố',
  },
  asyncStorageKey: {
    location: '@kttv-weather-location',
    address: '@kttv-weather-address',
    current: '@kttv-weather-current',
    alert: '@kttv-weather-alert',
    viewedAlert: '@kttv-weather-viewedAlert',
  },
  // fontFamily: 'Roboto-Regular',
  // fontHeader: 'Roboto-Regular',
  EmitCode: {
    Toast: 'toast',
  },
};

export default Constants;

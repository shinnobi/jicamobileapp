import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// You have to import every reducers and combine them.
import { reducer as AppReducer } from './AppRedux';
import { reducer as LocationReducer } from './LocationRedux';
import { reducer as NetInfoReducer } from './NetInfoRedux';
import { reducer as ToastReducer } from './ToastRedux';
import { reducer as WeatherReducer } from './WeatherRedux';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['netInfo', 'toast'],
};

export default persistCombineReducers(config, {
  app: AppReducer,
  netInfo: NetInfoReducer,
  toast: ToastReducer,
  locationReducer: LocationReducer,
  weatherReducer: WeatherReducer,
});

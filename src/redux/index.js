/** @format */

import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// You have to import every reducers and combine them.

import { reducer as NetInfoReducer } from './NetInfoRedux';
import { reducer as NewsReducer } from './NewsRedux';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['netInfo'/*, 'toast'*/],
};

export default persistCombineReducers(config, {    
  weatherNews: NewsReducer,
  netInfo: NetInfoReducer,
});

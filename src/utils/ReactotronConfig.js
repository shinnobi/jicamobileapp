/** @format */

import Reactotron from 'reactotron-react-native';
import ReactotronFlipper from "reactotron-react-native/dist/flipper"
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';

Reactotron.configure({ 
  name: 'jicamobileapp',
  createSocket: path => new ReactotronFlipper(path),
});

Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] },
});

Reactotron.use(reduxPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;

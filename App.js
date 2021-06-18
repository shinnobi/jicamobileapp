/* eslint-disable */

import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import store from './src/configureStore';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

import Router from './src/Router';

class App extends React.Component {
  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

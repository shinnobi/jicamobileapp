import { RectButton } from 'react-native-gesture-handler';
import Reactotron from 'reactotron-react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux';
import './utils/ReactotronConfig';

const middleware = [
    thunk,
     // more middleware
];

// const store = createStore(reducers, {}, applyMiddleware(...middleware));

const configureStore = () => {
    let store = null;
    if (__DEV__) {
        store = createStore(
            reducers,
            {},
            compose(
                applyMiddleware(...middleware),
                Reactotron.createEnhancer()
            )
        );
    }else{
        store = compose(applyMiddleware(...middleware))(createStore)(reducers);
    }
    return store;
};

export default configureStore();
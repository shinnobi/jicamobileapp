import reactotron from 'reactotron-react-native';

export const log = values => {
    if (__DEV__){
        reactotron.log(values);
        console.log(values);
    }
};
export const warn = values => {
    if (__DEV__){
        reactotron.warn(values);
        console.warn(values);
    }
};
export const error = values => __DEV__ && reactotron.error(values);

import AsyncStorage from '@react-native-community/async-storage';

export const getStoredItem = (key, needParse = true) => {
    return AsyncStorage.getItem(key)
        .then(value => {
            if (!value) return null;
            return needParse ? JSON.parse(value): value;
        })
        .catch(() => null);
};

export const setStoredItem = (key, value, needStringify = true) => {
    const newValue = needStringify ? JSON.stringify({ ...value, time: Date.now() }) : value;
    return AsyncStorage.setItem(key, newValue).catch(() => {});
};
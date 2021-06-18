/**
 * Created by KhanhNQ on 14/02/2017.
 *
 * @format
 */

import kttvWorker from '../utils/kttvWorker';
import { Constants, Languages } from '../utils/Omni';

const types = {
  GET_WEATHER_NEWS_PENDING: 'GET_WEATHER_NEWS_PENDING',
  GET_WEATHER_NEWS_SUCCESS: 'GET_WEATHER_NEWS_SUCCESS',
  GET_WEATHER_NEWS_FAILURE: 'GET_WEATHER_NEWS_FAILURE',
};

export const actions = {
  getWeatherNews: force => (dispatch, getState) => {
    const { weatherNews: newsState } = getState();
    const { lastGetTime, isFetching } = newsState;
    const prevGettingTime = lastGetTime;
    const now = Date.now();
    const { interval, timeout } = Constants;

    if (
      (force && (!isFetching || now - prevGettingTime > timeout)) ||
      now - prevGettingTime > interval
    ) {
      dispatch({ type: types.GET_WEATHER_NEWS_PENDING, now });

      kttvWorker
        .getWeatherNews()
        .then(json => {
          if (json === undefined || json.error || !json.items) {
            dispatch({
              type: types.GET_WEATHER_NEWS_FAILURE,
              error: Languages.GetDataError,
            });
          } else {
            dispatch({
              type: types.GET_WEATHER_NEWS_SUCCESS,
              json: json.items,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: types.GET_WEATHER_NEWS_FAILURE,
            error: Languages.GetDataError,
          });
        });
    }
  },
};

const initialState = {
  news: [],
  lastGetTime: 0,
  isFetching: false,
};

export const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case types.GET_WEATHER_NEWS_PENDING:
      return {
        ...state,
        lastGetTime: action.now,
        isFetching: true,
      };

    case types.GET_WEATHER_NEWS_SUCCESS:
      return {
        ...state,
        news: action.json,
        isFetching: false,
      };

    case types.GET_WEATHER_NEWS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

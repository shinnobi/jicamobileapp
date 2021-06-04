import kttvWorker from '../utils/kttvWorker';
import { Constants, Languages, log } from '../utils/Omni';
import { setStoredItem } from '../utils/asyncStorage';

const types = {
    GET_CURRENT_WEATHER_PENDING: 'GET_CURRENT_WEATHER_PENDING',
    GET_CURRENT_WEATHER_SUCCESS: 'GET_CURRENT_WEATHER_SUCCESS',
    GET_CURRENT_WEATHER_FAILURE: 'GET_CURRENT_WEATHER_FAILURE',
  
    // CONCISE_FORECAST = forcast Morning, Noon, Evening, Night
    GET_CONCISE_FORECAST_WEATHER_PENDING: 'GET_CONCISE_FORECAST_WEATHER_PENDING',
    GET_CONCISE_FORECAST_WEATHER_SUCCESS: 'GET_CONCISE_FORECAST_WEATHER_SUCCESS',
    GET_CONCISE_FORECAST_WEATHER_FAILURE: 'GET_CONCISE_FORECAST_WEATHER_FAILURE',
  
    GET_HOURLY_FORECAST_WEATHER_PENDING: 'GET_HOURLY_FORECAST_WEATHER_PENDING',
    GET_HOURLY_FORECAST_WEATHER_SUCCESS: 'GET_HOURLY_FORECAST_WEATHER_SUCCESS',
    GET_HOURLY_FORECAST_WEATHER_FAILURE: 'GET_HOURLY_FORECAST_WEATHER_FAILURE',
  
    GET_DAILY_FORECAST_WEATHER_PENDING: 'GET_DAILY_FORECAST_WEATHER_PENDING',
    GET_DAILY_FORECAST_WEATHER_SUCCESS: 'GET_DAILY_FORECAST_WEATHER_SUCCESS',
    GET_DAILY_FORECAST_WEATHER_FAILURE: 'GET_DAILY_FORECAST_WEATHER_FAILURE',
  
    REMOVE_WEATHER_INDEX: 'REMOVE_WEATHER_INDEX',
    GET_SAVED_LOCATIONS_CURRENT_WEATHER_SUCCESS: 'GET_SAVED_LOCATIONS_CURRENT_WEATHER_SUCCESS',
  };

  export const actions = {
    getAllWeatherData: (index = -1, force = false) => dispatch =>{
        dispatch(actions.getCurrentWeather(index, force));
        dispatch(actions.getConciseForecastWeather(index, force));
        dispatch(actions.getDailyForecastWeather(index, force));      
        // dispatch(actions.getHourlyForecastWeather(index, force));  
    },
    getCurrentWeather: (index = -1, force = false) => (dispatch, getState) => {
        const { locationReducer, weatherReducer } = getState();
        const { mainLocationIndex } = locationReducer;
        const currentIndex = index >= 0 ? index : mainLocationIndex;
        const location = locationReducer.savedLocations[currentIndex];
        const { currentForecast = {} } = weatherReducer.data[currentIndex] || {};
        const { lastGetTime: prevGettingTime = 0, isFetching } = currentForecast;
        const now = Date.now();
        const { interval, timeout } = Constants;
        
        if (
            (force && (!isFetching || now - prevGettingTime > timeout)) ||
            now - prevGettingTime > interval
        ){
            dispatch({ type: types.GET_CURRENT_WEATHER_PENDING, index: currentIndex, now});

            kttvWorker
            .getCurrentWeather(location)
            .then(json => {
                if (json === undefined || json.error){
                    dispatch({
                        type: types.GET_CURRENT_WEATHER_FAILURE,
                        index: currentIndex,
                        error: Languages.GetDataError,
                    });
                }else{
                    setStoredItem(Constants.asyncStorageKey.current, json);
                    dispatch({
                        type: types.GET_CURRENT_WEATHER_SUCCESS,
                        index: currentIndex,
                        json,
                    });
                }
            })
            .catch(() =>{
                dispatch({
                    type: types.GET_CURRENT_WEATHER_FAILURE,
                    index: currentIndex,
                    error: Languages.GetDataError,
                });
            })
        }
    },
    getConciseForecastWeather: (index = -1, force = false) => (dispatch, getState) => {
        const { locationReducer, weatherReducer } = getState();
        const { mainLocationIndex } = locationReducer;
        const currentIndex = index >= 0 ? index : mainLocationIndex;
        const location = locationReducer.savedLocations[currentIndex];
        const { conciseForecast = {} } = weatherReducer.data[currentIndex] || {};
        const { lastGetTime: prevGettingTime = 0, isFetching } = conciseForecast;
    
        const now = Date.now();
        const { interval, timeout } = Constants;
    
        if (
          (force && (!isFetching || now - prevGettingTime > timeout)) ||
          now - prevGettingTime > interval
        ) {
          dispatch({ type: types.GET_CONCISE_FORECAST_WEATHER_PENDING, index: currentIndex, now });
          kttvWorker
            .getDetailForecastWeather(location)
            .then(json => {
              if (json === undefined || json.error) {
                dispatch({
                  type: types.GET_CONCISE_FORECAST_WEATHER_FAILURE,
                  index: currentIndex,
                  error: Languages.GetDataError,
                });
              } else {
                dispatch({
                  type: types.GET_CONCISE_FORECAST_WEATHER_SUCCESS,
                  index: currentIndex,
                  json,
                });
              }
            })
            .catch(() => {
              dispatch({
                type: types.GET_CONCISE_FORECAST_WEATHER_FAILURE,
                index: currentIndex,
                error: Languages.GetDataError,
              });
            });
        }
      },
      getHourlyForecastWeather: (index = -1, force = false) => (dispatch, getState) => {
        const { locationReducer, weatherReducer } = getState();
        const { mainLocationIndex } = locationReducer;
        const currentIndex = index >= 0 ? index : mainLocationIndex;
        const location = locationReducer.savedLocations[currentIndex];
        const { hourlyForecast = {} } = weatherReducer.data[currentIndex] || {};
        const { lastGetTime: prevGettingTime = 0, isFetching } = hourlyForecast;
    
        const now = Date.now();
        const { interval, timeout } = Constants;
    
        if (
          (force && (!isFetching || now - prevGettingTime > timeout)) ||
          now - prevGettingTime > interval
        ) {
          dispatch({ type: types.GET_HOURLY_FORECAST_WEATHER_PENDING, index: currentIndex, now });
          kttvWorker
            .getDetailForecastWeather(location)
            .then(json => {
              if (json === undefined || json.error) {
                dispatch({
                  type: types.GET_HOURLY_FORECAST_WEATHER_FAILURE,
                  index: currentIndex,
                  error: Languages.GetDataError,
                });
              } else {
                dispatch({
                  type: types.GET_HOURLY_FORECAST_WEATHER_SUCCESS,
                  index: currentIndex,
                  json,
                });
              }
            })
            .catch(() => {
              dispatch({
                type: types.GET_HOURLY_FORECAST_WEATHER_FAILURE,
                index: currentIndex,
                error: Languages.GetDataError,
              });
            });
        }
      },
      getDailyForecastWeather: (index = -1, force = false) => (dispatch, getState) => {
        const { locationReducer, weatherReducer } = getState();
        const { mainLocationIndex } = locationReducer;
        const currentIndex = index >= 0 ? index : mainLocationIndex;
        const location = locationReducer.savedLocations[currentIndex];
        const { dailyForecast = {} } = weatherReducer.data[currentIndex] || {};
        const { lastGetTime: prevGettingTime = 0, isFetching } = dailyForecast;
    
        const now = Date.now();
        const { interval, timeout } = Constants;
    
        if (
          (force && (!isFetching || now - prevGettingTime > timeout)) ||
          now - prevGettingTime > interval
        ) {
          dispatch({ type: types.GET_DAILY_FORECAST_WEATHER_PENDING, index: currentIndex, now });
          kttvWorker
            .getDailyForecastWeather(location)
            .then(json => {
              if (json === undefined || json.error) {
                dispatch({
                  type: types.GET_DAILY_FORECAST_WEATHER_FAILURE,
                  index: currentIndex,
                  error: Languages.GetDataError,
                });
              } else {
                dispatch({
                  type: types.GET_DAILY_FORECAST_WEATHER_SUCCESS,
                  index: currentIndex,
                  json,
                });
              }
            })
            .catch(() => {
              dispatch({
                type: types.GET_DAILY_FORECAST_WEATHER_FAILURE,
                error: Languages.GetDataError,
              });
            });
        }
      },
      removeWeatherIndex: index => ({
        type: types.REMOVE_WEATHER_INDEX,
        index,
      }),
      getSavedLocationsCurrentWeather: () => (dispatch, getState) =>{
        const { locationReducer, weatherReducer } = getState();

        const weatherPromises = [];
        const now = Date.now();
        const { interval } = Constants;
        locationReducer.savedLocations.forEach((location, index) => {
            const currentForecast = weatherReducer.data[index]
            ? weatherReducer.data[index].currentForecast || {}
            : {};
            const { lastGetTime: prevGettingTime = 0 } = currentForecast;
            if (!prevGettingTime || now - prevGettingTime > interval){
                weatherPromises.push(
                    kttvWorker
                    .getCurrentWeather(location)
                    .then(json => {
                        if (json === undefined || json.error){
                            return { weather: null, index };
                        }else{
                            return { weather: json, index };
                        }
                    })
                    .catch(() =>{
                        return { weather: null, index };        
                    })
                );
            }
        });

        if (weatherPromises.length){
            Promise.all(weatherPromises).then(allData =>{
                dispatch({ type: types.GET_SAVED_LOCATIONS_CURRENT_WEATHER_SUCCESS, allData });
            });
        }
      },
  };

  const initialState = {
      data: [
        {
            currentForecast: {
                weather: {},
                lastGetTime: 0,
                isFetching: false,
                error: false,
            },
            conciseForecast: {
                weather: [],
                lastGetTime: 0,
                isFetching: false,
                error: false,
            },
              hourlyForecast: {
                weather: [],
                lastGetTime: 0,
                isFetching: false,
                error: false,
            },
              dailyForecast: {
                weather: [],
                lastGetTime: 0,
                isFetching: false,
                error: false,
            },         
        },
      ],
  };

  export const reducer = (state = initialState, action) =>{
      const {type, index = 0} = action;

      switch(type) {
        case types.GET_CURRENT_WEATHER_PENDING:
            state.data[index] = state.data[index] || { ...initialState.data[0] };
            state.data[index].currentForecast = {
                ...state.data[index].currentForecast,
                lastGetTime: action.now,
                isFetching: true,
                error: false,
            };
            return {
                ...state,                        
            };

            case types.GET_CURRENT_WEATHER_SUCCESS:
                state.data[index].currentForecast = {
                  ...state.data[index].currentForecast,
                  weather: action.json,
                  isFetching: false,
                  error: false,
                };
                return {
                  ...state,
                };
          
            case types.GET_CURRENT_WEATHER_FAILURE:
            state.data[index].currentForecast = {
                ...state.data[index].currentForecast,
                lastGetTime: 0,
                isFetching: false,
                error: true,
            };
            return {
                ...state,
            };
        
            case types.GET_CONCISE_FORECAST_WEATHER_PENDING:
            state.data[index] = state.data[index] || { ...initialState.data[0] };
            state.data[index].conciseForecast = {
                ...state.data[index].conciseForecast,
                lastGetTime: action.now,
                isFetching: true,
                error: false,
            };
            return {
                ...state,
            };
        
            case types.GET_CONCISE_FORECAST_WEATHER_SUCCESS:
            state.data[index].conciseForecast = {
                ...state.data[index].conciseForecast,
                weather:
                action.json && action.json.foreCastData ? Object.values(action.json.foreCastData) : [],
                isFetching: false,
                error: false,
            };
            return {
                ...state,
            };
        
            case types.GET_CONCISE_FORECAST_WEATHER_FAILURE:
            state.data[index].conciseForecast = {
                ...state.data[index].conciseForecast,
                lastGetTime: 0,
                isFetching: false,
                error: true,
            };
            return {
                ...state,
            };
        
            case types.GET_HOURLY_FORECAST_WEATHER_PENDING:
            state.data[index] = state.data[index] || { ...initialState.data[0] };
            state.data[index].hourlyForecast = {
                ...state.data[index].hourlyForecast,
                lastGetTime: action.now,
                isFetching: true,
                error: false,
            };
            return {
                ...state,
            };
        
            case types.GET_HOURLY_FORECAST_WEATHER_SUCCESS:
            state.data[index].hourlyForecast = {
                ...state.data[index].hourlyForecast,
                weather:
                action.json && action.json.foreCastData ? Object.values(action.json.foreCastData) : [],
                isFetching: false,
                error: false,
            };
            return {
                ...state,
            };
        
            case types.GET_HOURLY_FORECAST_WEATHER_FAILURE:
            state.data[index].hourlyForecast = {
                ...state.data[index].hourlyForecast,
                lastGetTime: 0,
                isFetching: false,
                error: true,
            };
            return {
                ...state,
            };
        
            case types.GET_DAILY_FORECAST_WEATHER_PENDING:
            state.data[index] = state.data[index] || { ...initialState.data[0] };
            state.data[index].dailyForecast = {
                ...state.data[index].dailyForecast,
                lastGetTime: action.now,
                isFetching: true,
                error: false,
            };
            return {
                ...state,
            };
        
            case types.GET_DAILY_FORECAST_WEATHER_SUCCESS:
            state.data[index].dailyForecast = {
                ...state.data[index].dailyForecast,
                weather:
                action.json && action.json.foreCastData ? Object.values(action.json.foreCastData) : [],
                isFetching: false,
                error: false,
            };
            return {
                ...state,
            };
        
            case types.GET_DAILY_FORECAST_WEATHER_FAILURE:
            state.data[index].dailyForecast = {
                ...state.data[index].dailyForecast,
                lastGetTime: 0,
                isFetching: false,
                error: true,
            };
            return {
                ...state,
            };

        case types.REMOVE_WEATHER_INDEX:
            state.data.splice(index, 1);
            return {
                ...state,                    
            };
        
        // case types.SAVED_NEW_CURRENT_WEATHER_SUCCESS:
        //   state.data.push({
        //     ...initialState.data[0],
        //     currentForecast: {
        //       weather: action.json,
        //       lastGetTime: Date.now(),
        //       isFetching: false,
        //     },
        //   });
        //   return {
        //     ...state,
        //   };

         case types.GET_SAVED_LOCATIONS_CURRENT_WEATHER_SUCCESS:
             action.allData.forEach(item => {
                const { weather = null, index = -1 } = item;
                if (index >=0 && weather) {
                    state.data[index] = state.data[index] || { ...initialState.data[0] };
                    state.data[index].currentForecast = {
                        ...state.data[index].currentForecast,
                        weather,
                        lastGetTime: Date.now(),
                        isFetching: false,
                    };
                }       
             });   

             return {
                 ...state,
             };

         default:
             return state;
      };      
  };

  export const checkingIsFetching = data => {
    return(
        data && (data.isFetching === undefined || 
            (data.isFetching && data.lastGetTime && Date.now() - data.lastGetTime < Constants.timeout))
    );
  };

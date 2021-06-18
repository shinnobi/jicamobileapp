import AppConfig from './AppConfig.json';
import Constants from './Constants';
import { log } from './log';

const fetchWithTimeout = (url, options, timeout) => {
  const timeoutRace = new Promise((resolve, reject) => {
    return setTimeout(() => reject(new Error('request timeout')), timeout || Constants.timeout);
  });
  return Promise.race([fetch(url, options), timeoutRace]);
};

class KTTVWorker {
  constructor() {
    this.baseUrl = AppConfig.api.url;
  }

  setBaseUrl(url) {
    if (url) this.baseUrl = url;
  }

  getCurrentWeather(location) {
    const params = {
      Lat: location.latitude || Constants.defaultLocation.latitude,
      Lon: location.longitude || Constants.defaultLocation.longitude,
    };
    return this.get('weather/realdata', { params });
  }

  getDailyForecastWeather(location) {
    const params = {
      Lat: location.latitude || Constants.defaultLocation.latitude,
      Lon: location.longitude || Constants.defaultLocation.longitude,
    };
    return this.get('weather/daily', { params });
  }

  getDetailForecastWeather(location) {
    const params = {
      Lat: location.latitude || Constants.defaultLocation.latitude,
      Lon: location.longitude || Constants.defaultLocation.longitude,
    };
    return this.get('weather/detaildaily', { params });
  }

  getLocationAddress(location) {
    const params = {
      'point.lat': `${location.latitude}`,
      'point.lon': `${location.longitude}`,
      apikey: '8fb3246c12d442525034be04bcd038f22e34571be4adbd4c',
      // format: 'json',
      // zoom: 13,
      // 'accept-language': 'vi',
    };
    return this.get('https://maps.vnpost.vn/api/reverse', { params }, 3 * Constants.timeout); // vmap has longer timeout
  }

  searchLocationAddress(keyword) {
    const params = {
      text: keyword,
      location_bias_scale: 2,
      limit: 50,
      apikey: '8fb3246c12d442525034be04bcd038f22e34571be4adbd4c',
      // limit: 50,
      // format: 'json',
      // countrycodes: 'vn',
      // 'accept-language': 'vi',
    };
    return this.get('https://maps.vnpost.vn/api/search', { params }, 3 * Constants.timeout);
  }

  getAlert(city, district, location) {
    const params = {
      city,
      district,
      lat: `${location.latitude}`,
      lon: `${location.longitude}`,
    };
    return this.get('alert', { params });
  }

  getWeatherNews() {
    return this.get('newsapi/');    
  }

  get = async function(endpoint, data, timeout) {    
    return await this._request('GET', endpoint, data, timeout);
  };

  post = async function(endpoint, data, timeout) {
    return await this._request('POST', endpoint, data, timeout);
  };

  put = async function(endpoint, data, timeout) {
    return await this._request('PUT', endpoint, data, timeout);
  };

  patch = async function(endpoint, data, timeout) {
    return await this._request('PATCH', endpoint, data, timeout);
  };

  delete = async function(endpoint, data, timeout) {
    return await this._request('DELETE', endpoint, data, timeout);
  };

  _getUrl = function(endpoint) {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return endpoint.startsWith('/') ? `${this.baseUrl}${endpoint}` : `${this.baseUrl}/${endpoint}`;
  };

  _join = function(obj, separator) {
    const arr = [];
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      if (val || val === false) {
        arr.push(`${key}=${val}`);
      }
    });

    return arr.join(separator);
  };

  _request = function(method, endpoint, newData, timeout) {
    const url = this._getUrl(endpoint);
    // const data = newData.params ? toPascalCase(newData.params) : false;
    const data = newData && newData.params ? newData.params : false;
    const headers = newData && newData.headers ? newData.headers : false;
    const defaultHeaders = {
      //Authorization: this.authzToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const params = {
      url,
      method,
      headers: headers ? Object.assign(defaultHeaders, headers) : defaultHeaders,
      // encoding: this.encoding,
      // timeout: this.timeout,
    };

    if (method === 'GET') {
      params.headers['Cache-Control'] = 'no-cache';
      if (data) {
        params.url = `${params.url}?${this._join(data, '&')}`;
      }
    } else if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
      if (data) {
        params.body = JSON.stringify(data);
      }
      //   params.headers = {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   };
      //   params.body = JSON.stringify(data);
    }

    log(`Fetch started ${params.url}`);
    const timeoutParam = timeout || Constants.timeout;
    return (
      fetchWithTimeout(params.url, params, timeoutParam)
        .then(res => {
          log(`Fetch finished ${params.url}`);                    
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
            // } else if (res.status === 401) {
            //   res.error = {
            //     status: res.status,
            //     code: res.code,
            //     detail: res.detail,
            //   };
            //   res.data = {};

            //   return res;
          }

          return undefined;
        })
        // .then(res => {
        //   if (!res) {
        //     return undefined;
        //     // } else if (res.error) {
        //     //   return res;
        //   }

        //   return res;
        // })
        .catch(error => {
          log(`Fetch error ${params.url}`);
          log(error);
          return undefined;
        })
    );
  };
}

const antradeWorker = new KTTVWorker();
export default antradeWorker;

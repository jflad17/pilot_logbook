import axios from 'axios';
const setupAxios = () => {
  axios.defaults.baseURL = 'http://localhost:9000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.defaults.paramsSerializer = (params) => {
    let result = '';
    Object.keys(params).forEach((key) => {
      result += `${key}=${encodeURIComponent(params[key])}&`;
    });
    return result.substring(0, result.length - 1);
  };

  axios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken !== null) {
            config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
  );
};

export default setupAxios;

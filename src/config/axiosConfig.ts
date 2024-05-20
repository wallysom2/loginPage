import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.homologation.cliqdrive.com.br/',
  headers: {
    Accept: 'application/json;version=v1_web',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      const { access } = JSON.parse(tokens);
      if (config.headers) {
        config.headers.Authorization = `Bearer ${access}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Não autorizado, redirecionando para login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';
import Cookies from 'js-cookie'

export const axiosWithAccessToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

axiosWithAccessToken.interceptors.request.use(
   async (config) => {
    const accessToken = Cookies.get('accessToken')
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosWithoutAccessToken = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
  });

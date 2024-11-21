// utils/axiosInstance.ts

import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://prepify-revamp.onrender.com', 
});


axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

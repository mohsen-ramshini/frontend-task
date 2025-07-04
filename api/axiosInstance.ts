// app/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api', // آدرس پایه API — می‌تونی تغییرش بدی
  headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
  },
  timeout: 10000, // زمان تایم‌اوت اختیاری
});

// اگر بخوای بعداً توکن اضافه کنی:
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;

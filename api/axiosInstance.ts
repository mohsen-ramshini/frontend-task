// app/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api', 
  headers: {
    'Content-Type': 'application/json',
      "x-api-key": "reqres-free-v1"
  },
  timeout: 10000,
});

export default axiosInstance;

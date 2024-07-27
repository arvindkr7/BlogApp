// src/utils/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Adjust this base URL as per your backend
  headers: {
    'Content-Type': 'application/json',
    // Optionally, set other default headers as needed
  },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    console.log("api token", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

import axios from 'axios';

const HTTP_METHOD = ['POST', 'PUT', 'PATCH'];

export const axiosApi = axios.create({
    baseURL: 'https://blog.h-creations.com/api',
    timeout: 5000,
    // withCredentials: true,
});

axiosApi.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method && HTTP_METHOD.includes(config.method)) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

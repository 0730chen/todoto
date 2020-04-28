import axios, {AxiosInstance, AxiosResponse} from 'axios';
import history from "./history";
import { message} from 'antd';

const appID = 'aUwMwCAWTGhs5LmqavuoX7y3'
const appSecret = "PRrvZ4jRDQ17y4LYrxyq1wbn"

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': appID,
        't-app-secret': appSecret
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const xToken = localStorage.getItem('x-token')
    if (xToken) {
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
}, function (error) {
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
console.log(message);
instance.interceptors.response.use(function (response) {
    if (response.headers['x-token']) {
        localStorage.setItem('x-token', response.headers['x-token'])
    }

    return response
}, function (error) {
    // Do something with response error
    if (error.response.status === 401||500) {
        history.push('/login')
    }
    return new Error(error)
});

export default instance
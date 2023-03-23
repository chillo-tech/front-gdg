import axios from 'axios';
import {setupInterceptorsTo} from "./axios-interceptors";
const instance = axios.create({ baseURL: `http://localhost:3000/items`});
instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCES_TOKEN}`;
instance.defaults.headers.common['Accept'] = 'application/json';
const axiosInstance = setupInterceptorsTo(instance);

export {axiosInstance};

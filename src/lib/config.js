import * as axiosDefault from 'axios';

const SERVER = 'http://localhost:42069';
export const axios = axiosDefault.create({
  baseURL: SERVER,
  withCredentials: true,
});
export const bearerHeader = `Bearer ${localStorage.getItem('accessToken')}`;


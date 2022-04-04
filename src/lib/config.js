import * as axiosDefault from 'axios';

const SERVER = 'http://localhost:5000/api';
export const axios = axiosDefault.create({
  baseURL: SERVER,
});
export const bearerHeader = `Bearer ${localStorage.getItem('accessToken')}`;
export default { axios, bearerHeader };

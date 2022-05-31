import { axios, bearerHeader } from '../config';

export const getHolidays = async () => {
  try {
    const response = await axios.get('/api/v1/holidays/all');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getHoliday = async (id) => {
  try {
    const response = await axios.get(`/api/v1/holidays/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createHoliday = async (holiday) => {
  try {
    holiday.numberOfDaysOff = Number(holiday.numberOfDaysOff);
    const response = await axios.post(`/api/v1/holidays/create`, holiday);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editHoliday = async (holiday) => {
  try {
    const response = await axios.put(
      `/api/v1/holidays/${holiday._id}`,
      holiday
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delHoliday = async (holiday) => {
  try {
    const response = await axios.delete(`/api/v1/holidays/${holiday._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

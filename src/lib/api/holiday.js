import { axios, bearerHeader } from '../config';

export const getHolidays = async () => {
  try {
    const response = await axios.get('/api/v1/holidays/all');
    return response.data;
  } catch (err) {
    if (err.response.data.message === "The company doesn't have any holiday")
      return [];
      return [{_id: 1, name: '30/4 1/5', startDate: '2022-05-06', numberOfDaysOff: 2, repeatYearly: true}];
    throw new Error(err);
  }
};

export const getHoliday = async (id) => {
  try {
    const response = await axios.get(`/api/v1/holidays/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createHoliday = async (holiday) => {
  try {
    holiday.numberOfDaysOff = Number(holiday.numberOfDaysOff);
    const response = await axios.post(`/api/v1/holidays/create`, holiday);
    return response.data;
  } catch (err) {
    throw new Error(err);
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
    throw new Error(err);
  }
};

export const delHoliday = async (holiday) => {
  try {
    const response = await axios.delete(`/holidays/${holiday.id}`, holiday, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

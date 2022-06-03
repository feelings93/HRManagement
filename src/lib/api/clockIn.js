import { axios } from '../config';

export const getClockInsByEmployeeID = async (id) => {
  try {
    const response = await axios.get(`/api/v1/clock-ins/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};


export const getClockIns = async (id) => {
    try {
      const response = await axios.get(`/api/v1/clock-ins`);
      return response.data;
    } catch (err) {
      throw new Error(err.response.data?.message);
    }
  };

export const createClockIn = async (clockIn) => {
  try {
    const response = await axios.post(`/api/v1/clock-ins`, clockIn);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editClockIn = async (clockIn) => {
  try {
    const response = await axios.put(
      `/api/v1/clock-ins/${clockIn.employeeID}`,
      clockIn
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delClockIn = async (clockIn) => {
  try {
    const response = await axios.delete(`/api/v1/clock-ins/${clockIn._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

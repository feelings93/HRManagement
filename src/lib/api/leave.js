import { axios } from '../config';

export const getLeavesByEmployeeID = async (id) => {
  try {
    const response = await axios.get(`/api/v1/leaves/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createLeave = async (penalty) => {
  try {
    penalty.numberOfDays = Number(penalty.numberOfDays);
    const response = await axios.post(`/api/v1/leaves/create`, penalty);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editLeave = async (penalty) => {
  try {
    const response = await axios.put(
      `/api/v1/leaves/${penalty._id}`,
      penalty
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delLeave = async (penalty) => {
  try {
    const response = await axios.delete(`/api/v1/leaves/${penalty._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

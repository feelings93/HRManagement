import { axios } from '../config';

export const getPenaltiesByEmployeeID = async (id) => {
  try {
    const response = await axios.get(`/api/v1/penalties/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createPenalty = async (penalty) => {
  try {
    penalty.deduction = Number(penalty.deduction);
    const response = await axios.post(`/api/v1/penalties`, penalty);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editPenalty = async (penalty) => {
  try {
    const response = await axios.put(
      `/api/v1/penalties/${penalty._id}`,
      penalty
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delPenalty = async (penalty) => {
  try {
    const response = await axios.delete(`/api/v1/penalties/${penalty._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

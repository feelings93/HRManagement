import { axios } from '../config';

export const getReports = async (params) => {
  try {
    const response = await axios.get('/api/v1/reports', {
      params,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getReport = async (id) => {
  try {
    const response = await axios.get(`/api/v1/reports/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createReport = async (report) => {
  try {
    const response = await axios.post(`/api/v1/reports`, report);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editReport = async (report) => {
  try {
    const response = await axios.put(`/api/v1/reports/${report._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delReport = async (report) => {
  try {
    const response = await axios.delete(`/api/v1/reports/${report._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

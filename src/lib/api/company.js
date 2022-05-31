import { axios } from '../config';

export const createPenaltyType = async (type) => {
  try {
    const response = await axios.post(`/api/v1/company/penalty-types`, {
      penalty: type,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const deletePenaltyType = async (type) => {
  try {
    const response = await axios.delete(
      `/api/v1/company/penalty-types/${type}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const updateCompanyInfo = async (company) => {
  try {
    const response = await axios.put(`/api/v1/company`, company);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const updateCompanyRule = async (rule) => {
  try {
    const response = await axios.put(`/api/v1/company/rules`, rule);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

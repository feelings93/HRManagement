import { axios } from '../config';

export const getRoles = async () => {
  try {
    const response = await axios.get('/api/v1/roles/all');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const getRole = async (id) => {
  try {
    const response = await axios.get(`/api/v1/roles/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createRole = async (role) => {
  try {
    role.baseSalary = Number(role.baseSalary);
    role.otMultiplier = Number(role.otMultiplier);
    const response = await axios.post(`/api/v1/roles/create`, role);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editRole = async (role) => {
  try {
    const response = await axios.put(
      `/api/v1/roles/${role._id}`,
      role
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delRole = async (role) => {
  try {
    const response = await axios.delete(`/api/v1/roles/${role._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

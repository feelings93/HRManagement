import { axios } from '../config';

export const getEmployees = async () => {
  try {
    const response = await axios.get('/api/v1/employees/all');
    return response.data;
  } catch (err) {
    if (err.response.data.message === "The company doesn't have any employee")
      return [];
    throw new Error(err.response.data?.message);
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await axios.get(`/employees/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(`/api/v1/employees/create`, employee);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const editEmployee = async (employee) => {
  try {
    const response = await axios.put(
      `/api/v1/employees/${employee._id}`,
      employee
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const delEmployee = async (employee) => {
  try {
    const response = await axios.delete(`/api/v1/employees/${employee._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

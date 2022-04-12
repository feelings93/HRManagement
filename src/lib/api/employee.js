import { axios, bearerHeader } from '../config';

export const getEmployees = async () => {
  try {
    const response = await axios.get('/api/v1/employees/all');
    return response.data;
  } catch (err) {
    if (err.response.data.message === "The company doesn't have any employee")
      return [];
    throw new Error(err);
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await axios.get(`/employees/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(`/api/v1/employees/create`, employee);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const editEmployee = async (employee) => {
  try {
    const response = await axios.patch(`/employees/${employee.id}`, employee, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const delEmployee = async (employee) => {
  try {
    const response = await axios.delete(`/employees/${employee.id}`, employee, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

import { axios, bearerHeader } from '../config';

export const getEmployees = async () => {
  try {
    return [];
    const response = await axios.get('/employees', {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
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
    const response = await axios.post(`/employees`, employee, {
      headers: {
        Authorization: bearerHeader,
      },
    });
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

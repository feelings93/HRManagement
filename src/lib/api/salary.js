import { axios } from '../config';

export const getSalariesByEmployeeID = async (id) => {
  try {
    const response = await axios.get(`/api/v1/salaries/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message || err.response.data?.error);
  }
};

export const createSalary = async (salary) => {
  try {
    salary.salary = Number(salary.salary);
    salary.otSalary = Number(salary.otSalary);
    const response = await axios.post(`/api/v1/salaries`, salary);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message || err.response.data?.error);
  }
};

export const editSalary = async (salary) => {
  try {
    salary.salary = Number(salary.salary);
    salary.otSalary = Number(salary.otSalary);
    const response = await axios.put(`/api/v1/salaries/${salary._id}`, salary);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message || err.response.data?.error);
  }
};

export const delSalary = async (salary) => {
  try {
    const response = await axios.delete(`/api/v1/salaries/${salary._id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

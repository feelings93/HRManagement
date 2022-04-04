import { axios, bearerHeader } from '../config';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', { email, password }, {});
    return response.data.accessToken;
  } catch (err) {
    throw new Error(err);
  }
};

export const signup = async ({ email, password, name }) => {
  try {
    const response = await axios.post(
      '/auth/signup',
      { email, password, name },
      {}
    );
    return response.data.accessToken;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get('/auth/profile', {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const logout = async () => {
  localStorage.removeItem('accessToken');
  window.location.reload();
};

export const updateProfile = async (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('file', data.file);
  try {
    const response = await axios.patch('/auth/profile', formData, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axios.patch('/auth/password', data, {
      headers: {
        Authorization: bearerHeader,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  login,
  signup,
};

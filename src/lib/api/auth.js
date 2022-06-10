import { axios, bearerHeader } from '../config';

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post('/login', { username, password });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const signup = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      '/register',
      { username, email, password },
      {}
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get('/profile');
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const logout = async () => {
  try {
    const response = await axios.delete('/logout');

    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
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
    throw new Error(err.response.data?.message);
  }
};

export const changePassword = async ({ password, tkn }) => {
  try {
    console.log(tkn);
    const response = await axios.put('/password-change', { password }, {
      params: {
        token: tkn,
        logout: true,
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const notifyChange = async (data) => {
  try {
    console.log(data);
    const response = await axios.post('/password-change', {}, {
      params: {
        username: data
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};

export const verify = async (data) => {
  try {
    const response = await axios.put('/verify', {}, {
      params: {
        token: data
      }
    });
    console.log(response.data.args);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data?.message);
  }
};
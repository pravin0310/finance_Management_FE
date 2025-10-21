import axiosInstance from '../utils/axios';

export const authService = {
  register: async (data) => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};


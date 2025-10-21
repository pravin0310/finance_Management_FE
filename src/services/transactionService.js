import axiosInstance from '../utils/axios';

export const transactionService = {
  getAll: async (filters = {}) => {
    const response = await axiosInstance.get('/transactions', {
      params: filters
    });
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/transactions', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/transactions/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
  },
};


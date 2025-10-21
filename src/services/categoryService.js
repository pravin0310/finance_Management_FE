import axiosInstance from '../utils/axios';

export const categoryService = {
  getAll: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  create: async (data) => {
    const response = await axiosInstance.post('/categories', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },
};


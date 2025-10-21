import axiosInstance from '../utils/axios';

export const reportService = {
  getMonthlyReport: async (month, year) => {
    const response = await axiosInstance.get('/dashboard/monthly', {
      params: { month, year }
    });
    return response.data;
  },

  exportReport: async (month, year) => {
    const response = await axiosInstance.get('/reports/export', {
      params: { month, year },
      responseType: 'blob'
    });
    return response.data;
  },
};


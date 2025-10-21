import axiosInstance from '../utils/axios';

export const dashboardService = {
  getSummary: async () => {
    const response = await axiosInstance.get('/dashboard/summary');
    return response.data;
  },

  getMonthlyData: async (month, year) => {
    const response = await axiosInstance.get('/dashboard/monthly', {
      params: { month, year }
    });
    return response.data;
  },
};


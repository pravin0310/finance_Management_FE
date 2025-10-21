import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import { Download, Calendar, TrendingUp, TrendingDown, PieChart as PieChartIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReport();
  }, [selectedMonth, selectedYear]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await reportService.getMonthlyReport(selectedMonth, selectedYear);
      setReportData(data);
    } catch (err) {
      console.error(err);
      // Mock data for demonstration
      setReportData({
        summary: {
          totalIncome: 65000,
          totalExpense: 38000,
          balance: 27000,
          transactionCount: 45,
        },
        categoryBreakdown: [
          { name: 'Food & Dining', amount: 12000, color: '#FF6384', percentage: 31.6 },
          { name: 'Rent', amount: 15000, color: '#36A2EB', percentage: 39.5 },
          { name: 'Transportation', amount: 5000, color: '#FFCE56', percentage: 13.2 },
          { name: 'Entertainment', amount: 3000, color: '#4BC0C0', percentage: 7.9 },
          { name: 'Utilities', amount: 2000, color: '#9966FF', percentage: 5.3 },
          { name: 'Others', amount: 1000, color: '#FF9F40', percentage: 2.6 },
        ],
        dailyTrend: [
          { date: '1', income: 0, expense: 1500 },
          { date: '2', income: 0, expense: 800 },
          { date: '3', income: 0, expense: 1200 },
          { date: '5', income: 50000, expense: 0 },
          { date: '7', income: 0, expense: 2000 },
          { date: '10', income: 0, expense: 15000 },
          { date: '12', income: 0, expense: 500 },
          { date: '15', income: 15000, expense: 0 },
          { date: '18', income: 0, expense: 1800 },
          { date: '20', income: 0, expense: 2200 },
          { date: '25', income: 0, expense: 900 },
          { date: '28', income: 0, expense: 1100 },
        ],
        topExpenses: [
          { category: 'Rent', amount: 15000 },
          { category: 'Food & Dining', amount: 12000 },
          { category: 'Transportation', amount: 5000 },
          { category: 'Entertainment', amount: 3000 },
          { category: 'Utilities', amount: 2000 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await reportService.exportReport(selectedMonth, selectedYear);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-report-${selectedYear}-${selectedMonth}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export functionality requires backend implementation');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  if (loading && !reportData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-2">Analyze your spending patterns and trends</p>
        </div>
        <button
          onClick={handleExport}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export to CSV
        </button>
      </div>

      {/* Date Selector */}
      <div className="card">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Select Period:</span>
          </div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="input-field max-w-xs"
          >
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="input-field max-w-xs"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      {reportData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card bg-green-50 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Total Income</p>
                  <h3 className="text-2xl font-bold text-green-900 mt-2">
                    {formatCurrency(reportData.summary.totalIncome)}
                  </h3>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="card bg-red-50 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 font-medium">Total Expense</p>
                  <h3 className="text-2xl font-bold text-red-900 mt-2">
                    {formatCurrency(reportData.summary.totalExpense)}
                  </h3>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="card bg-blue-50 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Net Balance</p>
                  <h3 className="text-2xl font-bold text-blue-900 mt-2">
                    {formatCurrency(reportData.summary.balance)}
                  </h3>
                </div>
                <PieChartIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="card bg-purple-50 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">Transactions</p>
                  <h3 className="text-2xl font-bold text-purple-900 mt-2">
                    {reportData.summary.transactionCount}
                  </h3>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown Pie Chart */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Expense by Category</h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={reportData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {reportData.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Expenses Bar Chart */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Expense Categories</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={reportData.topExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                  />
                  <Bar dataKey="amount" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Trend Line Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Daily Income vs Expense</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={reportData.dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Income"
                  dot={{ fill: '#10b981', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Expense"
                  dot={{ fill: '#ef4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Details Table */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.categoryBreakdown.map((category, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(category.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm text-gray-600">{category.percentage.toFixed(1)}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: category.color,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;


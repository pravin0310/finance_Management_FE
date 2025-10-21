import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch summary data
      const summaryResponse = await dashboardService.getSummary();
      setSummary(summaryResponse);

      // Fetch monthly data
      const now = new Date();
      const monthlyResponse = await dashboardService.getMonthlyData(
        now.getMonth() + 1, 
        now.getFullYear()
      );
      setMonthlyData(monthlyResponse);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
      // Mock data for demonstration
      setSummary({
        totalIncome: 55000,
        totalExpense: 33000,
        balance: 22000,
        incomePercentage: 12.5,
        expensePercentage: 8.3
      });
      setMonthlyData({
        monthlyTrend: [
          { month: 'Jan', income: 45000, expense: 28000 },
          { month: 'Feb', income: 48000, expense: 30000 },
          { month: 'Mar', income: 52000, expense: 31000 },
          { month: 'Apr', income: 50000, expense: 29000 },
          { month: 'May', income: 53000, expense: 32000 },
          { month: 'Jun', income: 55000, expense: 33000 },
        ],
        categoryExpenses: [
          { name: 'Food', value: 12000, color: '#FF6384' },
          { name: 'Rent', value: 15000, color: '#36A2EB' },
          { name: 'Transport', value: 3000, color: '#FFCE56' },
          { name: 'Entertainment', value: 2000, color: '#4BC0C0' },
          { name: 'Others', value: 1000, color: '#9966FF' },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello, {user?.name || 'Pravin'} 👋</h1>
            <p className="text-primary-100">Welcome back to your financial dashboard</p>
          </div>
          <Wallet className="w-16 h-16 text-primary-200" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Income Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Income</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(summary?.totalIncome || 0)}
              </h3>
              {summary?.incomePercentage && (
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium ml-1">
                    +{summary.incomePercentage}% from last month
                  </span>
                </div>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Expense</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(summary?.totalExpense || 0)}
              </h3>
              {summary?.expensePercentage && (
                <div className="flex items-center mt-2 text-red-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium ml-1">
                    +{summary.expensePercentage}% from last month
                  </span>
                </div>
              )}
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-700 font-medium">Current Balance</p>
              <h3 className="text-2xl font-bold text-primary-900 mt-2">
                {formatCurrency(summary?.balance || 0)}
              </h3>
              <p className="text-sm text-primary-600 mt-2">Available funds</p>
            </div>
            <div className="bg-primary-200 p-3 rounded-full">
              <Wallet className="w-8 h-8 text-primary-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Income vs Expense</h2>
            <BarChart3 className="w-6 h-6 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData?.monthlyTrend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
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

        {/* Expense by Category */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expense by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={monthlyData?.categoryExpenses || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {(monthlyData?.categoryExpenses || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {(monthlyData?.categoryExpenses || []).map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Add Income
          </button>
          <button className="btn-danger flex items-center justify-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Add Expense
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <BarChart3 className="w-5 h-5" />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';
import { categoryService } from '../services/categoryService';
import { Plus, Edit2, Trash2, X, Filter, Search, Calendar, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transactionsData, categoriesData] = await Promise.all([
        transactionService.getAll(filters),
        categoryService.getAll(),
      ]);
      setTransactions(transactionsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
      // Mock data for demonstration
      setCategories([
        { id: 1, name: 'Food & Dining', type: 'expense' },
        { id: 2, name: 'Rent', type: 'expense' },
        { id: 3, name: 'Transportation', type: 'expense' },
        { id: 4, name: 'Salary', type: 'income' },
        { id: 5, name: 'Freelance', type: 'income' },
      ]);
      setTransactions([
        {
          id: 1,
          date: '2025-10-15',
          category: 'Food & Dining',
          type: 'expense',
          amount: 1500,
          note: 'Restaurant dinner',
        },
        {
          id: 2,
          date: '2025-10-14',
          category: 'Salary',
          type: 'income',
          amount: 50000,
          note: 'Monthly salary',
        },
        {
          id: 3,
          date: '2025-10-13',
          category: 'Transportation',
          type: 'expense',
          amount: 500,
          note: 'Uber ride',
        },
        {
          id: 4,
          date: '2025-10-12',
          category: 'Freelance',
          type: 'income',
          amount: 15000,
          note: 'Project payment',
        },
        {
          id: 5,
          date: '2025-10-11',
          category: 'Rent',
          type: 'expense',
          amount: 15000,
          note: 'Monthly rent',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (transaction = null) => {
    setEditingTransaction(transaction);
    setShowModal(true);
    if (transaction) {
      reset({
        date: transaction.date,
        categoryId: transaction.categoryId,
        type: transaction.type,
        amount: transaction.amount,
        note: transaction.note,
      });
    } else {
      reset({
        date: format(new Date(), 'yyyy-MM-dd'),
        categoryId: '',
        type: 'expense',
        amount: '',
        note: '',
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
    reset();
    setError('');
  };

  const onSubmit = async (data) => {
    try {
      if (editingTransaction) {
        await transactionService.update(editingTransaction.id, data);
        setSuccessMessage('Transaction updated successfully!');
      } else {
        await transactionService.create(data);
        setSuccessMessage('Transaction created successfully!');
      }
      fetchData();
      closeModal();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save transaction');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.delete(id);
        setSuccessMessage('Transaction deleted successfully!');
        fetchData();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete transaction');
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchData();
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      search: '',
    });
    fetchData();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type && transaction.type !== filters.type) return false;
    if (filters.category && transaction.category !== filters.category) return false;
    if (filters.search && !transaction.note.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">Track all your income and expenses</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <AlertCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search notes..."
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={applyFilters} className="btn-primary">
            Apply Filters
          </button>
          <button onClick={clearFilters} className="btn-secondary">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {format(new Date(transaction.date), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-semibold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{transaction.note || '-'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(transaction)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className={`input-field ${errors.date ? 'border-red-500' : ''}`}
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  id="type"
                  className={`input-field ${errors.type ? 'border-red-500' : ''}`}
                  {...register('type', { required: 'Type is required' })}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="categoryId"
                  className={`input-field ${errors.categoryId ? 'border-red-500' : ''}`}
                  {...register('categoryId', { required: 'Category is required' })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
                  placeholder="Enter amount"
                  {...register('amount', {
                    required: 'Amount is required',
                    min: {
                      value: 0.01,
                      message: 'Amount must be greater than 0',
                    },
                  })}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  id="note"
                  rows="3"
                  className="input-field"
                  placeholder="Add a note..."
                  {...register('note')}
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingTransaction ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;


import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import { Plus, Edit2, Trash2, X, FolderOpen, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error(err);
      // Mock data for demonstration
      setCategories([
        { id: 1, name: 'Food & Dining', type: 'expense', count: 25 },
        { id: 2, name: 'Rent', type: 'expense', count: 12 },
        { id: 3, name: 'Transportation', type: 'expense', count: 18 },
        { id: 4, name: 'Entertainment', type: 'expense', count: 8 },
        { id: 5, name: 'Salary', type: 'income', count: 6 },
        { id: 6, name: 'Freelance', type: 'income', count: 10 },
        { id: 7, name: 'Shopping', type: 'expense', count: 15 },
        { id: 8, name: 'Utilities', type: 'expense', count: 12 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category = null) => {
    setEditingCategory(category);
    setShowModal(true);
    if (category) {
      reset({
        name: category.name,
        type: category.type,
      });
    } else {
      reset({
        name: '',
        type: 'expense',
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    reset();
    setError('');
  };

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, data);
        setSuccessMessage('Category updated successfully!');
      } else {
        await categoryService.create(data);
        setSuccessMessage('Category created successfully!');
      }
      fetchCategories();
      closeModal();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        setSuccessMessage('Category deleted successfully!');
        fetchCategories();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

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
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Manage your income and expense categories</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <AlertCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Categories */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <FolderOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Income Categories</h2>
              <p className="text-sm text-gray-600">{incomeCategories.length} categories</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {incomeCategories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No income categories yet</p>
            ) : (
              incomeCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-200 p-2 rounded">
                      <FolderOpen className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">
                        {category.count || 0} transactions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Expense Categories */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-2 rounded-lg">
              <FolderOpen className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Expense Categories</h2>
              <p className="text-sm text-gray-600">{expenseCategories.length} categories</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {expenseCategories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No expense categories yet</p>
            ) : (
              expenseCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-200 p-2 rounded">
                      <FolderOpen className="w-5 h-5 text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">
                        {category.count || 0} transactions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter category name"
                  {...register('name', {
                    required: 'Category name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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

              <div className="flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;


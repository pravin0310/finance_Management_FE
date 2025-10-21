import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, LogOut, AlertCircle, CheckCircle, Settings } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const newPassword = watch('newPassword');

  const onUpdateProfile = async (data) => {
    try {
      // Call API to update profile
      // await userService.updateProfile(data);
      setSuccessMessage('Profile updated successfully!');
      setError('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
      setSuccessMessage('');
    }
  };

  const onChangePassword = async (data) => {
    try {
      // Call API to change password
      // await userService.changePassword(data);
      setSuccessMessage('Password changed successfully!');
      setError('');
      resetPassword();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to change password');
      setSuccessMessage('');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'profile'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </div>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'password'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </div>
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'preferences'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preferences
              </div>
            </button>
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <button type="button" className="mt-2 text-sm text-primary-600 hover:text-primary-700">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      className={`input-field pl-10 ${profileErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter your name"
                      {...registerProfile('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                    />
                  </div>
                  {profileErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      className={`input-field pl-10 ${profileErrors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                      {...registerProfile('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                  </div>
                  {profileErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="p-6">
            <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-6">
              <div className="max-w-md space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="currentPassword"
                      type="password"
                      className={`input-field pl-10 ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                      placeholder="Enter current password"
                      {...registerPassword('currentPassword', {
                        required: 'Current password is required',
                      })}
                    />
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="newPassword"
                      type="password"
                      className={`input-field pl-10 ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                      placeholder="Enter new password"
                      {...registerPassword('newPassword', {
                        required: 'New password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                    />
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type="password"
                      className={`input-field pl-10 ${passwordErrors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirm new password"
                      {...registerPassword('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === newPassword || 'Passwords do not match',
                      })}
                    />
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="p-6">
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700">Email notifications for transactions</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700">Weekly financial summary</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Budget alerts</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Display Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="input-field max-w-xs">
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select className="input-field max-w-xs">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn-primary">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-200">
        <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Logout from your account</p>
            <p className="text-sm text-gray-600">You will need to login again to access your account</p>
          </div>
          <button onClick={handleLogout} className="btn-danger flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


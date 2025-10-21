import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderOpen,
  Receipt,
  BarChart3,
  User,
  Menu,
  X,
  Wallet,
  LogOut,
} from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Categories', href: '/categories', icon: FolderOpen },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FinanceApp</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-600 truncate">{user?.email || 'user@email.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl font-semibold text-gray-900 lg:hidden">
                {navigation.find((item) => isActive(item.href))?.name || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <p className="text-sm text-gray-600">
                  Welcome back, <span className="font-medium text-gray-900">{user?.name || 'User'}</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;


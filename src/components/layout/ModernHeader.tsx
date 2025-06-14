
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, User, Settings } from 'lucide-react';
import { ModernButton } from '@/components/ui/modern-button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const ModernHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Knowledge', href: '/knowledge' },
    { name: 'Search', href: '/search' },
    { name: 'Analytics', href: '/analytics' },
  ];

  return (
    <header className="modern-nav sticky top-0 z-50">
      <div className="container-modern">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold heading-gradient">Accio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="modern-nav-item"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden lg:block">
                      {user.email}
                    </span>
                  </button>
                </div>

                {/* Settings */}
                <Link
                  to="/settings"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Link>

                {/* Sign Out */}
                <ModernButton
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="hidden sm:flex"
                >
                  Sign Out
                </ModernButton>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <ModernButton variant="ghost" size="sm">
                    Sign In
                  </ModernButton>
                </Link>
                <Link to="/register">
                  <ModernButton gradient size="sm">
                    Get Started
                  </ModernButton>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="modern-nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <ModernButton variant="ghost" className="w-full">
                      Sign In
                    </ModernButton>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <ModernButton gradient className="w-full">
                      Get Started
                    </ModernButton>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ModernHeader;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Sparkles,
  Search,
  Bookmark,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  Brain
} from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider"

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { setTheme } = useTheme();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/features', icon: Sparkles },
    { name: 'AI Features', href: '/ai-features', icon: Brain },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Save Content', href: '/save', icon: Bookmark },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center font-semibold text-lg">
              Accio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1
                    ${location.pathname === item.href ? 'text-primary' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Button */}
          <div className="-mr-2 flex md:none">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={closeMenu}
              className={`text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-1
                ${location.pathname === item.href ? 'text-primary' : ''}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          <ThemeToggleMobile onClick={closeMenu} />
        </div>
      </div>
    </nav>
  );
};

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 text-gray-500 hover:text-gray-700"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4" />
          Light
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          Dark
        </>
      )}
    </button>
  );
};

const ThemeToggleMobile = ({ onClick }: { onClick: () => void }) => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        onClick();
      }}
      className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-1"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-5 w-5" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          Dark Mode
        </>
      )}
    </button>
  );
};

export default Navigation;

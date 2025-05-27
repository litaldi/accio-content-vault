
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Search, 
  Bookmark, 
  Plus, 
  User,
  LayoutDashboard
} from 'lucide-react';

const FooterNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Don't show footer nav on auth pages
  if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
    return null;
  }

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navigationItems = user ? [
    { 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      ariaLabel: 'Go to dashboard'
    },
    { 
      path: '/search', 
      icon: Search, 
      label: 'Search',
      ariaLabel: 'Search content'
    },
    { 
      path: '/save', 
      icon: Plus, 
      label: 'Save',
      ariaLabel: 'Save new content'
    },
    { 
      path: '/saved', 
      icon: Bookmark, 
      label: 'Saved',
      ariaLabel: 'View saved content'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profile',
      ariaLabel: 'View profile'
    }
  ] : [
    { 
      path: '/', 
      icon: Home, 
      label: 'Home',
      ariaLabel: 'Go to home page'
    },
    { 
      path: '/features', 
      icon: Search, 
      label: 'Features',
      ariaLabel: 'View features'
    },
    { 
      path: '/pricing', 
      icon: Bookmark, 
      label: 'Pricing',
      ariaLabel: 'View pricing'
    },
    { 
      path: '/login', 
      icon: User, 
      label: 'Login',
      ariaLabel: 'Sign in to your account'
    }
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 min-h-[64px] min-w-[64px]
                ${isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }
              `}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 mb-1" aria-hidden="true" />
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default FooterNavigation;

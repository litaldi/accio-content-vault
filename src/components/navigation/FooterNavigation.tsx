
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const FooterNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Only show on protected routes when user is logged in
  const protectedRoutes = ['/dashboard', '/saved', '/search', '/profile', '/settings'];
  const shouldShow = user && protectedRoutes.some(route => location.pathname.startsWith(route));

  if (!shouldShow) return null;

  const navigationItems = [
    { 
      href: '/dashboard', 
      icon: Home, 
      label: 'Home',
      isActive: location.pathname === '/dashboard'
    },
    { 
      href: '/search', 
      icon: Search, 
      label: 'Search',
      isActive: location.pathname.startsWith('/search')
    },
    { 
      href: '/saved', 
      icon: BookOpen, 
      label: 'Saved',
      isActive: location.pathname.startsWith('/saved')
    },
    { 
      href: '/profile', 
      icon: User, 
      label: 'Profile',
      isActive: location.pathname.startsWith('/profile')
    },
    { 
      href: '/settings', 
      icon: Settings, 
      label: 'Settings',
      isActive: location.pathname.startsWith('/settings')
    }
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border/60 safe-area-pb"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-colors duration-200",
              "hover:bg-accent/50 active:bg-accent",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset",
              item.isActive && "text-primary bg-primary/10"
            )}
            aria-label={item.label}
          >
            <item.icon className={cn(
              "h-5 w-5",
              item.isActive ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-xs font-medium",
              item.isActive ? "text-primary" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default FooterNavigation;

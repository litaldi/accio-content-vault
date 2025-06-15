
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Bookmark, 
  Search, 
  BarChart3, 
  FolderOpen,
  Bell,
  Settings,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const NavigationMenu: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const publicNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/features', label: 'Features', icon: Search },
  ];

  const authenticatedNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/saved-content', label: 'Saved Content', icon: Bookmark },
    { href: '/collections', label: 'Collections', icon: FolderOpen },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/reminders', label: 'Reminders', icon: Bell },
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

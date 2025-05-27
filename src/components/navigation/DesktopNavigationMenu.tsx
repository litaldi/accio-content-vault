
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Sparkles,
  Search,
  Bookmark,
  Settings,
  Brain,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '/features', icon: Sparkles },
  { name: 'AI Features', href: '/ai-features', icon: Brain },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Save Content', href: '/save', icon: Bookmark },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const DesktopNavigationMenu: React.FC = () => {
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="hidden md:flex items-center space-x-1 flex-1" role="navigation" aria-label="Main navigation">
      {navigationItems.map((item) => {
        const isActive = isActiveRoute(item.href);
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              isActive 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNavigationMenu;

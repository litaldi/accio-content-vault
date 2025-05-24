
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, BookOpen, Settings, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationProps {
  isLoggedIn: boolean;
}

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Return to homepage'
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BookOpen,
    description: 'View your saved content',
    requiresAuth: true
  },
  {
    name: 'Save Content',
    href: '/save',
    icon: BookOpen,
    description: 'Save new web content',
    requiresAuth: true
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Manage your account',
    requiresAuth: true
  }
];

export const EnhancedNavigation: React.FC<NavigationProps> = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const visibleItems = navigationItems.filter(item => 
    !item.requiresAuth || isLoggedIn
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-2"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Mobile menu button */}
      <div className="md:hidden flex justify-between items-center p-2">
        <span className="text-sm font-medium">Navigation</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="navigation-menu"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation items */}
      <div 
        id="navigation-menu"
        className={cn(
          "flex flex-col md:flex-row gap-1",
          "md:block", // Always visible on desktop
          isOpen ? "block" : "hidden md:block" // Toggle on mobile
        )}
      >
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.name}
              asChild
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "justify-start gap-2 relative",
                isActive && "bg-primary text-primary-foreground"
              )}
            >
              <Link 
                to={item.href}
                aria-label={item.description}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.name}</span>
                {isActive && (
                  <Badge 
                    variant="secondary" 
                    className="ml-auto text-xs"
                    aria-label="Current page"
                  >
                    Current
                  </Badge>
                )}
              </Link>
            </Button>
          );
        })}
        
        {!isLoggedIn && (
          <>
            <div className="hidden md:block w-px bg-border mx-2" aria-hidden="true" />
            <Button asChild variant="outline" size="sm">
              <Link to="/login">
                <User className="h-4 w-4 mr-2" aria-hidden="true" />
                Sign In
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

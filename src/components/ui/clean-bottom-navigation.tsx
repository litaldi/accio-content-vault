
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Sparkles, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export const CleanBottomNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigationItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/',
      ariaLabel: 'Go to home page'
    },
    {
      icon: Search,
      label: 'Search',
      href: user ? '/search' : '/features',
      ariaLabel: user ? 'Search content' : 'View features'
    },
    {
      icon: Plus,
      label: user ? 'Save' : 'Join',
      href: user ? '/save' : '/register',
      primary: true,
      ariaLabel: user ? 'Save new content' : 'Join Accio'
    },
    {
      icon: Sparkles,
      label: 'AI',
      href: user ? '/ai-features' : '/features',
      ariaLabel: user ? 'AI features' : 'View AI features'
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/50 px-4 py-2 md:hidden"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.label}
              asChild
              variant={item.primary ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 min-h-[44px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isActive && !item.primary && 'text-primary bg-primary/10',
                item.primary && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              <Link 
                to={item.href} 
                className="flex flex-col items-center gap-1"
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default CleanBottomNavigation;

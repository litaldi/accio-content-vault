
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Puzzle,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '/features', icon: Sparkles },
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Collections', href: '/collections', icon: FolderOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/integrations', icon: Puzzle },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
  { name: 'Settings', href: '/account', icon: Settings },
];

export const EnhancedNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-background border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Accio - Go to homepage"
            >
              Accio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden border-t border-border mt-2 pt-2 pb-4"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

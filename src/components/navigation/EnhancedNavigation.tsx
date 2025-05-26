
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
  Sparkles,
  Brain,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home, description: 'Return to homepage' },
  { name: 'Features', href: '/features', icon: Sparkles, description: 'Explore our features' },
  { name: 'Playground', href: '/playground', icon: Play, description: 'Try our demo' },
  { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Your main workspace' },
  { name: 'Search', href: '/search', icon: Search, description: 'Find your content' },
  { name: 'Collections', href: '/collections', icon: FolderOpen, description: 'Organize content' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'View insights' },
  { name: 'Integrations', href: '/integrations', icon: Puzzle, description: 'Connect apps' },
  { name: 'Contact', href: '/contact', icon: MessageCircle, description: 'Get in touch' },
  { name: 'Settings', href: '/account', icon: Settings, description: 'Account settings' },
];

export const EnhancedNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
            aria-label="Accio - Go to homepage"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent/80 hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  title={item.description}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle variant="icon" size="sm" />
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Get Help</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle variant="icon" size="sm" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
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
            className="lg:hidden border-t border-border py-4 space-y-2"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={closeMobileMenu}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Link>
              );
            })}
            
            <div className="pt-3 border-t border-border mt-3 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact" onClick={closeMobileMenu}>Get Help</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/dashboard" onClick={closeMobileMenu}>Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

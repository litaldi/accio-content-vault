
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Brain,
  Home,
  Zap,
  BarChart3,
  Mail,
  User,
  LogIn
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

export const ImprovedMainNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/features', label: 'Features', icon: Zap },
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          aria-label="Accio - Go to homepage"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Accio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <div className="flex items-center gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.to}
                  asChild
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Link to={item.to}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">
                <User className="h-4 w-4 mr-2" />
                Get Started
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="border-t md:hidden bg-background/95 backdrop-blur"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container py-4 space-y-3">
            {/* Navigation Items */}
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.to}
                  asChild
                  variant={isActive(item.to) ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={item.to}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}

            {/* Mobile Auth Actions */}
            <div className="pt-4 border-t space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3" 
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button 
                className="w-full justify-start gap-3" 
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/register">
                  <User className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

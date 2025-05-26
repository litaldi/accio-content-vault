
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Menu, X, Search, BookOpen, Save, Settings, User, LogOut, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ImprovedNavigationProps {
  isLoggedIn?: boolean;
  user?: any;
  onSignOut?: () => void;
}

const ImprovedNavigation: React.FC<ImprovedNavigationProps> = ({
  isLoggedIn = false,
  user,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsiveDesign();
  const { preferences, announceToScreenReader } = useAccessibility();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home, requiresAuth: false },
    { name: 'Dashboard', href: '/dashboard', icon: BookOpen, requiresAuth: true },
    { name: 'Save Content', href: '/save', icon: Save, requiresAuth: true },
    { name: 'Search', href: '/search', icon: Search, requiresAuth: true },
    { name: 'Settings', href: '/settings', icon: Settings, requiresAuth: true },
  ];

  const visibleItems = navigationItems.filter(item => 
    !item.requiresAuth || isLoggedIn
  );

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    announceToScreenReader(
      mobileMenuOpen ? 'Menu closed' : 'Menu opened'
    );
  };

  const handleSignOut = () => {
    onSignOut?.();
    announceToScreenReader('Signed out successfully');
  };

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        preferences.highContrast && "border-2",
        "transition-all duration-300"
      )}
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2 font-bold text-xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md p-2",
              "hover:opacity-80 transition-opacity"
            )}
            aria-label="Accio home"
          >
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-1">
              {visibleItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground"
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative h-9 w-9 rounded-full hover:bg-accent/50"
                  >
                    <User className="h-4 w-4" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.email || 'User'}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="hover:bg-accent/50">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover:bg-accent/50"
                onClick={handleMobileMenuToggle}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t bg-background/95 py-2 backdrop-blur"
          >
            <div className="space-y-1 px-2">
              {visibleItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ImprovedNavigation;

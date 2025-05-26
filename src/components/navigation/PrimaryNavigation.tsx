
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Menu, X, Search, BookOpen, Save, Settings, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PrimaryNavigationProps {
  isLoggedIn?: boolean;
  user?: any;
  onSignOut?: () => void;
}

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  isLoggedIn = false,
  user,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsiveDesign();
  const { preferences, announceToScreenReader } = useAccessibility();
  const location = useLocation();

  const navigationItems = [
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
        preferences.highContrast && "border-2"
      )}
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2 font-bold text-xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md p-1"
            )}
          >
            <span className="text-primary">Accio</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-6">
              {visibleItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <User className="h-4 w-4" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.email || 'User'}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={handleMobileMenuToggle}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {mobileMenuOpen ? 'Close menu' : 'Open menu'}
                </span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t bg-background py-2"
          >
            <div className="space-y-1 px-2">
              {visibleItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-md px-3 py-2 text-base font-medium",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
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

export default PrimaryNavigation;

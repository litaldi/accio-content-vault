
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Plus, User, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/hooks/useAccessibility';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
  shortcut?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'dashboard', label: 'Dashboard', icon: Search, path: '/dashboard' },
  { id: 'save', label: 'Save Content', icon: Plus, path: '/save', shortcut: 'Ctrl+S' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

interface EnhancedNavigationProps {
  isLoggedIn: boolean;
  className?: string;
}

export const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  isLoggedIn,
  className
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isKeyboardUser, isReducedMotion } = useAccessibility();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navRef = useRef<HTMLElement>(null);

  const filteredItems = navItems.filter(item => 
    isLoggedIn || item.id === 'home'
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!navRef.current?.contains(e.target as Node)) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            navigate(filteredItems[focusedIndex].path);
          }
          break;
        case 'Escape':
          setIsMobileMenuOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, filteredItems, navigate]);

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path === '/dashboard' && location.pathname.startsWith('/dashboard'));
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        ref={navRef}
        className={cn(
          "hidden md:flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-full border px-4 py-2 shadow-lg",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {filteredItems.map((item, index) => {
          const isActive = isActivePath(item.path);
          const isFocused = index === focusedIndex && isKeyboardUser;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(item.path)}
              className={cn(
                "relative group transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive && "shadow-md",
                isFocused && "ring-2 ring-primary ring-offset-2",
                !isReducedMotion && "hover:scale-105"
              )}
              aria-current={isActive ? 'page' : undefined}
              title={`${item.label}${item.shortcut ? ` (${item.shortcut})` : ''}`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden lg:inline ml-2">{item.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
              
              {/* Badge for notifications */}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-50"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <nav
              id="mobile-navigation"
              className="fixed top-16 right-4 left-4 bg-background border rounded-lg shadow-xl z-50 p-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="grid gap-2">
                {filteredItems.map((item) => {
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className="justify-start w-full"
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                      {item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

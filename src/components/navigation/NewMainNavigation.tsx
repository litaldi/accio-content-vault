
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  LayoutDashboard, 
  BookmarkPlus, 
  FolderOpen, 
  BarChart3, 
  User, 
  Settings, 
  LogIn, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTheme } from '@/components/theme/ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
}

const NewMainNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { announceToScreenReader } = useAccessibility();
  
  // Safely use auth context with fallback
  let user = null;
  let signOut = () => {};
  
  try {
    const authContext = useAuth();
    user = authContext.user;
    signOut = authContext.signOut;
  } catch (error) {
    console.warn('AuthProvider not available, navigation will work in guest mode');
  }

  const isLoggedIn = !!user;

  // Navigation items configuration
  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requiresAuth: true },
    { name: 'Save Content', href: '/save', icon: BookmarkPlus, requiresAuth: true },
    { name: 'Collections', href: '/collections', icon: FolderOpen, requiresAuth: true },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, requiresAuth: true },
    { name: 'Profile', href: '/profile', icon: User, requiresAuth: true },
    { name: 'Settings', href: '/settings', icon: Settings, requiresAuth: true },
  ];

  // Filter navigation items based on auth state
  const visibleItems = navigationItems.filter(item => {
    if (item.requiresAuth && !isLoggedIn) return false;
    if (item.hideWhenAuth && isLoggedIn) return false;
    return true;
  });

  // Handle scroll effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      announceToScreenReader('Successfully signed out');
      navigate('/');
    } catch (error) {
      announceToScreenReader('Error signing out');
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (itemName: string) => {
    announceToScreenReader(`Navigating to ${itemName}`);
    setMobileMenuOpen(false);
  };

  const isActivePath = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const ThemeToggle = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-9 w-9 rounded-lg transition-all duration-200",
            "hover:bg-accent/50 hover:scale-105 active:scale-100",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "dark:hover:bg-accent/30"
          )}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border shadow-lg backdrop-blur-xl min-w-[120px]">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={cn(
            "cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30",
            theme === 'light' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={cn(
            "cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30",
            theme === 'dark' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={cn(
            "cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30",
            theme === 'system' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "border-b border-border/40 bg-background/95 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/80",
        scrolled && "shadow-lg border-border/60",
        "dark:border-border/20 dark:bg-background/90"
      )}
      role="banner"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 transition-all duration-200 rounded-lg p-2 -ml-2",
              "hover:opacity-90 hover:scale-105 active:scale-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "group"
            )}
            aria-label="Accio Knowledge Library - Go to homepage"
            onClick={() => announceToScreenReader('Navigating to homepage')}
          >
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200",
              "bg-gradient-to-br from-primary via-primary to-primary/80",
              "group-hover:shadow-md group-hover:from-primary/90 group-hover:to-primary/70",
              "dark:from-primary dark:to-primary/90 dark:shadow-primary/20"
            )}>
              <span className="text-primary-foreground font-bold text-lg leading-none" aria-hidden="true">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold leading-none transition-colors duration-200",
                "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
                "group-hover:from-primary/90 group-hover:to-primary/70"
              )}>
                Accio
              </span>
              <span className="text-xs text-muted-foreground leading-none font-medium">
                Knowledge Library
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {visibleItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  "hover:bg-accent/50 hover:text-accent-foreground",
                  isActivePath(item.href) 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground"
                )}
                aria-current={isActivePath(item.href) ? 'page' : undefined}
                onClick={() => handleNavClick(item.name)}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth Actions */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "relative h-9 w-9 rounded-full transition-all duration-200",
                      "hover:bg-accent/50 hover:scale-105 active:scale-100",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      "dark:hover:bg-accent/30"
                    )}
                    aria-label={`User menu for ${user?.email || 'user'}`}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      "bg-primary/10 text-primary font-semibold text-sm",
                      "dark:bg-primary/20 dark:text-primary"
                    )}>
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-background border shadow-lg backdrop-blur-xl"
                >
                  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                    {user?.email || 'User'}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer hover:bg-accent/50"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/settings')}
                    className="cursor-pointer hover:bg-accent/50"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="h-9 px-3 rounded-lg hover:bg-accent/50"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate('/register')}
                  className={cn(
                    "h-9 px-3 rounded-lg shadow-sm",
                    "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                    "hover:shadow-md"
                  )}
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 hover:bg-accent/50"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  
                  {/* Mobile Navigation Items */}
                  {visibleItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isActivePath(item.href)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                      )}
                      onClick={() => handleNavClick(item.name)}
                      aria-current={isActivePath(item.href) ? 'page' : undefined}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.name}</span>
                    </Link>
                  ))}

                  {/* Mobile Auth Actions */}
                  <div className="border-t pt-4 mt-4">
                    {!isLoggedIn ? (
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                        <Button 
                          className="w-full justify-start"
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Get Started
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Screen reader announcements region */}
      <div 
        id="announcements" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
    </header>
  );
};

export default NewMainNavigation;

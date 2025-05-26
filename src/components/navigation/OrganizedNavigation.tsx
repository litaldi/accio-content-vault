
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Home, 
  BookOpen,
  Save,
  LayoutDashboard, 
  BarChart3, 
  User, 
  Settings, 
  LogIn, 
  LogOut, 
  Menu, 
  X,
  HelpCircle,
  Info,
  Sparkles,
  Moon,
  Sun,
  Monitor,
  ChevronDown
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
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface NavigationCategory {
  label: string;
  items: NavigationItem[];
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
  description?: string;
}

const OrganizedNavigation: React.FC = () => {
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

  // Organized navigation categories
  const navigationCategories: NavigationCategory[] = [
    {
      label: 'Explore',
      items: [
        { name: 'Home', href: '/', icon: Home, description: 'Welcome page and overview' },
        { name: 'Collections', href: '/collections', icon: BookOpen, requiresAuth: true, description: 'Organize your saved content' },
        { name: 'Save Content', href: '/save', icon: Save, requiresAuth: true, description: 'Save new content quickly' },
      ]
    },
    {
      label: 'Your Work',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requiresAuth: true, description: 'Your personal workspace' },
        { name: 'Analytics', href: '/analytics', icon: BarChart3, requiresAuth: true, description: 'Track your knowledge growth' },
        { name: 'Profile', href: '/profile', icon: User, requiresAuth: true, description: 'Manage your account' },
      ]
    },
    {
      label: 'Settings',
      items: [
        { name: 'Preferences', href: '/settings', icon: Settings, requiresAuth: true, description: 'Customize your experience' },
      ]
    },
    {
      label: 'Account',
      items: [
        { name: 'Sign In', href: '/login', icon: LogIn, hideWhenAuth: true, description: 'Access your account' },
        { name: 'Sign Up', href: '/register', icon: Sparkles, hideWhenAuth: true, description: 'Create new account' },
      ]
    },
    {
      label: 'Support',
      items: [
        { name: 'Help Center', href: '/help', icon: HelpCircle, description: 'Get help and support' },
        { name: 'About', href: '/about', icon: Info, description: 'Learn about Accio' },
        { name: 'FAQ', href: '/faq', icon: HelpCircle, description: 'Frequently asked questions' },
      ]
    }
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    try {
      await signOut();
      announceToScreenReader('You have been signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      announceToScreenReader('Error signing out. Please try again.');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    announceToScreenReader(`Theme changed to ${newTheme}`);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  // Filter navigation items based on auth state
  const getVisibleItems = (items: NavigationItem[]) => {
    return items.filter(item => {
      if (item.requiresAuth && !isLoggedIn) return false;
      if (item.hideWhenAuth && isLoggedIn) return false;
      return true;
    });
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-border" 
          : "bg-background border-transparent"
      )}
      role="banner"
    >
      <nav 
        className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-1",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label="Accio - Go to homepage"
        >
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm",
            "bg-gradient-to-br from-primary to-primary/80 hover:scale-105 transition-transform duration-200"
          )}>
            <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">A</span>
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-bold leading-none",
              "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            )}>
              Accio
            </span>
            <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Library</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navigationCategories.map((category) => {
            const visibleItems = getVisibleItems(category.items);
            if (visibleItems.length === 0) return null;

            return (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "h-9 px-3 text-sm font-medium transition-all duration-200",
                      "hover:bg-accent/50 hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    {category.label}
                    <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className={cn(
                    "w-56 bg-background/95 backdrop-blur-md border shadow-lg",
                    "animate-in fade-in-0 zoom-in-95 duration-200"
                  )}
                >
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category.label}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {visibleItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200",
                          "hover:bg-accent/50 hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          location.pathname === item.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.name}</span>
                          {item.description && (
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 transition-all duration-200",
                  "hover:bg-accent/50 hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md">
              <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu or Auth Buttons */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative h-9 w-9 rounded-full transition-all duration-200",
                    "hover:bg-accent/50 hover:scale-105",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                  aria-label="User menu"
                >
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {getUserInitials()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild className="transition-all duration-200 hover:scale-105">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button 
                variant="default" 
                asChild 
                className={cn(
                  "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                  "shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                )}
              >
                <Link to="/register" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Start Free
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden h-9 w-9 transition-all duration-200",
                  "hover:bg-accent/50 hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">A</span>
                  </div>
                  Accio Navigation
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {navigationCategories.map((category) => {
                  const visibleItems = getVisibleItems(category.items);
                  if (visibleItems.length === 0) return null;

                  return (
                    <div key={category.label} className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {category.label}
                      </h3>
                      <div className="space-y-1">
                        {visibleItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                              "hover:bg-accent/50 hover:text-accent-foreground",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                              location.pathname === item.href && "bg-accent text-accent-foreground"
                            )}
                          >
                            <item.icon className="h-4 w-4" aria-hidden="true" />
                            <div className="flex flex-col">
                              <span className="font-medium">{item.name}</span>
                              {item.description && (
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {isLoggedIn && (
                  <div className="pt-4 border-t">
                    <Button 
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default OrganizedNavigation;


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
        { name: 'Saved Content', href: '/save', icon: Save, requiresAuth: true, description: 'Save new content quickly' },
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
        { name: 'Sign Up', href: '/register', icon: Sparkles, hideWhenAuth: true, description: 'Create your account' },
      ]
    },
    {
      label: 'Extras',
      items: [
        { name: 'Help', href: '/help', icon: HelpCircle, description: 'Get support and guides' },
        { name: 'About', href: '/about', icon: Info, description: 'Learn more about Accio' },
      ]
    }
  ];

  // Filter navigation items based on auth state
  const getVisibleCategories = () => {
    return navigationCategories.map(category => ({
      ...category,
      items: category.items.filter(item => {
        if (item.requiresAuth && !isLoggedIn) return false;
        if (item.hideWhenAuth && isLoggedIn) return false;
        return true;
      })
    })).filter(category => category.items.length > 0);
  };

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
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            "cursor-pointer hover:bg-accent/50",
            theme === 'light' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={cn(
            "cursor-pointer hover:bg-accent/50",
            theme === 'dark' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={cn(
            "cursor-pointer hover:bg-accent/50",
            theme === 'system' && "bg-accent/30 text-accent-foreground"
          )}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const visibleCategories = getVisibleCategories();

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "border-b border-border/40 bg-background/95 backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-background/80",
        scrolled && "shadow-lg border-border/60"
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
              "group-hover:shadow-md group-hover:from-primary/90 group-hover:to-primary/70"
            )}>
              <span className="text-primary-foreground font-bold text-lg leading-none">
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
                Knowledge Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Categories */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {visibleCategories.map((category) => (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "hover:bg-accent/50 hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                  >
                    {category.label}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 bg-background border shadow-lg backdrop-blur-xl">
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category.label}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {category.items.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      asChild
                      className={cn(
                        "cursor-pointer hover:bg-accent/50",
                        isActivePath(item.href) && "bg-accent/30 text-accent-foreground"
                      )}
                    >
                      <Link
                        to={item.href}
                        className="flex items-start gap-3 p-2"
                        onClick={() => handleNavClick(item.name)}
                      >
                        <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
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
            ))}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* CTA Button */}
            {!isLoggedIn && (
              <Button 
                size="sm"
                onClick={() => navigate('/register')}
                className={cn(
                  "hidden md:flex h-9 px-4 rounded-lg shadow-sm",
                  "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
                  "hover:shadow-md transition-all duration-200"
                )}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Start Now
              </Button>
            )}
            
            {/* User Menu */}
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "relative h-9 w-9 rounded-full transition-all duration-200",
                      "hover:bg-accent/50 hover:scale-105 active:scale-100",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-label={`User menu for ${user?.email || 'user'}`}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      "bg-primary/10 text-primary font-semibold text-sm"
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
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-9 w-9 hover:bg-accent/50"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8" role="navigation" aria-label="Mobile navigation">
                  
                  {/* Mobile Navigation Categories */}
                  {visibleCategories.map((category) => (
                    <div key={category.label} className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {category.label}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item) => (
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
                            <item.icon className="h-5 w-5" />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              {item.description && (
                                <span className="text-xs opacity-70">{item.description}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Mobile CTA */}
                  {!isLoggedIn && (
                    <div className="border-t pt-6 mt-6">
                      <Button 
                        className="w-full justify-center"
                        onClick={() => {
                          navigate('/register');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Start Now - It's Free!
                      </Button>
                    </div>
                  )}

                  {/* Mobile Logout */}
                  {isLoggedIn && (
                    <div className="border-t pt-4 mt-4">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrganizedNavigation;

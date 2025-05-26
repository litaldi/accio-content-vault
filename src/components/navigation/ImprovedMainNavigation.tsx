import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import ImprovedSkipLinks from '@/components/accessibility/ImprovedSkipLinks';
import { 
  Home, 
  LayoutDashboard,
  BookOpen,
  Save,
  BarChart3, 
  User, 
  Settings, 
  LogIn, 
  LogOut, 
  Menu, 
  X,
  HelpCircle,
  Sparkles,
  Moon,
  Sun,
  Monitor,
  ChevronDown,
  Search,
  Accessibility,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTheme } from '@/components/theme/ThemeProvider';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
  description?: string;
  isExternal?: boolean;
}

const ImprovedMainNavigation: React.FC = () => {
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

  // Main navigation items organized by priority
  const mainNavItems: NavigationItem[] = [
    { name: 'Home', href: '/', icon: Home, description: 'Homepage and overview' },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requiresAuth: true, description: 'Your personal workspace' },
    { name: 'Save Content', href: '/save', icon: Save, requiresAuth: true, description: 'Quickly save new content' },
    { name: 'Collections', href: '/collections', icon: BookOpen, requiresAuth: true, description: 'Organize your saved items' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, requiresAuth: true, badge: 'Pro', description: 'Track your knowledge growth' },
    { name: 'Search', href: '/search', icon: Search, requiresAuth: true, description: 'Find your saved content' },
  ];

  const secondaryNavItems: NavigationItem[] = [
    { name: 'Help Center', href: '/help', icon: HelpCircle, description: 'Get help and support' },
    { name: 'FAQ', href: '/faq', icon: HelpCircle, description: 'Frequently asked questions' },
    { name: 'About', href: '/about', icon: Globe, description: 'Learn about Accio' },
  ];

  const authItems: NavigationItem[] = [
    { name: 'Sign In', href: '/login', icon: LogIn, hideWhenAuth: true, description: 'Access your account' },
    { name: 'Profile', href: '/profile', icon: User, requiresAuth: true, description: 'Manage your profile' },
    { name: 'Settings', href: '/settings', icon: Settings, requiresAuth: true, description: 'Customize preferences' },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      announceToScreenReader('You have been signed out successfully');
      navigate('/');
      setMobileMenuOpen(false);
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
    return user.email.split('@')[0].charAt(0).toUpperCase();
  };

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const getVisibleItems = (items: NavigationItem[]) => {
    return items.filter(item => {
      if (item.requiresAuth && !isLoggedIn) return false;
      if (item.hideWhenAuth && isLoggedIn) return false;
      return true;
    });
  };

  const renderNavItem = (item: NavigationItem, isMobile = false) => {
    const isActive = isActiveLink(item.href);
    const baseClasses = cn(
      "flex items-center gap-2 transition-all duration-200 rounded-lg",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      isMobile 
        ? "px-4 py-3 text-base font-medium w-full justify-start" 
        : "px-3 py-2 text-sm font-medium",
      isActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
    );

    const content = (
      <>
        <item.icon className={cn("h-4 w-4", isMobile && "h-5 w-5")} aria-hidden="true" />
        <span>{item.name}</span>
        {item.badge && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.badge}
          </Badge>
        )}
      </>
    );

    if (item.isExternal) {
      return (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-current={isActive ? 'page' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        className={baseClasses}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          if (isMobile) setMobileMenuOpen(false);
          announceToScreenReader(`Navigating to ${item.name}`);
        }}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <ImprovedSkipLinks />
      <header 
        id="navigation"
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
              <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Engine</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {getVisibleItems(mainNavItems).map(item => renderNavItem(item))}
            
            {/* More dropdown for secondary items */}
            <DropdownMenu>
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
                  aria-label="More options"
                >
                  More
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="center" 
                className="w-56 bg-background/95 backdrop-blur-md border shadow-lg"
              >
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Resources
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {getVisibleItems(secondaryNavItems).map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200"
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
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Accessibility Button */}
            <AccessibilityButton variant="header" />

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
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
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
                  {getVisibleItems(authItems).map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
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
                    Try Demo
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
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">A</span>
                    </div>
                    Accio Menu
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                  {/* Main Navigation */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Navigation
                    </h3>
                    {getVisibleItems(mainNavItems).map(item => renderNavItem(item, true))}
                  </div>

                  {/* Secondary Navigation */}
                  <div className="space-y-1 border-t pt-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Resources
                    </h3>
                    {getVisibleItems(secondaryNavItems).map(item => renderNavItem(item, true))}
                  </div>

                  {/* Account Section */}
                  {isLoggedIn && (
                    <div className="space-y-1 border-t pt-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Account
                      </h3>
                      {getVisibleItems(authItems).map(item => renderNavItem(item, true))}
                      <Button 
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full justify-start mt-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  )}

                  {/* Auth Actions for non-logged users */}
                  {!isLoggedIn && (
                    <div className="border-t pt-4 space-y-2">
                      <Button 
                        onClick={() => { 
                          navigate('/register'); 
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Try Demo
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => { 
                          navigate('/login'); 
                          setMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
};

export default ImprovedMainNavigation;

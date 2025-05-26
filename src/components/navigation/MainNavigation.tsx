
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import { 
  Home, 
  LayoutDashboard,
  Save,
  FolderOpen,
  BarChart3,
  HelpCircle,
  User,
  Settings,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles,
  Play
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
  description?: string;
}

const MainNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { announceToScreenReader } = useAccessibility();
  
  // Safely handle auth context
  let user = null;
  let signOut = () => Promise.resolve();
  
  try {
    const authContext = useAuth();
    user = authContext.user;
    signOut = authContext.signOut;
  } catch (error) {
    console.warn('AuthProvider not available, navigation will work in guest mode');
  }

  const isAuthenticated = !!user;

  // Navigation items configuration
  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: Home,
      description: 'Go to homepage'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      requiresAuth: true,
      description: 'Your personal workspace'
    },
    {
      id: 'save',
      label: 'Save Content',
      href: '/save',
      icon: Save,
      requiresAuth: true,
      description: 'Save new content'
    },
    {
      id: 'collections',
      label: 'Collections',
      href: '/collections',
      icon: FolderOpen,
      requiresAuth: true,
      description: 'Organize your content'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      requiresAuth: true,
      description: 'View your insights'
    },
    {
      id: 'help',
      label: 'Help',
      href: '/help',
      icon: HelpCircle,
      description: 'Get help and support'
    }
  ];

  const accountItems: NavigationItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      href: '/profile',
      icon: User,
      requiresAuth: true,
      description: 'Manage your profile'
    },
    {
      id: 'settings',
      label: 'Settings',
      href: '/settings',
      icon: Settings,
      requiresAuth: true,
      description: 'Customize preferences'
    },
    {
      id: 'login',
      label: 'Sign In',
      href: '/login',
      icon: LogIn,
      hideWhenAuth: true,
      description: 'Access your account'
    }
  ];

  // Handle scroll effect
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

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const getVisibleItems = (items: NavigationItem[]) => {
    return items.filter(item => {
      if (item.requiresAuth && !isAuthenticated) return false;
      if (item.hideWhenAuth && isAuthenticated) return false;
      return true;
    });
  };

  const renderNavItem = (item: NavigationItem, isMobile = false) => {
    const isActive = isActiveLink(item.href);
    
    return (
      <Link
        key={item.id}
        to={item.href}
        className={cn(
          "flex items-center gap-2 transition-all duration-200 rounded-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isMobile 
            ? "px-4 py-3 text-base font-medium w-full" 
            : "px-3 py-2 text-sm font-medium",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        )}
        aria-current={isActive ? 'page' : undefined}
        aria-label={item.description}
        onClick={() => {
          if (isMobile) setMobileMenuOpen(false);
          announceToScreenReader(`Navigating to ${item.label}`);
        }}
      >
        <item.icon className="h-4 w-4" aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    );
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary leading-none">Accio</span>
            <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Engine</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {getVisibleItems(navigationItems).map(item => renderNavItem(item))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Accessibility Button */}
          <AccessibilityButton variant="header" />
          
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Auth Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {getVisibleItems(accountItems).map(item => renderNavItem(item))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium"
                  aria-label="Sign out of your account"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                {getVisibleItems(accountItems).map(item => renderNavItem(item))}
                <Button 
                  asChild
                  className="ml-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                  aria-label="Start your free trial"
                >
                  <Link to="/register" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>Start Now</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Open navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-80 bg-background/95 backdrop-blur-md"
                aria-label="Navigation menu"
              >
                <div className="flex flex-col gap-6 mt-8">
                  {/* Main Navigation */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Navigation
                    </h3>
                    <div className="space-y-2">
                      {getVisibleItems(navigationItems).map(item => renderNavItem(item, true))}
                    </div>
                  </div>

                  {/* Account Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Account
                    </h3>
                    <div className="space-y-2">
                      {isAuthenticated ? (
                        <>
                          {getVisibleItems(accountItems).map(item => renderNavItem(item, true))}
                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start px-4 py-3 text-base font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
                            aria-label="Sign out of your account"
                          >
                            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                            <span>Sign Out</span>
                          </Button>
                        </>
                      ) : (
                        <>
                          {getVisibleItems(accountItems).map(item => renderNavItem(item, true))}
                          <Button 
                            asChild
                            className="w-full mt-4 bg-gradient-to-r from-primary to-blue-600"
                            aria-label="Start your free trial"
                          >
                            <Link to="/register" className="flex items-center justify-center gap-2">
                              <Sparkles className="h-4 w-4" aria-hidden="true" />
                              <span>Start Now</span>
                            </Link>
                          </Button>
                          <Button 
                            asChild
                            variant="outline"
                            className="w-full"
                            aria-label="Watch product demo"
                          >
                            <Link to="/demo" className="flex items-center justify-center gap-2">
                              <Play className="h-4 w-4" aria-hidden="true" />
                              <span>Try Demo</span>
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;

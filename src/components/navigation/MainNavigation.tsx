
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  User,
  Languages,
  Sparkles
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

const MainNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsiveDesign();
  const { preferences, announceToScreenReader, setLanguage } = useAccessibility();
  
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

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
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

  const handleLogout = async () => {
    try {
      await signOut();
      announceToScreenReader('Successfully signed out');
      navigate('/');
    } catch (error) {
      announceToScreenReader('Error signing out');
    }
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    announceToScreenReader(`Language changed to ${lang === 'en' ? 'English' : lang === 'he' ? 'Hebrew' : 'Arabic'}`);
  };

  // Navigation structure based on auth status
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/features', label: 'Features', icon: BookOpen },
    { path: '/pricing', label: 'Pricing', icon: BarChart3 },
    { path: '/about', label: 'About', icon: Users }
  ];

  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/save', label: 'Save Content', icon: Plus },
    { path: '/collections', label: 'Collections', icon: BookOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const currentNavItems = isLoggedIn ? userNavItems : publicNavItems;

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b bg-background/95 backdrop-blur-md",
        scrolled && "shadow-sm",
        preferences.highContrast && "border-2 border-foreground",
        "supports-[backdrop-filter]:bg-background/60"
      )}
      role="banner"
      dir={preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            )}
            aria-label="Accio - Your Knowledge Library - Go to homepage"
            onClick={() => announceToScreenReader('Navigating to homepage')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-primary leading-none">Accio</span>
              <span className="text-sm text-muted-foreground leading-none">Knowledge Library</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-1" 
            role="navigation" 
            aria-label="Main navigation"
          >
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActiveLink(item.path) 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground"
                )}
                aria-current={isActiveLink(item.path) ? 'page' : undefined}
                onClick={() => announceToScreenReader(`Navigating to ${item.label}`)}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Change language"
                >
                  <Languages className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs uppercase">
                    {preferences.language}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('he')}>
                  עברית
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
            
            {isLoggedIn ? (
              <>
                {/* Quick Search Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate('/search');
                    announceToScreenReader('Opening search page');
                  }}
                  className="hidden sm:flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Search your content"
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden lg:inline">Search</span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={`User menu for ${user?.email || 'user'}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                      {user?.email || 'User'}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    navigate('/login');
                    announceToScreenReader('Opening sign in page');
                  }}
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    navigate('/register');
                    announceToScreenReader('Opening sign up page');
                  }}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Try Demo
                </Button>
              </div>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side={preferences.language === 'he' || preferences.language === 'ar' ? 'left' : 'right'} 
                className="w-[300px]"
                id="mobile-navigation"
              >
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6" role="navigation" aria-label="Mobile navigation">
                  {currentNavItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isActiveLink(item.path) 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-accent"
                      )}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        announceToScreenReader(`Navigating to ${item.label}`);
                      }}
                      aria-current={isActiveLink(item.path) ? 'page' : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                  
                  {/* Mobile-only additional options */}
                  {isLoggedIn && (
                    <>
                      <Link 
                        to="/search"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          announceToScreenReader('Opening search page');
                        }}
                      >
                        <Search className="h-5 w-5" />
                        Search
                      </Link>
                      <Link 
                        to="/settings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          announceToScreenReader('Opening settings page');
                        }}
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                    </>
                  )}
                  
                  {!isLoggedIn && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button 
                        onClick={() => { 
                          navigate('/register'); 
                          setMobileMenuOpen(false);
                          announceToScreenReader('Opening sign up page');
                        }}
                        className="justify-start"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Try Demo
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => { 
                          navigate('/login'); 
                          setMobileMenuOpen(false);
                          announceToScreenReader('Opening sign in page');
                        }}
                        className="justify-start"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </div>
                  )}

                  {isLoggedIn && (
                    <div className="pt-4 border-t">
                      <Button 
                        variant="destructive" 
                        onClick={handleLogout}
                        className="w-full justify-start"
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

export default MainNavigation;

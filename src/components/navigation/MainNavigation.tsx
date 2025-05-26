
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Save, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Globe,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { copy } from '@/utils/copy';

const MainNavigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { preferences, updatePreferences, announceToScreenReader } = useAccessibility();
  const isLoggedIn = !!user;

  // Handle scroll effect
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

  // Navigation items
  const navigationItems = [
    { 
      path: '/', 
      label: copy.nav.home || 'Home', 
      icon: Home, 
      requiresAuth: false 
    },
    { 
      path: '/dashboard', 
      label: copy.nav.dashboard, 
      icon: Home, 
      requiresAuth: true 
    },
    { 
      path: '/save', 
      label: copy.nav.saveContent, 
      icon: Save, 
      requiresAuth: true 
    },
    { 
      path: '/collections', 
      label: copy.nav.collections, 
      icon: BookOpen, 
      requiresAuth: true 
    },
    { 
      path: '/analytics', 
      label: copy.nav.analytics, 
      icon: BarChart3, 
      requiresAuth: true 
    }
  ];

  const visibleItems = navigationItems.filter(item => 
    !item.requiresAuth || isLoggedIn
  );

  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    announceToScreenReader(
      newState ? 'Navigation menu opened' : 'Navigation menu closed'
    );
  };

  const handleSignOut = async () => {
    await signOut();
    announceToScreenReader('Successfully signed out');
    navigate('/');
  };

  const handleLanguageChange = (lang: 'en' | 'he' | 'ar') => {
    updatePreferences({ language: lang });
    announceToScreenReader(`Language changed to ${lang === 'en' ? 'English' : lang === 'he' ? 'Hebrew' : 'Arabic'}`);
  };

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : 'bg-background border-transparent',
        preferences.highContrast && "border-2 border-foreground"
      )}
      role="banner"
      dir={preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 transition-all duration-200 hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
            )}
            aria-label="Accio - Go to homepage"
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
            <ul className="flex items-center gap-1" role="menubar">
              {visibleItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveLink(item.path) 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    aria-current={isActiveLink(item.path) ? 'page' : undefined}
                    tabIndex={0}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hidden sm:flex items-center gap-2"
                  aria-label="Change language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase text-xs">{preferences.language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('he')}>
                  🇮🇱 עברית
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  🇸🇦 العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ModeToggle />
            
            {/* User Menu or Auth Buttons */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.email?.split('@')[0] || 'User'}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{copy.buttons.signIn}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">{copy.buttons.getStarted}</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={handleMobileMenuToggle}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="md:hidden border-t bg-background py-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2 px-2" role="menu">
              {visibleItems.map((item) => (
                <li key={item.path} role="none">
                  <Link 
                    to={item.path}
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveLink(item.path) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActiveLink(item.path) ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              
              {/* Mobile Auth Buttons */}
              {!isLoggedIn && (
                <li role="none" className="pt-4 border-t space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => { 
                      navigate('/register'); 
                      setMobileMenuOpen(false); 
                    }}
                  >
                    {copy.buttons.getStarted}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => { 
                      navigate('/login'); 
                      setMobileMenuOpen(false); 
                    }}
                  >
                    {copy.buttons.signIn}
                  </Button>
                </li>
              )}

              {/* Mobile Language Options */}
              <li role="none" className="pt-4 border-t">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground px-3">Language</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={preferences.language === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleLanguageChange('en')}
                      className="text-xs"
                    >
                      🇺🇸 EN
                    </Button>
                    <Button
                      variant={preferences.language === 'he' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleLanguageChange('he')}
                      className="text-xs"
                    >
                      🇮🇱 HE
                    </Button>
                    <Button
                      variant={preferences.language === 'ar' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleLanguageChange('ar')}
                      className="text-xs"
                    >
                      🇸🇦 AR
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;

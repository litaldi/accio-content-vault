
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Menu, X, Home, BookOpen, Search, Settings, LogOut, Plus, BarChart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import SkipToContent from '@/components/SkipToContent';

const SimplifiedNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { preferences } = useAccessibility();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();
  
  // Handle scroll effect
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  // Core navigation items - simplified and prioritized
  const primaryNavItems = isLoggedIn ? [
    { path: '/dashboard', label: 'Home', icon: Home, description: 'Your saved content' },
    { path: '/save', label: 'Save', icon: Plus, description: 'Add new content' },
    { path: '/collections', label: 'Collections', icon: BookOpen, description: 'Organize content' },
    { path: '/analytics', label: 'Insights', icon: BarChart, description: 'Usage analytics' }
  ] : [
    { path: '/features', label: 'Features', icon: BookOpen, description: 'What we offer' },
    { path: '/pricing', label: 'Pricing', icon: BarChart, description: 'Simple plans' }
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <SkipToContent />
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          scrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-border' 
            : 'bg-background border-transparent',
          preferences.highContrast && 'border-foreground bg-background'
        )}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={cn(
                "flex items-center gap-2 sm:gap-3 transition-all duration-200 hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1",
                preferences.highContrast && 'focus-visible:ring-offset-background'
              )}
              aria-label="Accio - Go to homepage"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-primary-foreground font-bold text-lg sm:text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-primary leading-none">Accio</span>
                  <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Library</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Clean and minimal */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" role="navigation" aria-label="Main navigation">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActiveLink(item.path) 
                      ? "bg-accent text-accent-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActiveLink(item.path) ? 'page' : undefined}
                  title={item.description}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              ))}
            </nav>
          )}
          
          {/* Right side actions - Responsive spacing */}
          <div className="flex items-center gap-1 sm:gap-2">
            <AccessibilityButton />
            <ModeToggle />
            
            {/* User menu or auth buttons */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
                    aria-label="User account menu"
                  >
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/save')} className="cursor-pointer">
                    <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                    Save Content
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer">
                    <BarChart className="mr-2 h-4 w-4" aria-hidden="true" />
                    Insights
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="text-sm px-3"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="text-sm px-3"
                >
                  Get Started
                </Button>
              </div>
            )}
            
            {/* Mobile menu trigger */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">A</span>
                      </div>
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6" role="navigation" aria-label="Mobile navigation">
                    {/* Home link for non-authenticated users */}
                    {!isLoggedIn && (
                      <Link 
                        to="/" 
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink('/') && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink('/') ? 'page' : undefined}
                      >
                        <Home className="h-5 w-5" aria-hidden="true" />
                        <div className="flex flex-col">
                          <span className="font-medium">Home</span>
                          <span className="text-xs text-muted-foreground">Back to homepage</span>
                        </div>
                      </Link>
                    )}
                    
                    {/* Primary navigation items */}
                    {primaryNavItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink(item.path) && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink(item.path) ? 'page' : undefined}
                      >
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </Link>
                    ))}
                    
                    {/* Settings for authenticated users */}
                    {isLoggedIn && (
                      <Link 
                        to="/settings" 
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink('/settings') && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink('/settings') ? 'page' : undefined}
                      >
                        <Settings className="h-5 w-5" aria-hidden="true" />
                        <div className="flex flex-col">
                          <span className="font-medium">Settings</span>
                          <span className="text-xs text-muted-foreground">Account preferences</span>
                        </div>
                      </Link>
                    )}
                    
                    {/* Auth section */}
                    {!isLoggedIn ? (
                      <div className="flex flex-col gap-2 pt-4 border-t">
                        <Button 
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start"
                        >
                          Get Started
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-start"
                        >
                          Sign In
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4 border-t">
                        <Button 
                          variant="ghost" 
                          onClick={handleLogout}
                          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                          Sign Out
                        </Button>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default SimplifiedNavbar;

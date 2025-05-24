
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Menu, X, ChevronDown, Home, BookOpen, Users, BarChart, Settings, LogOut } from 'lucide-react';
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

const MainNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { preferences } = useAccessibility();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();
  
  // Handle scroll effect for navbar with performance optimization
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

  // Navigation links based on authentication state
  const publicLinks = [
    { path: '/about', label: 'About', icon: BookOpen },
    { path: '/features', label: 'Features', icon: Users },
    { path: '/pricing', label: 'Pricing', icon: BarChart },
    { path: '/contact', label: 'Contact', icon: Settings }
  ];

  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/collections', label: 'Collections', icon: BookOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const currentLinks = isLoggedIn ? privateLinks : publicLinks;

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
        <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={cn(
                "flex items-center gap-3 transition-all duration-200 hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1",
                preferences.highContrast && 'focus-visible:ring-offset-background'
              )}
              aria-label="Accio - Go to homepage"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary leading-none">Accio</span>
                  <span className="text-xs text-muted-foreground leading-none">Knowledge Library</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
              <ul className="flex items-center gap-1" role="list">
                {currentLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isActiveLink(link.path) 
                          ? "bg-accent text-accent-foreground" 
                          : "text-muted-foreground"
                      )}
                      aria-current={isActiveLink(link.path) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                
                {/* Features Dropdown */}
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="More options"
                      >
                        More
                        <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {!isLoggedIn ? (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/blog">Blog</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/faq">FAQ</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/privacy">Privacy Policy</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/terms">Terms of Service</Link>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/playground">Playground</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/save">Save Content</Link>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </nav>
          )}
          
          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <AccessibilityButton />
            <ModeToggle />
            
            {/* User menu or auth buttons */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/collections')}>
                    <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                    Collections
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/analytics')}>
                    <BarChart className="mr-2 h-4 w-4" aria-hidden="true" />
                    Analytics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="text-sm"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="text-sm"
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
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6" role="navigation" aria-label="Mobile navigation">
                    <Link 
                      to="/" 
                      className={cn(
                        "text-lg font-medium py-2 transition-colors hover:text-primary",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
                        isActiveLink('/') && "text-primary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    
                    {currentLinks.map((link) => (
                      <Link 
                        key={link.path}
                        to={link.path} 
                        className={cn(
                          "flex items-center gap-3 text-base font-medium py-2 transition-colors hover:text-primary",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
                          isActiveLink(link.path) && "text-primary"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink(link.path) ? 'page' : undefined}
                      >
                        <link.icon className="h-4 w-4" aria-hidden="true" />
                        {link.label}
                      </Link>
                    ))}
                    
                    {/* Mobile auth section */}
                    {!isLoggedIn ? (
                      <div className="flex flex-col gap-2 pt-4 border-t">
                        <Button 
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full"
                        >
                          Get Started
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full"
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

export default MainNavbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import EnhancedAccessibilityButton from '@/components/accessibility/EnhancedAccessibilityButton';
import { Menu, X, Home, BookOpen, BarChart, Users, Settings, LogOut, Plus, Candy } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

const UnifiedNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsiveDesign();
  
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

  const { preferences } = useAccessibility();
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
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Unified navigation structure
  const publicNavItems = [
    { path: '/features', label: 'Features', icon: BookOpen },
    { path: '/pricing', label: 'Pricing', icon: BarChart },
    { path: '/about', label: 'About', icon: Users },
    { path: '/faq', label: 'FAQ', icon: BookOpen }
  ];

  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/save', label: 'Save Content', icon: Plus },
    { path: '/collections', label: 'Collections', icon: BookOpen },
    { path: '/analytics', label: 'Analytics', icon: BarChart }
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
        preferences.highContrast && "border-foreground"
      )}
      role="banner"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 transition-all duration-200 hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
            )}
            aria-label="Accio - Your Knowledge Library"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-primary leading-none">Accio</span>
              <span className="text-sm text-muted-foreground leading-none">Knowledge Library</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1" role="navigation">
              {currentNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActiveLink(item.path) 
                      ? "bg-primary/10 text-primary border-b-2 border-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-current={isActiveLink(item.path) ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          
          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Candy Button - moved to main navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
              aria-label="Special features"
            >
              <Candy className="h-5 w-5" />
            </Button>

            <ModeToggle />
            <EnhancedAccessibilityButton />
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                >
                  Get Started
                </Button>
              </div>
            )}
            
            {/* Mobile Menu */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    aria-label="Navigation menu"
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6">
                    {currentNavItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all",
                          "focus-visible:ring-2 focus-visible:ring-primary",
                          isActiveLink(item.path) 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-accent"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                    
                    {!isLoggedIn && (
                      <div className="flex flex-col gap-2 pt-4 border-t">
                        <Button onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}>
                          Get Started
                        </Button>
                        <Button variant="outline" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                          Sign In
                        </Button>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UnifiedNavigation;

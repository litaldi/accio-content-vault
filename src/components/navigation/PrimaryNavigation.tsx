
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import EnhancedAccessibilityButton from '@/components/accessibility/EnhancedAccessibilityButton';
import { Menu, X, Home, Search, BarChart, Settings, LogOut, Plus, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const PrimaryNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navigationLinks = isLoggedIn ? [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/analytics', label: 'Analytics', icon: BarChart }
  ] : [
    { path: '/features', label: 'Features', icon: BookOpen },
    { path: '/pricing', label: 'Pricing', icon: BarChart },
    { path: '/about', label: 'About', icon: Settings }
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : 'bg-background border-transparent'
      )}
      role="banner"
      id="navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          aria-label="Accio - Your Knowledge Library"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <h1 className="text-lg font-bold text-primary leading-none mb-0">Accio</h1>
            <p className="text-sm text-muted-foreground leading-none">Knowledge Library</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isActiveLink(link.path) 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActiveLink(link.path) ? 'page' : undefined}
            >
              <link.icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Accessibility & Theme Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <EnhancedAccessibilityButton />
            <ModeToggle />
          </div>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
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
                className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Get Started
              </Button>
            </div>
          )}
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6" role="navigation" aria-label="Mobile navigation">
                {/* Mobile Accessibility & Theme Controls */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-sm font-medium">Preferences</span>
                  <div className="flex items-center gap-2">
                    <EnhancedAccessibilityButton />
                    <ModeToggle />
                  </div>
                </div>

                {navigationLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all",
                      "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isActiveLink(link.path) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                
                {!isLoggedIn && (
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button 
                      onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PrimaryNavigation;


import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Menu, X, ChevronDown, Home, BookOpen, Users, BarChart, Settings, LogOut, Search, Plus } from 'lucide-react';
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

  // Enhanced navigation links for better prominence
  const publicLinks = [
    { path: '/features', label: 'Features', icon: BookOpen, description: 'Explore our tools' },
    { path: '/pricing', label: 'Pricing', icon: BarChart, description: 'Simple plans' },
    { path: '/about', label: 'About', icon: Users, description: 'Our story' }
  ];

  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, description: 'Your content hub' },
    { path: '/save', label: 'Save Content', icon: Plus, description: 'Add new items' },
    { path: '/collections', label: 'Collections', icon: BookOpen, description: 'Organize content' },
    { path: '/analytics', label: 'Analytics', icon: BarChart, description: 'Usage insights' }
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

          {/* Enhanced Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Main navigation">
              <div className="flex items-center gap-1">
                {currentLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "group flex flex-col items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground min-w-[100px]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveLink(link.path) 
                        ? "bg-accent text-accent-foreground shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={isActiveLink(link.path) ? 'page' : undefined}
                  >
                    <link.icon className="h-4 w-4 mb-1" aria-hidden="true" />
                    <span className="text-xs font-medium">{link.label}</span>
                    {!isActiveLink(link.path) && (
                      <span className="text-[10px] text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        {link.description}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Enhanced More Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "group flex flex-col items-center px-4 py-2 text-sm font-medium min-w-[100px]",
                        "text-muted-foreground hover:text-foreground hover:bg-accent",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      )}
                      aria-label="More navigation options"
                    >
                      <ChevronDown className="h-4 w-4 mb-1" aria-hidden="true" />
                      <span className="text-xs font-medium">More</span>
                      <span className="text-[10px] text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        Additional pages
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
                    {!isLoggedIn ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/contact" className="cursor-pointer flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Contact Us
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/faq" className="cursor-pointer flex items-center">
                            <BookOpen className="mr-2 h-4 w-4" />
                            FAQ
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/blog" className="cursor-pointer flex items-center">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Blog
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/privacy" className="cursor-pointer text-sm">Privacy Policy</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/terms" className="cursor-pointer text-sm">Terms of Service</Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/playground" className="cursor-pointer flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            Playground
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings" className="cursor-pointer flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
                    aria-label="User account menu"
                  >
                    <Avatar className="h-8 w-8 transition-transform hover:scale-105">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/save')} className="cursor-pointer">
                    <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                    Save Content
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/collections')} className="cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                    Collections
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer">
                    <BarChart className="mr-2 h-4 w-4" aria-hidden="true" />
                    Analytics
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
            
            {/* Enhanced Mobile menu trigger */}
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
                    
                    {/* Enhanced mobile navigation items */}
                    {currentLinks.map((link) => (
                      <Link 
                        key={link.path}
                        to={link.path} 
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink(link.path) && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink(link.path) ? 'page' : undefined}
                      >
                        <link.icon className="h-5 w-5" aria-hidden="true" />
                        <div className="flex flex-col">
                          <span className="font-medium">{link.label}</span>
                          <span className="text-xs text-muted-foreground">{link.description}</span>
                        </div>
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

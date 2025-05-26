
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ImprovedAccessibilityButton from '@/components/accessibility/ImprovedAccessibilityButton';
import FeedbackSystem from '@/components/feedback/FeedbackSystem';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Plus, 
  Search,
  BarChart3, 
  Settings,
  LogOut,
  Star,
  Users,
  Mail,
  DollarSign,
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const PrimaryNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { preferences } = useAccessibility();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();

  // Optimized scroll handler with RAF
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled(isScrolled);
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

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  // Centralized navigation items
  const publicNavItems: NavigationItem[] = [
    { path: '/features', label: 'Features', icon: Star, description: 'Explore all features' },
    { path: '/pricing', label: 'Pricing', icon: DollarSign, description: 'Simple plans' },
    { path: '/about', label: 'About', icon: Info, description: 'Our story' },
    { path: '/contact', label: 'Contact', icon: Mail, description: 'Get in touch' }
  ];

  const authenticatedNavItems: NavigationItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, description: 'Your overview' },
    { path: '/save', label: 'Save', icon: Plus, description: 'Save content' },
    { path: '/search', label: 'Search', icon: Search, description: 'Find content' },
    { path: '/collections', label: 'Collections', icon: BookOpen, description: 'Organize content' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, description: 'View insights' }
  ];

  const currentNavItems = isLoggedIn ? authenticatedNavItems : publicNavItems;

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
          preferences.highContrast && 'border-foreground'
        )}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav 
            className="flex h-16 items-center justify-between"
            role="navigation"
            aria-label="Primary navigation"
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
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-2xl font-bold text-primary leading-none">Accio</span>
                <span className="text-xs text-muted-foreground leading-none">Knowledge Library</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {currentNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground min-h-[44px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActiveLink(item.path) 
                      ? "bg-accent text-accent-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActiveLink(item.path) ? 'page' : undefined}
                  title={item.description}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Controls - Positioned on the right */}
              <div className="hidden sm:flex items-center gap-1">
                <FeedbackSystem />
                <ModeToggle />
                <ImprovedAccessibilityButton />
              </div>

              {/* User Account or Auth */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "relative h-10 w-10 rounded-full transition-all duration-200",
                        "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      )}
                      aria-label="Open user menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-background border shadow-xl z-50"
                    sideOffset={8}
                  >
                    <DropdownMenuLabel className="font-medium">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
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
                    className="text-sm font-medium px-4 min-h-[44px]"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="text-sm font-medium px-4 min-h-[44px]"
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
                    className={cn(
                      "md:hidden h-10 w-10 transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
                  className="w-[300px] bg-background border-l overflow-y-auto"
                >
                  <SheetHeader className="text-left border-b pb-4 mb-6">
                    <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">A</span>
                      </div>
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                    {/* Home link for guests */}
                    {!isLoggedIn && (
                      <Link 
                        to="/" 
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                          "hover:bg-accent min-h-[60px]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink('/') && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink('/') ? 'page' : undefined}
                      >
                        <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium">Home</span>
                          <span className="text-xs text-muted-foreground">Back to homepage</span>
                        </div>
                      </Link>
                    )}
                    
                    {/* Navigation items */}
                    {currentNavItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                          "hover:bg-accent min-h-[60px]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink(item.path) && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink(item.path) ? 'page' : undefined}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Mobile Theme Controls */}
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t">
                    <FeedbackSystem />
                    <ModeToggle />
                    <ImprovedAccessibilityButton />
                  </div>
                  
                  {/* Mobile Auth Section */}
                  <div className="mt-6 pt-6 border-t">
                    {!isLoggedIn ? (
                      <div className="flex flex-col gap-3">
                        <Button 
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-center min-h-[48px]"
                        >
                          Get Started
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full justify-center min-h-[48px]"
                        >
                          Sign In
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 min-h-[48px]"
                      >
                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Sign Out
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default PrimaryNavigation;


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { EnhancedButton } from '@/components/ui/enhanced-button';
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
  ChevronDown
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
  description: string;
  badge?: string;
}

const ImprovedNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { preferences } = useAccessibility();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();

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

  const publicNavItems: NavigationItem[] = [
    { 
      path: '/features', 
      label: 'Features', 
      icon: Star, 
      description: 'Discover powerful tools',
      badge: 'New'
    },
    { 
      path: '/pricing', 
      label: 'Pricing', 
      icon: BarChart3, 
      description: 'Simple, transparent plans'
    },
    { 
      path: '/about', 
      label: 'About', 
      icon: Users, 
      description: 'Our mission and team'
    },
    { 
      path: '/contact', 
      label: 'Contact', 
      icon: Mail, 
      description: 'Get in touch with us'
    }
  ];

  const authenticatedNavItems: NavigationItem[] = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      description: 'Your content overview'
    },
    { 
      path: '/save', 
      label: 'Save', 
      icon: Plus, 
      description: 'Add new content'
    },
    { 
      path: '/search', 
      label: 'Search', 
      icon: Search, 
      description: 'Find your content'
    },
    { 
      path: '/collections', 
      label: 'Collections', 
      icon: BookOpen, 
      description: 'Organize your library'
    },
    { 
      path: '/analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      description: 'Usage insights'
    }
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
          "sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-lg",
          scrolled 
            ? 'bg-background/95 shadow-lg border-border/50' 
            : 'bg-background/80 border-transparent',
          preferences.highContrast && 'border-foreground bg-background'
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
            {/* Enhanced Logo */}
            <Link 
              to="/" 
              className={cn(
                "flex items-center gap-3 transition-all duration-200 hover:opacity-90 rounded-lg p-2 -ml-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "group"
              )}
              aria-label="Accio - Go to homepage"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-2xl font-bold text-primary leading-none group-hover:text-primary/90 transition-colors">
                  Accio
                </span>
                <span className="text-xs text-muted-foreground leading-none">
                  Knowledge Library
                </span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {currentNavItems.slice(0, 4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "group flex flex-col items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent/80 hover:text-accent-foreground min-w-[90px] relative",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActiveLink(item.path) 
                      ? "bg-accent text-accent-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActiveLink(item.path) ? 'page' : undefined}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity text-center leading-tight">
                    {item.description}
                  </span>
                </Link>
              ))}
              
              {/* More Dropdown */}
              {currentNavItems.length > 4 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EnhancedButton 
                      variant="ghost" 
                      size="sm"
                      className="flex flex-col items-center px-4 py-3 min-w-[90px] h-auto"
                      aria-label="More navigation options"
                    >
                      <ChevronDown className="h-4 w-4 mb-1" aria-hidden="true" />
                      <span className="text-xs">More</span>
                    </EnhancedButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-lg border shadow-xl">
                    {currentNavItems.slice(4).map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link to={item.path} className="cursor-pointer flex items-center gap-3 py-3">
                          <item.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <AccessibilityButton />
                <ModeToggle />
              </div>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EnhancedButton 
                      variant="ghost" 
                      size="icon"
                      className="relative h-10 w-10 rounded-full hover:scale-105"
                      aria-label="Open user menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </EnhancedButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-64 bg-background/95 backdrop-blur-lg border shadow-xl"
                    sideOffset={8}
                  >
                    <DropdownMenuLabel className="font-medium">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer py-3">
                      <Settings className="mr-3 h-4 w-4" aria-hidden="true" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer text-destructive focus:text-destructive py-3"
                    >
                      <LogOut className="mr-3 h-4 w-4" aria-hidden="true" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <EnhancedButton 
                    variant="ghost" 
                    onClick={() => navigate('/login')}
                    className="font-medium"
                  >
                    Sign In
                  </EnhancedButton>
                  <EnhancedButton 
                    onClick={() => navigate('/register')}
                    className="font-medium shadow-lg"
                  >
                    Get Started
                  </EnhancedButton>
                </div>
              )}

              {/* Enhanced Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <EnhancedButton 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    )}
                  </EnhancedButton>
                </SheetTrigger>
                
                <SheetContent 
                  side="right" 
                  className="w-[320px] bg-background/95 backdrop-blur-lg border-l overflow-y-auto"
                >
                  <SheetHeader className="text-left border-b pb-6 mb-6">
                    <SheetTitle className="flex items-center gap-3 text-lg font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">A</span>
                      </div>
                      Navigation Menu
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                    {!isLoggedIn && (
                      <Link 
                        to="/" 
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
                          "hover:bg-accent active:scale-95 min-h-[70px] group",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink('/') && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink('/') ? 'page' : undefined}
                      >
                        <Home className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-base">Home</span>
                          <span className="text-sm text-muted-foreground">Back to homepage</span>
                        </div>
                      </Link>
                    )}
                    
                    {currentNavItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
                          "hover:bg-accent active:scale-95 min-h-[70px] group",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          isActiveLink(item.path) && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={isActiveLink(item.path) ? 'page' : undefined}
                      >
                        <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{item.description}</span>
                        </div>
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex items-center gap-3 mt-8 pt-6 border-t">
                    <AccessibilityButton />
                    <ModeToggle />
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    {!isLoggedIn ? (
                      <div className="flex flex-col gap-3">
                        <EnhancedButton 
                          fullWidth
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                          size="lg"
                        >
                          Get Started Free
                        </EnhancedButton>
                        <EnhancedButton 
                          variant="outline" 
                          fullWidth
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                          size="lg"
                        >
                          Sign In
                        </EnhancedButton>
                      </div>
                    ) : (
                      <EnhancedButton 
                        variant="ghost" 
                        fullWidth
                        onClick={handleLogout}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 justify-start"
                        size="lg"
                      >
                        <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                        Sign Out
                      </EnhancedButton>
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

export default ImprovedNavigation;

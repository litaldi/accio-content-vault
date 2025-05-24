
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { 
  Home, 
  BookOpen, 
  Search, 
  Settings, 
  Plus, 
  BarChart3, 
  Menu, 
  X, 
  LogOut,
  User,
  Archive
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

interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const MainMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { preferences } = useAccessibility();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();

  // Enhanced scroll effect with performance optimization
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Clear, prioritized menu items
  const publicMenuItems: MenuItem[] = [
    {
      path: '/features',
      label: 'Features',
      icon: BookOpen,
      description: 'Explore what Accio can do',
      priority: 'high'
    },
    {
      path: '/pricing',
      label: 'Pricing',
      icon: BarChart3,
      description: 'Simple, transparent plans',
      priority: 'high'
    }
  ];

  const authenticatedMenuItems: MenuItem[] = [
    {
      path: '/dashboard',
      label: 'Home',
      icon: Home,
      description: 'Your content dashboard',
      priority: 'high'
    },
    {
      path: '/save',
      label: 'Save',
      icon: Plus,
      description: 'Save new content',
      priority: 'high'
    },
    {
      path: '/collections',
      label: 'Collections',
      icon: Archive,
      description: 'Organize your content',
      priority: 'medium'
    },
    {
      path: '/analytics',
      label: 'Insights',
      icon: BarChart3,
      description: 'View your analytics',
      priority: 'medium'
    }
  ];

  const currentMenuItems = isLoggedIn ? authenticatedMenuItems : publicMenuItems;
  const highPriorityItems = currentMenuItems.filter(item => item.priority === 'high');

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl shadow-lg border-border/50' 
          : 'bg-background/80 backdrop-blur-sm border-transparent',
        preferences.highContrast && 'border-foreground bg-background'
      )}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Logo - Enhanced for all screen sizes */}
        <div className="flex items-center min-w-0">
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-2 sm:gap-3 transition-all duration-200 hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1",
              "group"
            )}
            aria-label="Accio - Go to homepage"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-lg sm:text-xl">A</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold text-primary leading-none truncate">Accio</span>
                <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Library</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Clean and prioritized */}
        <nav 
          className="hidden md:flex items-center gap-1 lg:gap-2" 
          role="navigation" 
          aria-label="Primary navigation"
        >
          {highPriorityItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-accent/80 hover:text-accent-foreground hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "active:scale-95",
                isActiveLink(item.path) 
                  ? "bg-primary/10 text-primary shadow-sm border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActiveLink(item.path) ? 'page' : undefined}
              title={item.description}
            >
              <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Actions - Clean and accessible */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme and Accessibility Controls */}
          <div className="hidden sm:flex items-center gap-1">
            <AccessibilityButton />
            <ModeToggle />
          </div>

          {/* User Account or Auth */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "relative h-9 w-9 rounded-full transition-all duration-200",
                    "hover:scale-105 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                className="w-56 bg-background/95 backdrop-blur-sm border shadow-xl"
                sideOffset={8}
              >
                <DropdownMenuLabel className="font-medium">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Quick Actions */}
                <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/save')} className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Save Content</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/collections')} className="cursor-pointer">
                  <Archive className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Collections</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-sm font-medium px-4 hover:scale-105 transition-transform"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="text-sm font-medium px-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "md:hidden h-9 w-9 transition-all duration-200",
                  "hover:bg-accent hover:scale-105 active:scale-95",
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
              className="w-[320px] sm:w-[350px] bg-background/95 backdrop-blur-xl border-l"
            >
              <SheetHeader className="text-left border-b pb-4 mb-6">
                <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
                  <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">A</span>
                  </div>
                  Navigation
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
                
                {/* Home link for guests */}
                {!isLoggedIn && (
                  <Link 
                    to="/" 
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                      "hover:bg-accent/80 active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveLink('/') && "bg-primary/10 text-primary border border-primary/20"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActiveLink('/') ? 'page' : undefined}
                  >
                    <Home className="h-5 w-5" aria-hidden="true" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium">Home</span>
                      <span className="text-xs text-muted-foreground">Back to homepage</span>
                    </div>
                  </Link>
                )}
                
                {/* All menu items for mobile */}
                {currentMenuItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                      "hover:bg-accent/80 active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveLink(item.path) && "bg-primary/10 text-primary border border-primary/20"
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
                
                {/* Settings for authenticated users */}
                {isLoggedIn && (
                  <Link 
                    to="/settings" 
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                      "hover:bg-accent/80 active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveLink('/settings') && "bg-primary/10 text-primary border border-primary/20"
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
              </nav>
              
              {/* Mobile Theme Controls */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t">
                <AccessibilityButton />
                <ModeToggle />
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
                      className="w-full justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-center"
                    >
                      Sign In
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sign Out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainMenu;

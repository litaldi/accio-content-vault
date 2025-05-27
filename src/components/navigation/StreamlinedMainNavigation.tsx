
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import { 
  Menu, 
  X, 
  Home, 
  Search,
  FolderOpen, 
  BarChart3, 
  Settings, 
  Brain,
  LogOut,
  LogIn,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Plus,
  CreditCard,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  requiresAuth?: boolean;
  exactMatch?: boolean;
}

const StreamlinedMainNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Keyboard navigation for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out",
        description: "Thanks for using Accio. Come back soon!",
      });
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const isActiveRoute = (path: string, exactMatch = false) => {
    if (exactMatch || path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Streamlined navigation - clear hierarchy
  const publicNavItems: NavItem[] = [
    { to: '/', label: 'Home', icon: Home, exactMatch: true },
    { to: '/features', label: 'Features', icon: Zap },
    { to: '/pricing', label: 'Pricing', icon: CreditCard },
  ];

  const authenticatedNavItems: NavItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3, requiresAuth: true },
    { to: '/search', label: 'Search', icon: Search, requiresAuth: true },
    { to: '/saved', label: 'Collections', icon: FolderOpen, requiresAuth: true },
  ];

  const currentNavItems = user ? [...publicNavItems.slice(0, 1), ...authenticatedNavItems] : publicNavItems;

  const handleQuickStart = () => {
    if (user) {
      navigate('/save');
      toast({
        title: "Ready to capture knowledge",
        description: "Save anything and let AI organize it for you.",
      });
    } else {
      navigate('/register');
    }
  };

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          scrolled && "shadow-lg"
        )}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-1"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Accio - Your Knowledge Sanctuary - Go to homepage"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
                Accio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
              {currentNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground hover:scale-105",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    isActiveRoute(item.to, item.exactMatch) 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActiveRoute(item.to, item.exactMatch) ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <AccessibilityButton variant="header" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="gap-2"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Moon className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>

              {/* Auth Actions */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleQuickStart}
                    className="gap-2"
                    title="Quick capture content"
                    aria-label="Quick capture content"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden xl:inline">Quick Save</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-2"
                    title="Profile and settings"
                  >
                    <Link to="/settings">
                      <User className="h-4 w-4" />
                      <span className="hidden xl:inline">Profile</span>
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden xl:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleQuickStart}
                    className="gap-2 bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Sparkles className="h-4 w-4" />
                    Start Now
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <AccessibilityButton variant="header" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xl animate-fade-in"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Main Navigation */}
              <div>
                <nav className="space-y-2" role="none">
                  {currentNavItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-base",
                        "hover:bg-accent hover:text-accent-foreground hover:scale-105",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                        isActiveRoute(item.to, item.exactMatch) 
                          ? "bg-primary text-primary-foreground shadow-lg" 
                          : "text-foreground hover:bg-muted"
                      )}
                      aria-current={isActiveRoute(item.to, item.exactMatch) ? 'page' : undefined}
                      role="menuitem"
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleQuickStart}
                      className="w-full justify-start gap-3 h-12"
                    >
                      <Plus className="h-5 w-5" />
                      Quick Save Content
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-12"
                      asChild
                    >
                      <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                        <User className="h-5 w-5" />
                        Profile & Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start gap-3 h-12 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3 h-12"
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleQuickStart();
                      }}
                      className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-lg"
                    >
                      <Sparkles className="h-5 w-5" />
                      Start Now - It's Free
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default StreamlinedMainNavigation;

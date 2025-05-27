
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
  Brain,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Plus,
  User,
  HelpCircle
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

  // Unified navigation items for all users
  const mainNavItems: NavItem[] = [
    { to: '/', label: 'Home', icon: Home, exactMatch: true },
    ...(user ? [
      { to: '/dashboard', label: 'Dashboard', icon: BarChart3, requiresAuth: true },
      { to: '/search', label: 'Search', icon: Search, requiresAuth: true },
      { to: '/saved', label: 'Collections', icon: FolderOpen, requiresAuth: true },
      { to: '/save', label: 'Quick Capture', icon: Plus, requiresAuth: true },
      { to: '/ai-features', label: 'AI Assistant', icon: Brain, requiresAuth: true },
    ] : [
      { to: '/features', label: 'Features', icon: Sparkles },
      { to: '/pricing', label: 'Pricing', icon: Brain },
    ]),
    { to: '/help', label: 'Help', icon: HelpCircle },
  ];

  const handleStartNow = () => {
    if (user) {
      navigate('/dashboard');
      toast({
        title: "Welcome back!",
        description: "Continue building your knowledge empire.",
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
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="text-primary font-extrabold">
                Accio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
              {mainNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    isActiveRoute(item.to, item.exactMatch) 
                      ? "bg-primary text-primary-foreground" 
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
                <Button 
                  size="sm" 
                  onClick={handleStartNow}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Now
                </Button>
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
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-base",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                        isActiveRoute(item.to, item.exactMatch) 
                          ? "bg-primary text-primary-foreground" 
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
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleStartNow();
                    }}
                    className="w-full justify-start gap-3 h-12 bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="h-5 w-5" />
                    Start Now - It's Free
                  </Button>
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


import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const StreamlinedMainNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out!",
        description: "Come back soon!",
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

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Streamlined navigation items - removed "More" category
  const navigationItems = [
    { to: '/', label: 'Home', icon: Home, description: 'Welcome home' },
    { to: '/features', label: 'Features', icon: Zap, description: 'Explore capabilities' },
    { to: '/pricing', label: 'Pricing', icon: CreditCard, description: 'View plans' },
    ...(user ? [
      { to: '/dashboard', label: 'Dashboard', icon: BarChart3, description: 'Your workspace' },
      { to: '/search', label: 'Search', icon: Search, description: 'Find content' },
      { to: '/saved', label: 'Saved', icon: FolderOpen, description: 'Your collections' },
      { to: '/settings', label: 'Settings', icon: Settings, description: 'Account settings' }
    ] : [])
  ];

  const handleQuickCapture = () => {
    if (user) {
      navigate('/save');
    } else {
      navigate('/register');
    }
  };

  const handleAIAssistant = () => {
    if (user) {
      navigate('/ai-features');
    } else {
      navigate('/features');
    }
  };

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md transition-all duration-200",
          scrolled && "shadow-md bg-background/98"
        )}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Accio - Go to homepage"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Brain className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Accio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    isActiveRoute(item.to) 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                  title={item.description}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Quick Capture Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleQuickCapture}
                className="gap-2"
                title={user ? "Quick Save Content" : "Get Started to Quick Save"}
                aria-label={user ? "Quick Save Content" : "Get Started to Quick Save"}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Quick Capture</span>
              </Button>

              {/* AI Assistant Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAIAssistant}
                className="gap-2"
                title={user ? "AI Assistant" : "Explore AI Features"}
                aria-label={user ? "AI Assistant" : "Explore AI Features"}
              >
                <Sparkles className="h-4 w-4" />
                <span className="sr-only">AI Assistant</span>
              </Button>

              {/* Accessibility Button */}
              <AccessibilityButton variant="header" />

              {/* Theme Toggle */}
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
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Auth Actions */}
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Quick Actions */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleQuickCapture}
                title={user ? "Quick Save Content" : "Get Started"}
                aria-label={user ? "Quick Save Content" : "Get Started"}
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleAIAssistant}
                title={user ? "AI Assistant" : "AI Features"}
                aria-label={user ? "AI Assistant" : "AI Features"}
              >
                <Sparkles className="h-4 w-4" />
              </Button>

              {/* Mobile Accessibility Button */}
              <AccessibilityButton variant="header" />

              {/* Mobile Theme Toggle */}
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

              {/* Mobile Menu Button */}
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
            className="lg:hidden border-t bg-background shadow-xl animate-fade-in"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  Navigate
                </h3>
                <nav className="space-y-1" role="none">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                        isActiveRoute(item.to) 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                      role="menuitem"
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Additional Links */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  Support
                </h3>
                <nav className="space-y-1" role="none">
                  <a
                    href="mailto:support@accio.app"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <HelpCircle className="h-5 w-5" aria-hidden="true" />
                    <div>
                      <div className="font-medium">Help & Support</div>
                      <div className="text-xs opacity-70">Get assistance</div>
                    </div>
                  </a>
                </nav>
              </div>

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Sparkles className="h-5 w-5" />
                        Get Started Free
                      </Link>
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

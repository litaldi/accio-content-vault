
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
  Plus,
  CreditCard,
  User,
  Sparkles,
  Zap
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

  const handleQuickCapture = () => {
    if (user) {
      navigate('/save');
      toast({
        title: "Quick Capture",
        description: "Save anything and let AI organize it for you.",
      });
    } else {
      navigate('/register');
    }
  };

  const handleAIAssistant = () => {
    if (user) {
      navigate('/ai-features');
      toast({
        title: "AI Assistant",
        description: "Explore AI-powered features to enhance your workflow.",
      });
    } else {
      navigate('/features');
    }
  };

  // Clean navigation - clear hierarchy
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

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 w-full bg-white border-b border-gray-100",
          scrolled && "shadow-sm"
        )}
        role="banner"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo - Lemonade style */}
            <Link 
              to="/" 
              className="flex items-center gap-3 font-bold text-2xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl px-3 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Accio - Your Knowledge Sanctuary - Go to homepage"
            >
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-sm">
                <Brain className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <span className="text-primary font-bold">
                Accio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {currentNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
                    "hover:bg-gray-50 hover:text-primary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    isActiveRoute(item.to, item.exactMatch) 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-gray-600 hover:text-primary"
                  )}
                  aria-current={isActiveRoute(item.to, item.exactMatch) ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions - Clean header placement */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Quick Actions in Header */}
              <div className="flex items-center gap-2">
                <AccessibilityButton variant="header" />
                
                {user && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleQuickCapture}
                      className="gap-2 rounded-2xl"
                      title="Quick Capture - Save content instantly"
                      aria-label="Quick Capture - Save content instantly"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden xl:inline">Quick Capture</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAIAssistant}
                      className="gap-2 rounded-2xl"
                      title="AI Assistant - Explore AI features"
                      aria-label="AI Assistant - Explore AI features"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden xl:inline">AI Assistant</span>
                    </Button>
                  </>
                )}
              </div>

              {/* Auth Actions */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-2 rounded-2xl"
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
                    className="gap-2 rounded-2xl"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden xl:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" asChild className="rounded-2xl">
                    <Link to="/login" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/register')}
                    className="gap-2 rounded-2xl shadow-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get Started
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="rounded-2xl"
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
            className="lg:hidden border-t border-gray-100 bg-white shadow-sm animate-gentle-fade-in"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-6 py-6 space-y-6">
              {/* Main Navigation */}
              <div>
                <nav className="space-y-2" role="none">
                  {currentNavItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-medium text-base",
                        "hover:bg-gray-50 hover:text-primary",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                        isActiveRoute(item.to, item.exactMatch) 
                          ? "bg-primary text-white shadow-sm" 
                          : "text-gray-700 hover:bg-gray-50"
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

              {/* Mobile Quick Actions */}
              {user && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Button
                    variant="outline"
                    onClick={handleQuickCapture}
                    className="w-full justify-start gap-3 h-14 rounded-2xl"
                  >
                    <Plus className="h-5 w-5" />
                    Quick Capture
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAIAssistant}
                    className="w-full justify-start gap-3 h-14 rounded-2xl"
                  >
                    <Sparkles className="h-5 w-5" />
                    AI Assistant
                  </Button>
                </div>
              )}

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                {user ? (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-14 rounded-2xl"
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
                      className="w-full justify-start gap-3 h-14 rounded-2xl hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3 h-14 rounded-2xl"
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
                        navigate('/register');
                      }}
                      className="w-full justify-start gap-3 h-14 rounded-2xl shadow-sm"
                    >
                      <Sparkles className="h-5 w-5" />
                      Get Started - It's Free
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

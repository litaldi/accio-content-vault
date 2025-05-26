
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import { 
  Home, 
  LayoutDashboard,
  Save,
  FolderOpen,
  BarChart3, 
  HelpCircle, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfessionalNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Flat navigation structure - authenticated users
  const authenticatedNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Save Content', path: '/save', icon: Save },
    { name: 'Collections', path: '/collections', icon: FolderOpen },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Help', path: '/help', icon: HelpCircle },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Flat navigation structure - public users
  const publicNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features', icon: Sparkles },
    { name: 'About', path: '/about', icon: User },
    { name: 'Pricing', path: '/pricing', icon: BarChart3 },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  const mainNavItems = user ? authenticatedNavItems : publicNavItems;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleMobileNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
            aria-label="Go to Accio homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">Accio</span>
              <span className="text-xs text-muted-foreground leading-none hidden sm:block">Knowledge Engine</span>
            </div>
          </Link>

          {/* Desktop Navigation - Completely Flat */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Accessibility Button */}
            <AccessibilityButton variant="header" />

            {user ? (
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm font-medium"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <Link to="/register" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Start Now
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu - Completely Flat */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {/* All Navigation Items */}
              {mainNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleMobileNavClick(item.path)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
              ))}
              
              <div className="border-t border-border my-3"></div>
              
              {/* Auth Actions */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleMobileNavClick('/login')}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleMobileNavClick('/register')}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors w-full text-left"
                  >
                    <Sparkles className="h-4 w-4" />
                    Start Now
                  </button>
                </>
              )}

              {/* Accessibility Button for Mobile */}
              <div className="px-3 py-2">
                <AccessibilityButton variant="header" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfessionalNavigation;

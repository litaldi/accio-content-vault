
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  FolderOpen, 
  BookmarkPlus, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  LogIn,
  Sparkles,
  Brain,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const MainNavigation = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out!",
        description: "See you next time, productivity champion!",
      });
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const publicNavItems = [
    { 
      to: '/', 
      label: 'Home', 
      icon: Home,
      description: 'Discover Accio'
    },
    { 
      to: '/features', 
      label: 'Features', 
      icon: Sparkles,
      description: 'See what\'s possible'
    },
    { 
      to: '/help', 
      label: 'Help', 
      icon: HelpCircle,
      description: 'Get support'
    }
  ];

  const authenticatedNavItems = [
    { 
      to: '/', 
      label: 'Home', 
      icon: Home,
      description: 'Back to home'
    },
    { 
      to: '/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Your command center'
    },
    { 
      to: '/collections', 
      label: 'Collections', 
      icon: FolderOpen,
      description: 'Organized knowledge'
    },
    { 
      to: '/analytics', 
      label: 'Analytics', 
      icon: BarChart3,
      description: 'Track your growth'
    },
    { 
      to: '/profile', 
      label: 'Profile', 
      icon: User,
      description: 'Your account'
    },
    { 
      to: '/settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'Customize experience'
    },
    { 
      to: '/help', 
      label: 'Help', 
      icon: HelpCircle,
      description: 'Get support'
    }
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            onClick={closeMenu}
            aria-label="Accio homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm
                  hover:bg-accent/80 hover:text-accent-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isActiveRoute(item.to) 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                title={item.description}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>

            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-accent/80"
                  asChild
                >
                  <Link to="/dashboard">
                    <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
                    Save Content
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" className="gap-2 shadow-lg" asChild>
                  <Link to="/register">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Get Started Free
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t bg-background shadow-xl"
            role="menu"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2" role="none">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
                      hover:bg-accent/80 hover:text-accent-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      ${isActiveRoute(item.to) 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
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

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Button
                      className="w-full justify-start gap-3"
                      variant="outline"
                      asChild
                      onClick={closeMenu}
                    >
                      <Link to="/dashboard">
                        <BookmarkPlus className="h-5 w-5" aria-hidden="true" />
                        Save Content
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        closeMenu();
                      }}
                      className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-5 w-5" aria-hidden="true" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-3"
                      asChild
                      onClick={closeMenu}
                    >
                      <Link to="/login">
                        <LogIn className="h-5 w-5" aria-hidden="true" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      className="w-full justify-start gap-3 shadow-lg"
                      asChild
                      onClick={closeMenu}
                    >
                      <Link to="/register">
                        <Sparkles className="h-5 w-5" aria-hidden="true" />
                        Get Started Free
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;

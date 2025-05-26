
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  FolderOpen, 
  Search as SearchIcon, 
  User, 
  Settings, 
  LogOut,
  LogIn,
  Brain,
  BookmarkPlus,
  Sparkles,
  HelpCircle
} from 'lucide-react';

const MainNavigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out!",
        description: "See you next time!",
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
      description: 'Back to homepage'
    },
    { 
      to: '/features', 
      label: 'Features', 
      icon: Sparkles,
      description: 'Discover all features'
    },
    { 
      to: '/help', 
      label: 'Help', 
      icon: HelpCircle,
      description: 'Get help and support'
    }
  ];

  const authenticatedNavItems = [
    { 
      to: '/', 
      label: 'Home', 
      icon: Home,
      description: 'Back to homepage'
    },
    { 
      to: '/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Your main dashboard'
    },
    { 
      to: '/collections', 
      label: 'Collections', 
      icon: FolderOpen,
      description: 'Organize your content'
    },
    { 
      to: '/search', 
      label: 'Search', 
      icon: SearchIcon,
      description: 'Search your knowledge'
    },
    { 
      to: '/integrations', 
      label: 'Integrations', 
      icon: Settings,
      description: 'Connect your tools'
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
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm transition-colors duration-200" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Button 
            variant="ghost"
            className="flex items-center gap-3 font-bold text-xl hover:bg-transparent"
            asChild
          >
            <Link 
              to="/" 
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
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.to}
                variant={isActiveRoute(item.to) ? "default" : "ghost"}
                size="sm"
                className="gap-2 transition-colors duration-200"
                asChild
              >
                <Link
                  to={item.to}
                  aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                  title={item.description}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle variant="icon" size="sm" />

            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
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
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
                  aria-label="Sign out of your account"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  asChild
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Sign In
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 shadow-lg" 
                  asChild
                >
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
            <ThemeToggle variant="icon" size="sm" />

            <Button
              variant="ghost"
              size="icon"
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
            className="md:hidden border-t bg-background shadow-xl transition-all duration-200"
            role="menu"
          >
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2" role="none">
                {navItems.map((item) => (
                  <Button
                    key={item.to}
                    variant={isActiveRoute(item.to) ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    asChild
                  >
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                      role="menuitem"
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    </Link>
                  </Button>
                ))}
              </nav>

              {/* Mobile Theme Toggle */}
              <div className="pt-2 border-t">
                <ThemeToggle variant="iconText" size="sm" />
              </div>

              {/* Mobile Auth Actions */}
              <div className="pt-2 border-t space-y-2">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <Link to="/dashboard" onClick={closeMenu}>
                        <BookmarkPlus className="h-5 w-5" aria-hidden="true" />
                        Save Content
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
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
                    >
                      <Link to="/login" onClick={closeMenu}>
                        <LogIn className="h-5 w-5" aria-hidden="true" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      className="w-full justify-start gap-3 shadow-lg"
                      asChild
                    >
                      <Link to="/register" onClick={closeMenu}>
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


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  HelpCircle,
  LogOut,
  LogIn,
  Sparkles,
  Brain,
  Sun,
  Moon,
  Zap
} from 'lucide-react';

const ResponsiveNavigation = () => {
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
        description: "Come back soon to continue building your knowledge empire!",
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
    { to: '/', label: 'Home', icon: Home },
    { to: '/features', label: 'Features', icon: Sparkles },
    { to: '/help', label: 'Help', icon: HelpCircle }
  ];

  const userNavItems = user ? [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/collections', label: 'Collections', icon: FolderOpen },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings }
  ] : [];

  const allNavItems = [...publicNavItems, ...userNavItems];

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            onClick={closeMenu}
            aria-label="Accio homepage"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" aria-hidden="true" />
            </div>
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {allNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg transition-all font-medium text-sm
                  hover:bg-accent/80 hover:text-accent-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isActiveRoute(item.to) 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                aria-current={isActiveRoute(item.to) ? 'page' : undefined}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
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
                    <span className="hidden xl:inline">Save</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden xl:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 sm:mr-2" aria-hidden="true" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 font-semibold" 
                  asChild
                >
                  <Link to="/register">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Start Now</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
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
            className="lg:hidden border-t bg-background shadow-xl"
            role="menu"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2" role="none">
                {allNavItems.map((item) => (
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
                    <span className="font-medium">{item.label}</span>
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
                      className="w-full justify-start gap-3 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 font-semibold"
                      asChild
                      onClick={closeMenu}
                    >
                      <Link to="/register">
                        <Zap className="h-5 w-5" aria-hidden="true" />
                        Start Now - Free
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

export default ResponsiveNavigation;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain,
  Home,
  LayoutDashboard,
  Bookmark,
  FolderOpen,
  BarChart3,
  User,
  LogIn,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MainNavigationMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out!",
        description: "Come back soon to continue building your knowledge empire!",
      });
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

  const navigationItems = [
    { to: '/', label: 'Home', icon: Home },
    ...(user ? [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/saved', label: 'Saved Content', icon: Bookmark },
      { to: '/collections', label: 'Collections', icon: FolderOpen },
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/profile', label: 'Profile', icon: User }
    ] : [])
  ];

  const NavItem = ({ item, mobile = false }: { item: typeof navigationItems[0], mobile?: boolean }) => (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isActiveRoute(item.to) 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "text-muted-foreground hover:text-foreground",
        mobile && "w-full justify-start"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
      aria-current={isActiveRoute(item.to) ? 'page' : undefined}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation">
            {navigationItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="hidden xl:inline text-sm">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </Button>

            {/* Auth Actions */}
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="gap-2 hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden xl:inline">Sign Out</span>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden xl:inline">Sign In</span>
                  </Link>
                </Button>
                <Button size="sm" className="gap-2 shadow-sm" asChild>
                  <Link to="/register">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Start Now</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <nav className="space-y-2" role="navigation">
                {navigationItems.map((item) => (
                  <NavItem key={item.to} item={item} mobile />
                ))}
              </nav>

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
                    <Button variant="outline" className="w-full justify-start gap-3" asChild>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full justify-start gap-3 shadow-sm" asChild>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Sparkles className="h-5 w-5" />
                        Start Now
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavigationMenu;


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
  BarChart3, 
  User, 
  Settings, 
  HelpCircle,
  LogOut,
  LogIn,
  Brain,
  BookmarkPlus,
  ArrowRight
} from 'lucide-react';

const ModernNavigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "See you next time!",
      });
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const publicNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/features', label: 'Features', icon: LayoutDashboard },
    { to: '/help', label: 'Help', icon: HelpCircle }
  ];

  const userNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/collections', label: 'Collections', icon: FolderOpen },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  const navItems = user ? [...publicNavItems.slice(0, 1), ...userNavItems] : publicNavItems;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Button
                key={item.to}
                variant={isActive(item.to) ? "default" : "ghost"}
                size="sm"
                asChild
                className={isActive(item.to) ? "bg-primary text-primary-foreground" : ""}
              >
                <Link 
                  to={item.to}
                  className="flex items-center space-x-2"
                  aria-current={isActive(item.to) ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard" className="flex items-center space-x-2">
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Save Content</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/register" className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
            <div className="container py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link 
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2"
                    aria-current={isActive(item.to) ? 'page' : undefined}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
              
              <div className="pt-2 border-t space-y-2">
                {user ? (
                  <>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save Content
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full" asChild>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
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

export default ModernNavigation;


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
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
  ArrowRight,
  FileText,
  Mail,
  Sun,
  Moon
} from 'lucide-react';
import { copy } from '@/utils/copy';

const UnifiedNavigation = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: copy.success.signOut,
        description: "Your knowledge awaits your return.",
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

  // Simplified navigation - all links at top level
  const navItems = [
    { to: '/', label: copy.navigation.home, icon: Home },
    { to: '/dashboard', label: copy.navigation.dashboard, icon: LayoutDashboard, protected: true },
    { to: '/collections', label: copy.navigation.collections, icon: FolderOpen, protected: true },
    { to: '/analytics', label: copy.navigation.analytics, icon: BarChart3, protected: true },
    { to: '/blog', label: copy.navigation.blog, icon: FileText },
    { to: '/help', label: copy.navigation.help, icon: HelpCircle },
    { to: '/contact', label: copy.navigation.contact, icon: Mail }
  ];

  // Filter navigation based on authentication
  const visibleNavItems = navItems.filter(item => !item.protected || user);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            onClick={closeMobileMenu}
            aria-label="Accio - Go to homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Accio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label={copy.accessibility.mainNavigation}>
            {visibleNavItems.map((item) => (
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
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={copy.accessibility.toggleTheme}
              className="w-9 h-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>Profile</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/settings" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" aria-hidden="true" />
                    <span>Settings</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  {copy.auth.signOut}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                    {copy.auth.signIn}
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/register" className="flex items-center space-x-2">
                    <span>{copy.auth.getStarted}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={copy.accessibility.toggleTheme}
              className="w-9 h-9"
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
              aria-label={isMobileMenuOpen ? copy.accessibility.closeMenu : copy.accessibility.openMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-navigation"
            className="lg:hidden border-t bg-background/95 backdrop-blur-md"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 space-y-2">
              {visibleNavItems.map((item) => (
                <Button
                  key={item.to}
                  variant={isActive(item.to) ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link 
                    to={item.to}
                    onClick={closeMobileMenu}
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
                      <Link to="/profile" onClick={closeMobileMenu}>
                        <User className="h-4 w-4 mr-2" aria-hidden="true" />
                        Profile
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/settings" onClick={closeMobileMenu}>
                        <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                        Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                      {copy.auth.signOut}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link to="/login" onClick={closeMobileMenu}>
                        <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                        {copy.auth.signIn}
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full" asChild>
                      <Link to="/register" onClick={closeMobileMenu}>
                        {copy.auth.getStarted}
                        <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
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

export default UnifiedNavigation;

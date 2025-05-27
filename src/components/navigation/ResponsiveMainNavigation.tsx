
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
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
  BookOpen,
  User,
  Bell,
  MoreHorizontal,
  HelpCircle,
  CreditCard,
  MessageCircle,
  FileText,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ResponsiveMainNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isMobile, isTablet } = useResponsiveLayout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Successfully signed out!",
        description: "Come back soon to continue building your knowledge empire!",
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

  const mainNavItems = [
    { to: '/', label: 'Home', icon: Home, description: 'Welcome to Accio' },
    { to: '/features', label: 'Features', icon: Zap, description: 'Explore our capabilities' },
    { to: '/ai-features', label: 'AI Features', icon: Brain, description: 'AI-powered tools' }
  ];

  const appNavItems = user ? [
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3, description: 'Your command center' },
    { to: '/search', label: 'Search', icon: Search, description: 'Find your content' },
    { to: '/saved', label: 'Saved', icon: FolderOpen, description: 'Your collections' }
  ] : [];

  const moreNavItems = [
    { to: '/pricing', label: 'Pricing', icon: CreditCard, description: 'View our plans' },
    { to: '/help', label: 'Help Center', icon: HelpCircle, description: 'Get support' },
    { to: '/contact', label: 'Contact', icon: MessageCircle, description: 'Get in touch' },
    { to: '/blog', label: 'Blog', icon: FileText, description: 'Latest updates' }
  ];

  const userNavItems = user ? [
    { to: '/settings', label: 'Settings', icon: Settings, description: 'Account settings' },
    { to: '/profile', label: 'Profile', icon: User, description: 'Manage profile' }
  ] : [];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
            {/* Logo - Always visible */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
              onClick={closeMobileMenu}
              aria-label="Accio - Go to homepage"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Brain className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Accio
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation">
              {[...mainNavItems, ...appNavItems].map((item) => (
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
              
              {/* More dropdown for desktop */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  <span>More</span>
                </Button>
                
                <div className="absolute top-full right-0 mt-2 w-48 bg-popover border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2 space-y-1">
                    {moreNavItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop Actions - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Quick Capture Button - Repositioned */}
              {user && (
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <Link to="/save">
                    <Plus className="h-4 w-4" />
                    <span className="hidden xl:inline">Quick Save</span>
                  </Link>
                </Button>
              )}

              {/* Accessibility Button */}
              <AccessibilityButton variant="header" />

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
                onClick={toggleMobileMenu}
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
              {/* Navigation Sections */}
              <div className="space-y-4">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                    Explore
                  </h3>
                  <nav className="space-y-1" role="none">
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMobileMenu}
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

                {/* App Navigation (if user is logged in) */}
                {user && appNavItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                      Your Workspace
                    </h3>
                    <nav className="space-y-1" role="none">
                      {appNavItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
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
                )}

                {/* More Navigation */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                    More
                  </h3>
                  <nav className="space-y-1" role="none">
                    {moreNavItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMobileMenu}
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

                {/* User Navigation (if user is logged in) */}
                {user && userNavItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                      Account
                    </h3>
                    <nav className="space-y-1" role="none">
                      {userNavItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
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
                )}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Button 
                      className="w-full justify-start gap-3" 
                      variant="outline"
                      asChild
                    >
                      <Link to="/save" onClick={closeMobileMenu}>
                        <Plus className="h-5 w-5" />
                        Quick Save Content
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-5 w-5" />
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
                      <Link to="/login" onClick={closeMobileMenu}>
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      className="w-full justify-start gap-3"
                      asChild
                    >
                      <Link to="/register" onClick={closeMobileMenu}>
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
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default ResponsiveMainNavigation;


import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Sun, 
  Moon, 
  User, 
  LogIn,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { publicNavigation, authenticatedNavigation, quickAccessItems } from '@/data/navigation';
import { FocusManager } from '@/utils/accessibility-enhanced';

export const UnifiedMegaMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const navigation = user ? authenticatedNavigation : publicNavigation;

  // Close menus when route changes
  useEffect(() => {
    setActiveSection(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSection(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveSection(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSectionEnter = (sectionTitle: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSection(sectionTitle);
  };

  const handleSectionLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSection(null);
    }, 150);
  };

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

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      const releaseFocus = FocusManager.trapFocus(menuRef.current);
      return releaseFocus;
    }
  }, [isMobileMenuOpen]);

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <nav 
        className="container mx-auto px-4 max-w-7xl"
        role="navigation"
        aria-label="Main navigation"
        ref={menuRef}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1"
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
          <div className="hidden lg:flex items-center space-x-1">
            {/* Quick Access */}
            {quickAccessItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm",
                  "hover:bg-accent/80 hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isActiveRoute(item.href) 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActiveRoute(item.href) ? 'page' : undefined}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.title}
              </Link>
            ))}

            {/* Mega Menu Sections */}
            {navigation.map((section) => (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => handleSectionEnter(section.title)}
                onMouseLeave={handleSectionLeave}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 h-auto text-sm font-medium transition-colors",
                    "hover:bg-accent/80 hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    activeSection === section.title ? "bg-accent/80 text-accent-foreground" : "text-muted-foreground"
                  )}
                  aria-expanded={activeSection === section.title}
                  aria-haspopup="true"
                  id={`menu-${section.title.toLowerCase()}`}
                >
                  {section.title}
                  <ChevronDown 
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      activeSection === section.title && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </Button>

                {/* Mega Menu Dropdown */}
                {activeSection === section.title && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-popover border rounded-lg shadow-xl p-6 z-50 animate-fade-in"
                    role="menu"
                    aria-labelledby={`menu-${section.title.toLowerCase()}`}
                  >
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {section.title}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-md hover:bg-accent/50 transition-colors group",
                              isActiveRoute(item.href) && "bg-accent/30"
                            )}
                            role="menuitem"
                            onClick={() => setActiveSection(null)}
                          >
                            <div className="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-foreground">
                                  {item.title}
                                </span>
                                {item.isNew && (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                    New
                                  </Badge>
                                )}
                                {item.isPopular && (
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground leading-relaxed">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="hover:bg-accent/80"
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
                  <Link to="/profile">
                    <User className="h-4 w-4" aria-hidden="true" />
                    Profile
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
                <Button size="sm" className="gap-2 shadow-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" asChild>
                  <Link to="/register">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-navigation"
            className="lg:hidden border-t bg-background shadow-xl"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Quick Access */}
              <div className="space-y-2">
                {quickAccessItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium",
                      "hover:bg-accent/80 hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActiveRoute(item.href) 
                        ? "bg-primary/10 text-primary font-semibold" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Sections */}
              {navigation.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground px-4 py-2 border-b">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors",
                            isActiveRoute(item.href) && "bg-accent/30"
                          )}
                        >
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.title}</span>
                              {item.isNew && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                  New
                                </Badge>
                              )}
                              {item.isPopular && (
                                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/profile">
                        <User className="h-5 w-5" aria-hidden="true" />
                        Profile
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-5 w-5" aria-hidden="true" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/login">
                        <LogIn className="h-5 w-5" aria-hidden="true" />
                        Sign In
                      </Link>
                    </Button>
                    <Button 
                      className="w-full gap-2 shadow-lg bg-gradient-to-r from-primary to-blue-600"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link to="/register">
                        <Sparkles className="h-5 w-5" aria-hidden="true" />
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default UnifiedMegaMenu;

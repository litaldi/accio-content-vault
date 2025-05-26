
import React, { useState, useEffect } from 'react';
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
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Sparkles,
  Brain,
  Search,
  Puzzle,
  Star,
  MessageCircle,
  Zap
} from 'lucide-react';

export const UnifiedNavigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "See you soon!",
        description: "You've been signed out successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Oops!",
        description: "There was an issue signing you out. Please try again.",
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
      icon: Star,
      description: 'Explore capabilities'
    },
    { 
      to: '/playground', 
      label: 'Playground', 
      icon: Puzzle,
      description: 'Try interactive demo'
    },
    { 
      to: '/contact', 
      label: 'Contact', 
      icon: MessageCircle,
      description: 'Get help and support'
    }
  ];

  const authenticatedNavItems = [
    { 
      to: '/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Your command center'
    },
    { 
      to: '/search', 
      label: 'Search', 
      icon: Search,
      description: 'Find knowledge'
    },
    { 
      to: '/collections', 
      label: 'Collections', 
      icon: FolderOpen,
      description: 'Organized content'
    },
    { 
      to: '/analytics', 
      label: 'Analytics', 
      icon: BarChart3,
      description: 'Track insights'
    },
    { 
      to: '/integrations', 
      label: 'Integrations', 
      icon: Zap,
      description: 'Connect tools'
    }
  ];

  const navItems = user ? [...publicNavItems.slice(0, 1), ...authenticatedNavItems, ...publicNavItems.slice(1)] : publicNavItems;

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b shadow-sm' : 'bg-background border-b'
    }`} role="banner">
      <nav className="container mx-auto px-4 max-w-7xl" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:bg-accent/80"
                  asChild
                >
                  <Link to="/account">
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="gap-2 shadow-lg" asChild>
                  <Link to="/register">
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-xl z-50"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
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
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t space-y-3">
                {user ? (
                  <>
                    <Button
                      className="w-full justify-start gap-3"
                      variant="outline"
                      asChild
                    >
                      <Link to="/account">
                        <User className="h-5 w-5" />
                        Account Settings
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
                      className="w-full"
                      asChild
                    >
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button 
                      className="w-full gap-2 shadow-lg"
                      asChild
                    >
                      <Link to="/register">
                        <Sparkles className="h-4 w-4" />
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

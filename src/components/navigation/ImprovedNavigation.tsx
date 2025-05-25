
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/use-navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Settings, 
  HelpCircle,
  Search,
  Plus
} from 'lucide-react';
import { copy } from '@/utils/copy';

export const ImprovedNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isMobileMenuOpen, setMobileMenuOpen, scrolled } = useNavigation();
  const { isMobile, isTablet } = useResponsiveLayout();

  const isAuthenticated = !!user;

  const mainNavItems = [
    { 
      label: copy.nav.home, 
      path: '/', 
      icon: Home,
      description: 'Go to homepage'
    },
    { 
      label: copy.nav.features, 
      path: '/features', 
      icon: BookOpen,
      description: 'Explore features'
    },
    { 
      label: copy.nav.pricing, 
      path: '/pricing', 
      icon: Search,
      description: 'View pricing plans'
    },
    { 
      label: copy.nav.about, 
      path: '/about', 
      icon: HelpCircle,
      description: 'Learn about us'
    },
  ];

  const userNavItems = isAuthenticated ? [
    { 
      label: copy.nav.dashboard, 
      path: '/dashboard', 
      icon: Home,
      description: 'View your dashboard'
    },
    { 
      label: copy.nav.library, 
      path: '/library', 
      icon: BookOpen,
      description: 'Browse your library'
    },
    { 
      label: copy.nav.settings, 
      path: '/settings', 
      icon: Settings,
      description: 'Manage settings'
    },
  ] : [];

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md transition-all duration-300",
        scrolled && "shadow-sm border-border/40"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              aria-label="Go to homepage"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              Accio
            </button>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-1">
              {(isAuthenticated ? userNavItems : mainNavItems).map((item) => (
                <Button
                  key={item.path}
                  variant={isActiveRoute(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-200",
                    isActiveRoute(item.path) 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  aria-label={item.description}
                  aria-current={isActiveRoute(item.path) ? "page" : undefined}
                >
                  <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Button>
              ))}
            </div>
          )}

          {/* Auth Buttons (Desktop) */}
          {!isMobile && (
            <div className="hidden md:flex md:items-center md:space-x-2">
              {isAuthenticated ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleNavigation('/save')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {copy.buttons.save}
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/login')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copy.buttons.logIn}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleNavigation('/register')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  >
                    {copy.buttons.getStarted}
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-border/40 bg-background"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {(isAuthenticated ? userNavItems : mainNavItems).map((item) => (
                <Button
                  key={item.path}
                  variant={isActiveRoute(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start text-base font-medium",
                    isActiveRoute(item.path) 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  role="menuitem"
                  aria-current={isActiveRoute(item.path) ? "page" : undefined}
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Button>
              ))}
              
              {/* Mobile Auth Actions */}
              <div className="border-t border-border/40 pt-3 mt-3 space-y-2">
                {isAuthenticated ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleNavigation('/save')}
                    className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground"
                    role="menuitem"
                  >
                    <Plus className="mr-3 h-5 w-5" />
                    {copy.buttons.save}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNavigation('/login')}
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                      role="menuitem"
                    >
                      {copy.buttons.logIn}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleNavigation('/register')}
                      className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground"
                      role="menuitem"
                    >
                      {copy.buttons.getStarted}
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

export default ImprovedNavigation;

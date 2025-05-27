
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Brain,
  Home,
  Zap,
  BarChart3,
  Mail,
  User,
  LogIn,
  Search,
  BookOpen,
  Settings
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { accessibility, animations } from '@/components/ui/enhanced-design-system';

export const ImprovedMainNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const mainNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/features', label: 'Features', icon: Zap },
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-sm" 
            : "bg-background/80 backdrop-blur-sm"
        )}
      >
        <nav className="container flex h-16 items-center justify-between" role="navigation" aria-label="Main navigation">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 group transition-all duration-200",
              animations.hoverScale,
              accessibility.focusRing
            )}
            aria-label="Accio - Go to homepage"
          >
            <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-200">
              <Brain className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-primary group-hover:to-blue-600 transition-all duration-200">
              Accio
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <div className="flex items-center gap-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Button
                    key={item.to}
                    asChild
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2 relative transition-all duration-200",
                      active 
                        ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md" 
                        : "hover:bg-primary/10 hover:text-primary",
                      accessibility.focusRing
                    )}
                  >
                    <Link to={item.to}>
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {active && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                      )}
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Enhanced Auth Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200",
                  accessibility.focusRing
                )}
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button 
                size="sm" 
                className={cn(
                  "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md hover:shadow-lg transition-all duration-200",
                  accessibility.focusRing
                )}
                asChild
              >
                <Link to="/register">
                  <User className="h-4 w-4 mr-2" />
                  Get Started
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className={cn(
                "relative overflow-hidden transition-all duration-200",
                accessibility.focusRing
              )}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-5 h-5">
                <Menu 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )} 
                />
                <X 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )} 
                />
              </div>
            </Button>
          </div>
        </nav>

        {/* Enhanced Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 border-t bg-background/95 backdrop-blur-md",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div 
            id="mobile-menu"
            className="container py-4 space-y-3"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Navigation Items */}
            {mainNavItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Button
                  key={item.to}
                  asChild
                  variant={active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-200",
                    active 
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white" 
                      : "hover:bg-primary/10 hover:text-primary",
                    animations.fadeIn,
                    accessibility.focusRing
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={item.to}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}

            {/* Mobile Auth Actions */}
            <div className="pt-4 border-t space-y-2">
              <Button 
                variant="outline" 
                className={cn(
                  "w-full justify-start gap-3 border-2 hover:border-primary/50 hover:bg-primary/5",
                  accessibility.focusRing
                )}
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button 
                className={cn(
                  "w-full justify-start gap-3 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90",
                  accessibility.focusRing
                )}
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/register">
                  <User className="h-4 w-4" />
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

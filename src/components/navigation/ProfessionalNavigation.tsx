
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/hooks/use-navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AccessibilityButton from '@/components/accessibility/AccessibilityButton';
import NavigationLink from '@/components/common/NavigationLink';
import { 
  Menu, 
  X, 
  Sparkles, 
  User,
  LogOut,
  LogIn,
  UserPlus,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfessionalNavigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { isMobileMenuOpen, setMobileMenuOpen } = useNavigation();

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
              aria-label="Accio homepage"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-xl">Accio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <NavigationLink
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                  "hover:text-primary focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
                  "after:scale-x-0 after:bg-primary after:transition-transform after:duration-200",
                  "hover:after:scale-x-100"
                )}
                activeClassName="text-primary after:scale-x-100"
                aria-label={`Go to ${item.name}`}
              >
                {item.name}
              </NavigationLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <AccessibilityButton variant="header" />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <NavigationLink
                  to="/dashboard"
                  className="p-2 rounded-md hover:bg-accent transition-colors"
                  aria-label="Go to dashboard"
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                </NavigationLink>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" className="flex items-center gap-2" asChild>
                  <Link to="/register">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <AccessibilityButton variant="header" />
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open main menu"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent id="mobile-menu" side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile navigation">
                    {mainNavItems.map((item) => (
                      <NavigationLink
                        key={item.href}
                        to={item.href}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        activeClassName="bg-accent text-accent-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </NavigationLink>
                    ))}
                  </nav>
                  
                  <div className="border-t pt-6">
                    {user ? (
                      <div className="space-y-3">
                        <NavigationLink
                          to="/dashboard"
                          className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="h-5 w-5 mr-3" aria-hidden="true" />
                          Dashboard
                        </NavigationLink>
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-3 py-2 h-auto"
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-5 w-5 mr-3" aria-hidden="true" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                            <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                            Sign In
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" asChild>
                          <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                            <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
                            Get Started
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ProfessionalNavigation;

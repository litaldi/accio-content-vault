
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Brain, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  Accessibility,
  Search,
  Bookmark,
  BarChart3,
  Users,
  HelpCircle
} from 'lucide-react';

const MegaMenuNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationSections = {
    product: [
      { name: 'Features', href: '/features', icon: Search },
      { name: 'Pricing', href: '/pricing', icon: BarChart3 },
      { name: 'Dashboard', href: '/dashboard', icon: Bookmark }
    ],
    company: [
      { name: 'About', href: '/about', icon: Users },
      { name: 'Contact', href: '/contact', icon: HelpCircle }
    ]
  };

  const isActivePage = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="Accio Home">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Accio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Main Links */}
            <div className="flex items-center gap-4">
              {navigationSections.product.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 ${
                    isActivePage(item.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {navigationSections.company.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 ${
                    isActivePage(item.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              
              {/* Accessibility Button */}
              <Button 
                variant="ghost" 
                size="icon"
                asChild
                aria-label="Accessibility settings"
                className="h-9 w-9"
              >
                <Link to="/accessibility">
                  <Accessibility className="h-4 w-4" />
                </Link>
              </Button>

              {user ? (
                <>
                  <Button variant="ghost" size="icon" asChild aria-label="Settings" className="h-9 w-9">
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button variant="ghost" size="icon" asChild aria-label="Profile" className="h-9 w-9">
                    <Link to="/profile">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={signOut}
                    aria-label="Sign out"
                    className="h-9 w-9"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Accessibility Button */}
            <Button 
              variant="ghost" 
              size="icon"
              asChild
              aria-label="Accessibility settings"
              className="h-9 w-9"
            >
              <Link to="/accessibility">
                <Accessibility className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="h-9 w-9"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-2">
              
              {/* Product Links */}
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground px-3 py-1">Product</div>
                {navigationSections.product.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent ${
                      isActivePage(item.href) ? 'text-primary bg-accent' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Company Links */}
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground px-3 py-1">Company</div>
                {navigationSections.company.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent ${
                      isActivePage(item.href) ? 'text-primary bg-accent' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* User Actions */}
              <div className="border-t border-border pt-2 mt-2">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-3">
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MegaMenuNavigation;

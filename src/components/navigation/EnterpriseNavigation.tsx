
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Menu, X, ChevronDown, Shield, Headphones, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const EnterpriseNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/', type: 'link' },
    { 
      name: 'Platform', 
      href: '#',
      type: 'dropdown',
      items: [
        { name: 'Dashboard', href: '/dashboard', description: 'Your knowledge overview' },
        { name: 'Search', href: '/search', description: 'Find anything instantly' },
        { name: 'Collections', href: '/collections', description: 'Organize your content' },
        { name: 'Analytics', href: '/analytics', description: 'Usage insights and trends' }
      ]
    },
    { name: 'Features', href: '/features', type: 'link' },
    { name: 'Integrations', href: '/integrations', type: 'link' },
    { name: 'Pricing', href: '/pricing', type: 'link' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            aria-label="Accio - Go to homepage"
          >
            <div className="relative">
              <Brain className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              <div className="absolute -inset-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Accio
            </span>
            <Badge variant="secondary" className="text-xs">Enterprise</Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.type === 'dropdown' ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        isProductsOpen ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-expanded={isProductsOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isProductsOpen && "rotate-180")} />
                    </button>
                    
                    {isProductsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-xl p-4 animate-fade-in">
                        <div className="grid gap-3">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block p-3 rounded-md hover:bg-accent group transition-colors"
                            >
                              <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                {subItem.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {subItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isActive(item.href) 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                Contact Sales
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="shadow-md hover:shadow-lg" asChild>
              <Link to="/register">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    isActive(item.href) 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-4 space-y-2">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Headphones className="h-4 w-4" />
                  Contact Sales
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="px-3 py-2">
                  <Button className="w-full" asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      Start Free Trial
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnterpriseNavigation;

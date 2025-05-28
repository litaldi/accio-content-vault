
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Brain, Menu, X, ChevronDown } from 'lucide-react';
import { publicNavigation, authenticatedNavigation } from '@/data/navigation';
import { useAuth } from '@/contexts/AuthContext';

const UnifiedMegaMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const isAuthenticated = !!user;
  const navigation = isAuthenticated ? authenticatedNavigation : publicNavigation;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDesktopMenu(null);
  }, [location]);

  const handleDesktopMenuToggle = (title: string) => {
    setOpenDesktopMenu(openDesktopMenu === title ? null : title);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl" ref={menuRef}>
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Accio - Home"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Accio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((section) => (
            <div key={section.title} className="relative">
              <Button
                variant="ghost"
                className="h-10 px-3 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => handleDesktopMenuToggle(section.title)}
                onKeyDown={(e) => handleKeyDown(e, () => handleDesktopMenuToggle(section.title))}
                aria-expanded={openDesktopMenu === section.title}
                aria-haspopup="true"
              >
                {section.title}
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${
                  openDesktopMenu === section.title ? 'rotate-180' : ''
                }`} />
              </Button>

              {/* Desktop Dropdown */}
              {openDesktopMenu === section.title && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-popover border rounded-lg shadow-lg p-4 z-50">
                  <div className="grid gap-3">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        onClick={() => setOpenDesktopMenu(null)}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-accent/50 rounded-lg flex items-center justify-center group-hover:bg-accent">
                          <item.icon className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{item.title}</h3>
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
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Auth Buttons & Mobile Menu */}
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                {navigation.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-semibold mb-3">{section.title}</h3>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                          {item.isNew && (
                            <Badge variant="secondary" className="text-xs">New</Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="border-t pt-4 space-y-2">
                  {!isAuthenticated ? (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link to="/register">Get Started</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/profile">Profile</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default UnifiedMegaMenu;

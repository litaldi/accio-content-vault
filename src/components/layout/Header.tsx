
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  FolderOpen, 
  User, 
  Settings,
  LogIn,
  LogOut,
  Plus
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, requiresAuth: true },
    { name: 'Collections', href: '/collections', icon: FolderOpen, requiresAuth: true },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, requiresAuth: true },
  ];

  const userMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActivePage = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary leading-none">Accio</span>
              <span className="text-xs text-muted-foreground leading-none">Knowledge Engine</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => {
              if (item.requiresAuth && !user) return null;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    hover:bg-accent hover:text-accent-foreground
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${isActivePage(item.href) 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground'
                    }
                  `}
                  aria-current={isActivePage(item.href) ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Save Content
                  </Link>
                </Button>
                
                {/* User Menu */}
                <div className="flex items-center gap-1">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        hover:bg-accent hover:text-accent-foreground
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        ${isActivePage(item.href) 
                          ? 'bg-accent text-accent-foreground' 
                          : 'text-muted-foreground'
                        }
                      `}
                      aria-current={isActivePage(item.href) ? 'page' : undefined}
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open main menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  <div className="space-y-2">
                    {navigationItems.map((item) => {
                      if (item.requiresAuth && !user) return null;
                      
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={closeMobileMenu}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                            hover:bg-accent hover:text-accent-foreground
                            ${isActivePage(item.href) 
                              ? 'bg-accent text-accent-foreground' 
                              : 'text-foreground'
                            }
                          `}
                          aria-current={isActivePage(item.href) ? 'page' : undefined}
                        >
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  
                  {user && (
                    <>
                      <div className="border-t pt-4">
                        <div className="space-y-2">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={closeMobileMenu}
                              className={`
                                flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                                hover:bg-accent hover:text-accent-foreground
                                ${isActivePage(item.href) 
                                  ? 'bg-accent text-accent-foreground' 
                                  : 'text-foreground'
                                }
                              `}
                              aria-current={isActivePage(item.href) ? 'page' : undefined}
                            >
                              <item.icon className="h-5 w-5" aria-hidden="true" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-base font-medium"
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-5 w-5 mr-3" aria-hidden="true" />
                          Sign Out
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {!user && (
                    <div className="border-t pt-4 space-y-3">
                      <Button variant="ghost" className="w-full justify-start text-base" asChild>
                        <Link to="/login" onClick={closeMobileMenu}>
                          <LogIn className="h-5 w-5 mr-3" aria-hidden="true" />
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link to="/register" onClick={closeMobileMenu}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavigationLink from '@/components/common/NavigationLink';
import { 
  Brain, 
  Menu, 
  X,
  Home,
  Zap,
  DollarSign,
  LayoutDashboard,
  Search,
  Bookmark,
  Settings,
  HelpCircle,
  Info,
  MessageCircle,
  LogOut,
  User
} from 'lucide-react';

const StreamlinedMainNavigation = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Features', href: '/features', icon: Zap },
    { label: 'AI Features', href: '/ai-features', icon: Brain },
    { label: 'Pricing', href: '/pricing', icon: DollarSign },
    ...(user ? [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Search', href: '/search', icon: Search },
      { label: 'Saved', href: '/saved', icon: Bookmark },
      { label: 'Settings', href: '/settings', icon: Settings },
    ] : []),
    { label: 'Help', href: '/help', icon: HelpCircle },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Contact', href: '/contact', icon: MessageCircle },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Accio homepage"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Accio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation">
            <NavigationLink to="/features" className="text-sm font-medium">
              Features
            </NavigationLink>
            <NavigationLink to="/ai-features" className="text-sm font-medium">
              AI Features
            </NavigationLink>
            <NavigationLink to="/pricing" className="text-sm font-medium">
              Pricing
            </NavigationLink>
            {user && (
              <>
                <NavigationLink to="/dashboard" className="text-sm font-medium">
                  Dashboard
                </NavigationLink>
                <NavigationLink to="/saved" className="text-sm font-medium">
                  Saved
                </NavigationLink>
              </>
            )}
            <NavigationLink to="/help" className="text-sm font-medium">
              Help
            </NavigationLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
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
              </>
            ) : (
              <Button size="sm" className="flex items-center gap-2" asChild>
                <Link to="/register">
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  Start Now
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2" 
                    onClick={closeSheet}
                    aria-label="Accio homepage"
                  >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">Accio</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={closeSheet}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 space-y-3" role="navigation">
                  {navigationItems.map((item) => (
                    <NavigationLink
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        location.pathname === item.href ? 'bg-accent text-accent-foreground' : ''
                      }`}
                      onClick={closeSheet}
                    >
                      <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                      {item.label}
                    </NavigationLink>
                  ))}
                </nav>

                {/* Actions */}
                <div className="p-6 border-t">
                  {user ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 h-auto"
                      onClick={() => {
                        handleSignOut();
                        closeSheet();
                      }}
                    >
                      <LogOut className="h-5 w-5 mr-3" aria-hidden="true" />
                      Sign Out
                    </Button>
                  ) : (
                    <Button className="w-full justify-start" asChild>
                      <Link to="/register" onClick={closeSheet}>
                        <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
                        Start Now
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default StreamlinedMainNavigation;

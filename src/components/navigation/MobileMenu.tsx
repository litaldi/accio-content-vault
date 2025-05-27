
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavigationLink from '@/components/common/NavigationLink';
import { getNavigationItems } from './NavigationItems';
import { Menu, X, Brain, LogOut, Zap } from 'lucide-react';

interface MobileMenuProps {
  user: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSignOut: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  user, 
  isOpen, 
  setIsOpen, 
  onSignOut 
}) => {
  const location = useLocation();
  const navigationItems = getNavigationItems(user);

  const closeSheet = () => setIsOpen(false);

  const handleSignOut = async () => {
    try {
      await onSignOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
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
                onClick={handleSignOut}
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
  );
};

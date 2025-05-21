
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarMobileMenuProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ isLoggedIn, handleLogout }) => {
  const navigationLinks = [
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <Link to="/" className="text-lg font-medium py-2 transition-colors hover:text-primary">
            Home
          </Link>
          {navigationLinks.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="text-lg font-medium py-2 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link to="/collections" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Collections
              </Link>
              <Link to="/analytics" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Analytics
              </Link>
              <Link to="/settings" className="text-lg font-medium py-2 transition-colors hover:text-primary">
                Settings
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="justify-start pl-0 text-lg font-medium text-destructive hover:text-destructive hover:bg-transparent"
              >
                Log out
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;

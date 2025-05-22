
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface NavbarMobileMenuProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

/**
 * Mobile menu component displayed on smaller screens
 * Shows different navigation options based on authentication state
 */
const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ isLoggedIn, handleLogout }) => {
  // Public routes available to all users
  const publicLinks = [
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  // Private routes for authenticated users
  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/collections', label: 'Collections' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/settings', label: 'Settings' }
  ];

  // Determine which links to display based on authentication state
  const navigationLinks = isLoggedIn ? privateLinks : publicLinks;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <span>
            <Menu className="h-5 w-5" />
          </span>
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
              <Separator className="my-2" />
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="justify-start pl-0 text-lg font-medium text-destructive hover:text-destructive hover:bg-transparent"
              >
                <span>Log out</span>
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;

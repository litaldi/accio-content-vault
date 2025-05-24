
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
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
    { path: '/blog', label: 'Blog' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/terms', label: 'Terms' }
  ];

  // Private routes for authenticated users
  const privateLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/save', label: 'Save Content' },
    { path: '/collections', label: 'Collections' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/playground', label: 'Playground' },
    { path: '/settings', label: 'Settings' }
  ];

  // Determine which links to display based on authentication state
  const navigationLinks = isLoggedIn ? privateLinks : publicLinks;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <nav className="flex flex-col gap-4 mt-8">
            <Link to="/" className="text-lg font-medium py-2 transition-colors hover:text-primary">
              Home
            </Link>
            
            <Separator />
            
            {navigationLinks.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="text-base font-medium py-2 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            
            {!isLoggedIn && (
              <>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">Log In</Link>
                  </Button>
                </div>
              </>
            )}
            
            {isLoggedIn && (
              <>
                <Separator className="my-2" />
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="justify-start pl-0 text-base font-medium text-destructive hover:text-destructive hover:bg-transparent"
                >
                  Log out
                </Button>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobileMenu;

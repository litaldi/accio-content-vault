
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from '@/components/ModeToggle';
import DesktopNavigation from '@/components/navigation/DesktopNavigation';
import MobileNavigation from '@/components/navigation/MobileNavigation';
import AuthButtons from '@/components/navigation/AuthButtons';
import { getNavLinks } from '@/components/navigation/NavLink';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn = false,
  onLogout
}) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = getNavLinks();
  const filteredLinks = navLinks.filter(link => !link.authRequired || isLoggedIn);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">ReadSmart</span>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation 
          links={filteredLinks}
          isActiveRoute={isActiveRoute}
        />

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <ModeToggle />
          
          {/* Desktop Auth Buttons */}
          <AuthButtons 
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            isMobile={isMobile}
          />

          {/* Mobile Menu */}
          <MobileNavigation
            links={filteredLinks}
            isActiveRoute={isActiveRoute}
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopLinks from './NavbarDesktopLinks';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarActions from './NavbarActions';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const isMobile = useIsMobile();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      await signOut();
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 border-b ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background border-transparent'
      }`}
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <NavbarLogo />
          <NavbarDesktopLinks isLoggedIn={isLoggedIn} currentPath={location.pathname} />
        </div>
        
        <NavbarActions 
          isLoggedIn={isLoggedIn} 
          isMobile={isMobile} 
          handleLogout={handleLogout}
          getUserInitials={() => user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
        />
      </div>
    </header>
  );
};

export default Navbar;

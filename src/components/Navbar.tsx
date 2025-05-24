
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarActions from './Navbar/NavbarActions';
import NavbarLogo from './Navbar/NavbarLogo';
import NavbarDesktopLinks from './Navbar/NavbarDesktopLinks';
import NavbarMobileMenu from './Navbar/NavbarMobileMenu';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false, onLogout }) => {
  const { preferences } = useAccessibility();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        preferences.highContrast ? 'border-foreground' : ''
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <nav 
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          <NavbarLogo />
          <NavbarDesktopLinks isLoggedIn={isLoggedIn} currentPath={location.pathname} />
          <div className="flex items-center gap-4">
            <NavbarActions 
              isLoggedIn={isLoggedIn} 
              isMobile={false}
              handleLogout={handleLogout}
              getUserInitials={() => 'U'}
            />
            <NavbarMobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

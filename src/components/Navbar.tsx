
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarActions from './Navbar/NavbarActions';
import NavbarLogo from './Navbar/NavbarLogo';
import NavbarDesktopLinks from './Navbar/NavbarDesktopLinks';
import NavbarMobileMenu from './Navbar/NavbarMobileMenu';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const { preferences } = useAccessibility();
  const { user } = useAuth();
  const location = useLocation();

  // Use auth context if isLoggedIn prop is not provided
  const loggedIn = isLoggedIn ?? !!user;

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
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
          <NavbarDesktopLinks isLoggedIn={loggedIn} currentPath={location.pathname} />
          <div className="flex items-center gap-4">
            <NavbarActions 
              isLoggedIn={loggedIn} 
              isMobile={false}
              handleLogout={handleLogout}
              getUserInitials={getUserInitials}
            />
            <NavbarMobileMenu isLoggedIn={loggedIn} handleLogout={handleLogout} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

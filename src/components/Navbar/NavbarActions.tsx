
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AccessibilityButton } from '@/components/accessibility/AccessibilityButton';
import { ModeToggle } from '@/components/ui/mode-toggle';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarMobileMenu from './NavbarMobileMenu';

interface NavbarActionsProps {
  isLoggedIn: boolean;
  isMobile: boolean;
  handleLogout: () => void;
  getUserInitials: () => string;
}

/**
 * Component that displays actions in the navbar based on authentication state
 * Shows login/signup buttons for anonymous users and user menu for authenticated users
 */
const NavbarActions: React.FC<NavbarActionsProps> = ({ 
  isLoggedIn, 
  isMobile, 
  handleLogout, 
  getUserInitials 
}) => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/register');

  return (
    <div className="flex items-center gap-4">
      <AccessibilityButton />
      <ModeToggle />
      
      {isLoggedIn ? (
        <NavbarUserMenu 
          handleLogout={handleLogout} 
          getUserInitials={getUserInitials} 
        />
      ) : (
        <div className="hidden md:flex items-center gap-2">
          <Button 
            variant="ghost" 
            onClick={handleLogin}
            className="text-sm transition-all"
          >
            <span>Log in</span>
          </Button>
          <Button 
            onClick={handleSignup}
            className="text-sm transition-all hover:shadow-md"
          >
            <span>Sign up</span>
          </Button>
        </div>
      )}
      
      {isMobile && <NavbarMobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
    </div>
  );
};

export default NavbarActions;

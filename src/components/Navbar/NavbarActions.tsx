
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

const NavbarActions: React.FC<NavbarActionsProps> = ({ 
  isLoggedIn, 
  isMobile, 
  handleLogout, 
  getUserInitials 
}) => {
  const navigate = useNavigate();

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
            onClick={() => navigate('/login')}
            className="text-sm transition-all"
          >
            Log in
          </Button>
          <Button 
            onClick={() => navigate('/register')}
            className="text-sm transition-all hover:shadow-md"
          >
            Sign up
          </Button>
        </div>
      )}
      
      {isMobile && <NavbarMobileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
    </div>
  );
};

export default NavbarActions;

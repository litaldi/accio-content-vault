
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  isLoggedIn, 
  onLogout, 
  isMobile = false 
}) => {
  if (isMobile) return null; // Mobile buttons are handled in MobileNavigation

  return isLoggedIn ? (
    <div className="hidden sm:flex space-x-2">
      <Button variant="outline" size="sm" asChild>
        <Link to="/settings">
          <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
          <span>Settings</span>
        </Link>
      </Button>
      
      {onLogout && (
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
          <span>Logout</span>
        </Button>
      )}
    </div>
  ) : (
    <div className="hidden sm:flex space-x-2">
      <Button variant="outline" size="sm" asChild>
        <Link to="/login">Login</Link>
      </Button>
      
      <Button size="sm" asChild>
        <Link to="/register">Sign Up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;

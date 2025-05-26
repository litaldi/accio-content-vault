
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  mobile?: boolean;
  onLogout?: () => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
  isLoggedIn,
  mobile = false,
  onLogout
}) => {
  if (isLoggedIn) {
    return (
      <Button
        variant="outline"
        size={mobile ? "default" : "sm"}
        onClick={onLogout}
        className={mobile ? "w-full" : ""}
      >
        Logout
      </Button>
    );
  }

  if (mobile) {
    return (
      <div className="space-y-2">
        <Button asChild variant="outline" className="w-full">
          <Link to="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Link>
        </Button>
        <Button asChild className="w-full">
          <Link to="/register">
            <UserPlus className="mr-2 h-4 w-4" />
            Get Started
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="sm">
        <Link to="/login">Sign In</Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/register">Get Started</Link>
      </Button>
    </div>
  );
};

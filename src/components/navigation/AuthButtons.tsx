
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthButtonsProps {
  isLoggedIn: boolean;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <Button asChild variant="outline">
        <Link to="/dashboard">Dashboard</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link to="/login" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/register" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
      </Button>
    </div>
  );
};

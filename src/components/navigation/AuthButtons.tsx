
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AuthButtonsProps {
  isLoggedIn?: boolean;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ isLoggedIn = false }) => {
  if (isLoggedIn) {
    return (
      <>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" size="sm" asChild>
        <Link to="/login">Sign In</Link>
      </Button>
      <Button size="sm" className="gap-2 shadow-sm" asChild>
        <Link to="/register">
          <Sparkles className="h-4 w-4" />
          Get Started
        </Link>
      </Button>
    </>
  );
};

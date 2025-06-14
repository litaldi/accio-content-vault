
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

interface NavigationActionsProps {
  variant?: 'desktop' | 'mobile';
  onClose?: () => void;
}

const NavigationActions: React.FC<NavigationActionsProps> = ({ 
  variant = 'desktop', 
  onClose 
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose?.();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (user) {
    return (
      <div className={`flex ${variant === 'mobile' ? 'flex-col space-y-2' : 'items-center space-x-2'}`}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className={variant === 'mobile' ? 'w-full justify-start' : ''}
        >
          <Link to="/profile" onClick={onClose}>
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            Profile
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className={variant === 'mobile' ? 'w-full justify-start' : ''}
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex ${variant === 'mobile' ? 'flex-col space-y-2' : 'items-center space-x-2'}`}>
      <Button
        variant="outline"
        size="sm"
        asChild
        className={variant === 'mobile' ? 'w-full' : ''}
      >
        <Link to="/login" onClick={onClose}>
          Sign In
        </Link>
      </Button>
      <Button
        size="sm"
        asChild
        className={variant === 'mobile' ? 'w-full' : ''}
      >
        <Link to="/register" onClick={onClose}>
          Get Started
        </Link>
      </Button>
    </div>
  );
};

export default NavigationActions;

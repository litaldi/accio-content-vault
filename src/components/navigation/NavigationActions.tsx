
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import NavigationLink from '@/components/common/NavigationLink';
import { 
  User,
  LogOut,
  LogIn,
  Zap
} from 'lucide-react';

interface NavigationActionsProps {
  variant?: 'desktop' | 'mobile';
  onClose?: () => void;
}

const NavigationActions: React.FC<NavigationActionsProps> = ({ 
  variant = 'desktop',
  onClose 
}) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onClose) onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="space-y-3">
        {user ? (
          <>
            <NavigationLink
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={onClose}
            >
              <User className="h-5 w-5 mr-3" aria-hidden="true" />
              Dashboard
            </NavigationLink>
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 h-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" aria-hidden="true" />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/login" onClick={onClose}>
                <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                Sign In
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link to="/register" onClick={onClose}>
                <Zap className="h-4 w-4 mr-2" aria-hidden="true" />
                Get Started
              </Link>
            </Button>
          </>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="flex items-center space-x-3">
      {user ? (
        <>
          <NavigationLink
            to="/dashboard"
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Go to dashboard"
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </NavigationLink>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign In
            </Link>
          </Button>
          <Button size="sm" className="flex items-center gap-2" asChild>
            <Link to="/register">
              <Zap className="h-4 w-4" aria-hidden="true" />
              Get Started
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default NavigationActions;

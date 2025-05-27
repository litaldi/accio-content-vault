
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavigationLink from '@/components/common/NavigationLink';
import { User, LogOut, Zap } from 'lucide-react';

interface DesktopActionsProps {
  user: any;
  onSignOut: () => void;
}

export const DesktopActions: React.FC<DesktopActionsProps> = ({ user, onSignOut }) => {
  return (
    <div className="hidden md:flex items-center space-x-3">
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
            onClick={onSignOut}
            className="flex items-center gap-2"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </Button>
        </>
      ) : (
        <Button size="sm" className="flex items-center gap-2" asChild>
          <Link to="/register">
            <Zap className="h-4 w-4" aria-hidden="true" />
            Start Now
          </Link>
        </Button>
      )}
    </div>
  );
};

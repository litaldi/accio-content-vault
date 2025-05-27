
import React from 'react';
import NavigationLink from '@/components/common/NavigationLink';

interface DesktopNavigationProps {
  user: any;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ user }) => {
  return (
    <nav className="hidden md:flex items-center space-x-6" role="navigation">
      <NavigationLink to="/features" className="text-sm font-medium">
        Features
      </NavigationLink>
      <NavigationLink to="/ai-features" className="text-sm font-medium">
        AI Features
      </NavigationLink>
      <NavigationLink to="/pricing" className="text-sm font-medium">
        Pricing
      </NavigationLink>
      {user && (
        <>
          <NavigationLink to="/dashboard" className="text-sm font-medium">
            Dashboard
          </NavigationLink>
          <NavigationLink to="/saved" className="text-sm font-medium">
            Saved
          </NavigationLink>
        </>
      )}
      <NavigationLink to="/help" className="text-sm font-medium">
        Help
      </NavigationLink>
    </nav>
  );
};

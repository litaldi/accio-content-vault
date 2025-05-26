
import React from 'react';
import MainNavigation from './MainNavigation';

interface EnhancedUnifiedNavigationProps {
  isLoggedIn?: boolean;
  user?: { email?: string };
  onSignOut?: () => void;
}

// EnhancedUnifiedNavigation is a wrapper around MainNavigation with additional props support
const EnhancedUnifiedNavigation: React.FC<EnhancedUnifiedNavigationProps> = (props) => {
  return <MainNavigation />;
};

export default EnhancedUnifiedNavigation;

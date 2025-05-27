
import React from 'react';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  return <UnifiedNavigation />;
};

export default Navbar;

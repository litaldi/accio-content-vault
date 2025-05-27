
import React from 'react';
import ResponsiveNavigation from './navigation/ResponsiveNavigation';

interface NavbarProps {
  isLoggedIn?: boolean;
}

/**
 * Navbar component - uses the responsive navigation
 */
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return <ResponsiveNavigation />;
};

export default Navbar;

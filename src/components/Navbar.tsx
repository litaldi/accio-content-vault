
import React from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';

/**
 * Navbar component - unified navigation wrapper
 * This ensures consistent navigation across all pages
 */
interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  return <MainNavigation />;
};

export default Navbar;


import React from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return <MainNavigation />;
};

export default Navbar;

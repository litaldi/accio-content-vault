
import React from 'react';
import StreamlinedMainNavigation from '@/components/navigation/StreamlinedMainNavigation';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return <StreamlinedMainNavigation />;
};

export default Navbar;

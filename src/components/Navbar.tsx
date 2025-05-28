
import React from 'react';
import UnifiedMegaMenu from '@/components/navigation/UnifiedMegaMenu';

/**
 * Navbar Component
 * @deprecated Use UnifiedMegaMenu directly for better clarity
 * This component is kept for backward compatibility
 */
interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  return <UnifiedMegaMenu />;
};

export default Navbar;

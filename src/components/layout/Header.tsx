
import React from 'react';
import { UnifiedMainNavigation } from '@/components/navigation/UnifiedMainNavigation';

/**
 * @deprecated Use UnifiedMainNavigation component directly instead
 * This component is kept for backward compatibility
 */
export const Header: React.FC = () => {
  return <UnifiedMainNavigation />;
};

export default Header;


import React from 'react';
import { UnifiedLayout } from './UnifiedLayout';

interface ImprovedUnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
}

// ImprovedUnifiedLayout is an alias for UnifiedLayout to maintain compatibility
const ImprovedUnifiedLayout: React.FC<ImprovedUnifiedLayoutProps> = (props) => {
  return <UnifiedLayout {...props} />;
};

export default ImprovedUnifiedLayout;

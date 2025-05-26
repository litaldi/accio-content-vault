
import React from 'react';
import { UnifiedLayout } from './UnifiedLayout';

interface EnhancedUnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
}

// EnhancedUnifiedLayout is an alias for UnifiedLayout to maintain compatibility
const EnhancedUnifiedLayout: React.FC<EnhancedUnifiedLayoutProps> = (props) => {
  return <UnifiedLayout {...props} />;
};

export default EnhancedUnifiedLayout;

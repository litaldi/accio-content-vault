
import React from 'react';
import { SkipLink } from '@/components/ui/skip-link';

interface EnhancedAccessibilityProps {
  children: React.ReactNode;
}

export const EnhancedAccessibility: React.FC<EnhancedAccessibilityProps> = ({ children }) => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#navigation">Skip to navigation</SkipLink>
      <div id="main-content">
        {children}
      </div>
    </>
  );
};

export default EnhancedAccessibility;

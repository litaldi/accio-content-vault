
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface EnhancedAccessibilityProps {
  children: React.ReactNode;
}

export const EnhancedAccessibility: React.FC<EnhancedAccessibilityProps> = ({ children }) => {
  const { isHighContrast, isReducedMotion, fontSize } = useAccessibility();

  React.useEffect(() => {
    const documentElement = document.documentElement;
    
    // Apply accessibility classes
    documentElement.classList.toggle('high-contrast', isHighContrast);
    documentElement.classList.toggle('reduce-motion', isReducedMotion);
    
    // Remove old font size classes
    documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    documentElement.classList.add(`font-size-${fontSize}`);
    
    return () => {
      // Cleanup
      documentElement.classList.remove('high-contrast', 'reduce-motion');
      documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    };
  }, [isHighContrast, isReducedMotion, fontSize]);

  return <>{children}</>;
};

export default EnhancedAccessibility;


import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const EnhancedAccessibility: React.FC = () => {
  const { preferences } = useAccessibility();

  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (preferences.fontSize) {
      case 'normal':
        root.classList.add('text-base');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
      case 'larger':
        root.classList.add('text-xl');
        break;
    }

    // Apply high contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (preferences.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

  }, [preferences]);

  return null;
};

export default EnhancedAccessibility;

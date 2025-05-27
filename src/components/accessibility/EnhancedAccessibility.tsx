
import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const EnhancedAccessibility: React.FC = () => {
  const { fontSize, highContrast, reducedMotion } = useAccessibility();

  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
    switch (fontSize) {
      case 'normal':
        root.classList.add('text-base');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
      case 'x-large':
        root.classList.add('text-xl');
        break;
    }

    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

  }, [fontSize, highContrast, reducedMotion]);

  return null;
};

export default EnhancedAccessibility;


import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const EnhancedAccessibility: React.FC = () => {
  const { preferences } = useAccessibility();

  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (preferences.fontSize) {
      case 'small':
        root.classList.add('text-sm');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
      default:
        root.classList.add('text-base');
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

    // Apply language direction
    root.setAttribute('dir', preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', preferences.language);

  }, [preferences]);

  return null;
};

export default EnhancedAccessibility;

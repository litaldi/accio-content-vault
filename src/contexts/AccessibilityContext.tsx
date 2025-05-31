
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setHighContrast: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrastState] = useState(false);
  const [reducedMotion, setReducedMotionState] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [fontSize, setFontSizeState] = useState<'small' | 'medium' | 'large'>('medium');

  const toggleHighContrast = () => {
    setHighContrastState(prev => !prev);
    document.documentElement.classList.toggle('high-contrast');
  };

  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    if (value) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleReducedMotion = () => {
    setReducedMotionState(prev => !prev);
    document.documentElement.classList.toggle('reduce-motion');
  };

  const setReducedMotion = (value: boolean) => {
    setReducedMotionState(value);
    if (value) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSizeState(size);
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-\w+/g, '');
    document.documentElement.classList.add(`font-size-${size}`);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const value: AccessibilityContextType = {
    highContrast,
    reducedMotion,
    fontSize,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
    setHighContrast,
    setReducedMotion,
    announceToScreenReader
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

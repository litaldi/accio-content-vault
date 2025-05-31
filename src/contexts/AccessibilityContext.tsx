
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
    document.documentElement.classList.toggle('high-contrast');
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
    document.documentElement.classList.toggle('reduce-motion');
  };

  const handleSetFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSize(size);
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
    setFontSize: handleSetFontSize,
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


import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  toggleHighContrast: () => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const announceToScreenReader = (message: string) => {
    // Create a live region for screen reader announcements
    const announcer = document.getElementById('accessibility-announcer');
    if (announcer) {
      announcer.textContent = message;
      // Clear after a delay to allow for re-announcements of the same message
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        announceToScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

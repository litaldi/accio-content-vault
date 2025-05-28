
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
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

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

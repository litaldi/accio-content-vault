
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { announceToScreenReader } from '@/utils/accessibility';

export interface AccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  announcements: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (updates: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
    lineSpacing: 'normal',
    announcements: true,
    keyboardNavigation: true,
  });

  const updatePreferences = (updates: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const handleAnnounceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (preferences.announcements) {
      announceToScreenReader(message, priority);
    }
  };

  return (
    <AccessibilityContext.Provider value={{ 
      preferences, 
      updatePreferences,
      announceToScreenReader: handleAnnounceToScreenReader 
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

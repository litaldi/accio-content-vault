
import React, { createContext, useContext, useState } from 'react';

interface AccessibilityPreferences {
  highContrast: boolean;
  reduceAnimations: boolean;
  fontSize: 'normal' | 'large' | 'xl';
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (prefs: Partial<AccessibilityPreferences>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    highContrast: false,
    reduceAnimations: false,
    fontSize: 'normal',
  });

  const updatePreferences = (prefs: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  return (
    <AccessibilityContext.Provider value={{
      preferences,
      updatePreferences
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};


import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AccessibilityPreferences {
  fontSize: number; // Base font size in percentage (100 = default)
  highContrast: boolean; // Whether high contrast mode is enabled
  reduceAnimations: boolean; // Whether animations should be reduced/paused
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  toggleHighContrast: () => void;
  toggleReduceAnimations: () => void;
  resetToDefaults: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 100,
  highContrast: false,
  reduceAnimations: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibilityPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to parse saved accessibility preferences', error);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    
    // Apply font size to the document
    document.documentElement.style.fontSize = `${preferences.fontSize}%`;
    
    // Apply high contrast mode
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply reduced animations
    if (preferences.reduceAnimations) {
      document.documentElement.classList.add('reduce-animations');
    } else {
      document.documentElement.classList.remove('reduce-animations');
    }
  }, [preferences]);

  const increaseTextSize = () => {
    setPreferences(prev => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 10, 150), // Maximum 150% font size
    }));
  };

  const decreaseTextSize = () => {
    setPreferences(prev => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 10, 80), // Minimum 80% font size
    }));
  };

  const toggleHighContrast = () => {
    setPreferences(prev => ({
      ...prev,
      highContrast: !prev.highContrast,
    }));
  };

  const toggleReduceAnimations = () => {
    setPreferences(prev => ({
      ...prev,
      reduceAnimations: !prev.reduceAnimations,
    }));
  };

  const resetToDefaults = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        increaseTextSize,
        decreaseTextSize,
        toggleHighContrast,
        toggleReduceAnimations,
        resetToDefaults,
      }}
    >
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

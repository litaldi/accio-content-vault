
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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
  const { setTheme } = useTheme();

  // Load preferences from localStorage on mount (following MUI patterns)
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('accessibilityPreferences');
      if (savedPreferences) {
        const parsedPrefs = JSON.parse(savedPreferences);
        setPreferences(parsedPrefs);
        
        // Apply high contrast if it was previously enabled
        if (parsedPrefs.highContrast) {
          document.documentElement.classList.add('high-contrast');
        }
      }
    } catch (error) {
      console.error('Failed to parse saved accessibility preferences', error);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    
    // Apply font size to the document (MUI-style implementation with CSS variables)
    document.documentElement.style.fontSize = `${preferences.fontSize}%`;
    
    // Apply high contrast mode
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
      // Add CSS variables for high contrast theme
      document.documentElement.style.setProperty('--contrast-background', '#000000');
      document.documentElement.style.setProperty('--contrast-text', '#ffffff');
      document.documentElement.style.setProperty('--contrast-border', '#ffffff');
    } else {
      document.documentElement.classList.remove('high-contrast');
      // Remove CSS variables for high contrast theme
      document.documentElement.style.removeProperty('--contrast-background');
      document.documentElement.style.removeProperty('--contrast-text');
      document.documentElement.style.removeProperty('--contrast-border');
    }
    
    // Apply reduced animations
    if (preferences.reduceAnimations) {
      document.documentElement.classList.add('reduce-animations');
      // Add a global style for reduced animations
      document.documentElement.style.setProperty('--reduce-motion', 'reduce');
    } else {
      document.documentElement.classList.remove('reduce-animations');
      document.documentElement.style.removeProperty('--reduce-motion');
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
    setPreferences(prev => {
      const newHighContrast = !prev.highContrast;
      
      // MUI-style approach: update theme when toggling high contrast
      if (newHighContrast) {
        // Apply high contrast theme
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      }
      
      return {
        ...prev,
        highContrast: newHighContrast,
      };
    });
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

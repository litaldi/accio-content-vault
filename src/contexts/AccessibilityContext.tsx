
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AccessibilityPreferences {
  reduceAnimations: boolean;
  highContrast: boolean;
  largeText: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (updates: Partial<AccessibilityPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  reduceAnimations: false,
  highContrast: false,
  largeText: false,
  keyboardNavigation: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    // Load preferences from localStorage if available
    try {
      const saved = localStorage.getItem('accessibility-preferences');
      return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  // Detect user system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({ ...prev, reduceAnimations: e.matches }));
    };
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({ ...prev, highContrast: e.matches }));
    };

    // Set initial values
    setPreferences(prev => ({
      ...prev,
      reduceAnimations: mediaQuery.matches,
      highContrast: highContrastQuery.matches,
    }));

    mediaQuery.addEventListener('change', handleMotionChange);
    highContrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      highContrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
    } catch {
      // Handle localStorage errors gracefully
    }

    // Apply CSS classes to document body for global accessibility features
    document.body.classList.toggle('reduce-animations', preferences.reduceAnimations);
    document.body.classList.toggle('high-contrast', preferences.highContrast);
    document.body.classList.toggle('large-text', preferences.largeText);
  }, [preferences]);

  const updatePreferences = (updates: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
  language: 'en' | 'he' | 'ar';
  colorBlindness: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (updates: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 'medium',
  highContrast: false,
  reducedMotion: false,
  language: 'en',
  colorBlindness: 'none',
};

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
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      try {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
      } catch (error) {
        console.error('Failed to parse accessibility preferences:', error);
      }
    }

    // Check system preferences
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
    };

    if (mediaQueries.reducedMotion.matches) {
      setPreferences(prev => ({ ...prev, reducedMotion: true }));
    }

    if (mediaQueries.highContrast.matches) {
      setPreferences(prev => ({ ...prev, highContrast: true }));
    }
  }, []);

  const updatePreferences = (updates: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, ...updates };
      localStorage.setItem('accessibility-preferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreferences, announceToScreenReader }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

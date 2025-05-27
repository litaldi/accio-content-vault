
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  screenReader: boolean;
  fontSize: 'normal' | 'large' | 'larger';
  grayscale: boolean;
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  keyboardNavigation: boolean;
  screenReaderMode: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (prefs: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    reducedMotion: false,
    highContrast: false,
    screenReader: false,
    fontSize: 'normal',
    grayscale: false,
    lineSpacing: 'normal',
    keyboardNavigation: true,
    screenReaderMode: false,
  });

  useEffect(() => {
    // Check for system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setPreferences(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
    }));

    // Load saved preferences
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      try {
        const savedPrefs = JSON.parse(saved);
        setPreferences(prev => ({ ...prev, ...savedPrefs }));
      } catch (error) {
        console.warn('Failed to load accessibility preferences:', error);
      }
    }
  }, []);

  const updatePreferences = (newPrefs: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('accessibility-preferences', JSON.stringify(updated));
      return updated;
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
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreferences, announceToScreenReader }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

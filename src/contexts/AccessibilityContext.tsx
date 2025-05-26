
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'default' | 'large';
  language: 'en' | 'he' | 'ar';
  announcements: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (updates: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'default',
  language: 'en',
  announcements: true,
  keyboardNavigation: true,
};

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    const saved = localStorage.getItem('accessibility-preferences');
    return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
    
    // Apply system preferences detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    if (prefersReducedMotion && !preferences.reducedMotion) {
      setPreferences(prev => ({ ...prev, reducedMotion: true }));
    }
    
    if (prefersHighContrast && !preferences.highContrast) {
      setPreferences(prev => ({ ...prev, highContrast: true }));
    }
    
    // Apply CSS classes to document
    document.documentElement.classList.toggle('high-contrast', preferences.highContrast);
    document.documentElement.classList.toggle('reduce-motion', preferences.reducedMotion);
    document.documentElement.classList.toggle('font-size-large', preferences.fontSize === 'large');
    document.documentElement.classList.toggle('font-size-small', preferences.fontSize === 'small');
    document.documentElement.setAttribute('dir', preferences.language === 'he' || preferences.language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', preferences.language);
  }, [preferences]);

  const updatePreferences = (updates: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!preferences.announcements) return;
    
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

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  reduceAnimations: boolean;
  fontSize: 'small' | 'medium' | 'large';
  keyboardNavigation: boolean;
  textToSpeech: boolean;
  grayscaleMode: boolean;
  colorScheme: 'light' | 'dark' | 'high-contrast';
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (preferences: Partial<AccessibilityPreferences>) => void;
  resetPreferences: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  reducedMotion: false,
  reduceAnimations: false,
  fontSize: 'medium',
  keyboardNavigation: false,
  textToSpeech: false,
  grayscaleMode: false,
  colorScheme: 'light',
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

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibility-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse accessibility preferences from localStorage');
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Apply preferences to document
  useEffect(() => {
    const documentElement = document.documentElement;
    
    // Font size
    documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    documentElement.classList.add(`font-size-${preferences.fontSize}`);
    
    // High contrast
    documentElement.classList.toggle('high-contrast', preferences.highContrast);
    
    // Reduced motion
    documentElement.classList.toggle('reduce-motion', preferences.reducedMotion);
    documentElement.classList.toggle('reduce-animations', preferences.reduceAnimations);
    
    // Keyboard navigation
    documentElement.classList.toggle('keyboard-navigation', preferences.keyboardNavigation);
    
    // Grayscale mode
    documentElement.classList.toggle('grayscale-mode', preferences.grayscaleMode);
    
    // Color scheme
    documentElement.setAttribute('data-color-scheme', preferences.colorScheme);
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('accessibility-preferences');
  };

  const increaseFontSize = () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(preferences.fontSize);
    if (currentIndex < sizes.length - 1) {
      updatePreferences({ fontSize: sizes[currentIndex + 1] });
    }
  };

  const decreaseFontSize = () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(preferences.fontSize);
    if (currentIndex > 0) {
      updatePreferences({ fontSize: sizes[currentIndex - 1] });
    }
  };

  return (
    <AccessibilityContext.Provider value={{ 
      preferences, 
      updatePreferences, 
      resetPreferences,
      increaseFontSize,
      decreaseFontSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

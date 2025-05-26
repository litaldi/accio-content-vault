
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  highContrast: boolean;
  reducedMotion: boolean;
  grayscale: boolean;
  keyboardNavigation: boolean;
  screenReaderMode: boolean;
}

interface AccessibilityState {
  preferences: AccessibilityPreferences;
  announcements: string[];
}

type AccessibilityAction = 
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AccessibilityPreferences> }
  | { type: 'ANNOUNCE'; payload: string }
  | { type: 'CLEAR_ANNOUNCEMENTS' };

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (preferences: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string) => void;
  clearAnnouncements: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 'medium',
  lineSpacing: 'normal',
  highContrast: false,
  reducedMotion: false,
  grayscale: false,
  keyboardNavigation: true,
  screenReaderMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const accessibilityReducer = (state: AccessibilityState, action: AccessibilityAction): AccessibilityState => {
  switch (action.type) {
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'ANNOUNCE':
      return {
        ...state,
        announcements: [...state.announcements, action.payload]
      };
    case 'CLEAR_ANNOUNCEMENTS':
      return {
        ...state,
        announcements: []
      };
    default:
      return state;
  }
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(accessibilityReducer, {
    preferences: defaultPreferences,
    announcements: []
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('accessibility-preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
      }
    } catch (error) {
      console.warn('Failed to load accessibility preferences:', error);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('accessibility-preferences', JSON.stringify(state.preferences));
    } catch (error) {
      console.warn('Failed to save accessibility preferences:', error);
    }
  }, [state.preferences]);

  // Apply preferences to document root
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.add(`font-size-${state.preferences.fontSize}`);

    // Apply line spacing
    root.classList.remove('line-spacing-normal', 'line-spacing-relaxed', 'line-spacing-loose');
    root.classList.add(`line-spacing-${state.preferences.lineSpacing}`);

    // Apply other preferences
    root.classList.toggle('high-contrast', state.preferences.highContrast);
    root.classList.toggle('reduce-motion', state.preferences.reducedMotion);
    root.classList.toggle('grayscale-mode', state.preferences.grayscale);
    root.classList.toggle('keyboard-navigation', state.preferences.keyboardNavigation);
    root.classList.toggle('screen-reader-mode', state.preferences.screenReaderMode);

  }, [state.preferences]);

  const updatePreferences = (preferences: Partial<AccessibilityPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const announceToScreenReader = (message: string) => {
    dispatch({ type: 'ANNOUNCE', payload: message });
    
    // Create announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const clearAnnouncements = () => {
    dispatch({ type: 'CLEAR_ANNOUNCEMENTS' });
  };

  return (
    <AccessibilityContext.Provider value={{
      preferences: state.preferences,
      updatePreferences,
      announceToScreenReader,
      clearAnnouncements
    }}>
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

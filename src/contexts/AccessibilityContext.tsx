
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  highContrast: boolean;
  reducedMotion: boolean;
  grayscale: boolean;
  keyboardNavigation: boolean;
  screenReaderMode: boolean;
  focusVisible: boolean;
  underlineLinks: boolean;
}

interface AccessibilityState {
  preferences: AccessibilityPreferences;
  announcements: string[];
  isAuditMode: boolean;
}

type AccessibilityAction = 
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AccessibilityPreferences> }
  | { type: 'ANNOUNCE'; payload: string }
  | { type: 'CLEAR_ANNOUNCEMENTS' }
  | { type: 'TOGGLE_AUDIT_MODE' };

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  isAuditMode: boolean;
  updatePreferences: (preferences: Partial<AccessibilityPreferences>) => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  clearAnnouncements: () => void;
  toggleAuditMode: () => void;
  runAccessibilityAudit: () => Promise<void>;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 'medium',
  lineSpacing: 'normal',
  highContrast: false,
  reducedMotion: false,
  grayscale: false,
  keyboardNavigation: true,
  screenReaderMode: false,
  focusVisible: true,
  underlineLinks: false,
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
    case 'TOGGLE_AUDIT_MODE':
      return {
        ...state,
        isAuditMode: !state.isAuditMode
      };
    default:
      return state;
  }
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(accessibilityReducer, {
    preferences: defaultPreferences,
    announcements: [],
    isAuditMode: false
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('accessibility-preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        // Merge with defaults to ensure all properties exist
        const mergedPreferences = { ...defaultPreferences, ...preferences };
        dispatch({ type: 'UPDATE_PREFERENCES', payload: mergedPreferences });
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

    // Apply visual preferences
    root.classList.toggle('high-contrast', state.preferences.highContrast);
    root.classList.toggle('reduce-motion', state.preferences.reducedMotion);
    root.classList.toggle('grayscale-mode', state.preferences.grayscale);
    root.classList.toggle('keyboard-navigation', state.preferences.keyboardNavigation);
    root.classList.toggle('screen-reader-mode', state.preferences.screenReaderMode);
    root.classList.toggle('focus-visible-enhanced', state.preferences.focusVisible);
    root.classList.toggle('underline-links', state.preferences.underlineLinks);

    // Apply motion preferences
    if (state.preferences.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

  }, [state.preferences]);

  // Detect system preferences on mount
  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
    };

    const updateSystemPreferences = () => {
      const systemPreferences: Partial<AccessibilityPreferences> = {};
      
      if (mediaQueries.reducedMotion.matches) {
        systemPreferences.reducedMotion = true;
      }
      
      if (mediaQueries.highContrast.matches) {
        systemPreferences.highContrast = true;
      }
      
      if (Object.keys(systemPreferences).length > 0) {
        dispatch({ type: 'UPDATE_PREFERENCES', payload: systemPreferences });
      }
    };

    // Check initial system preferences
    updateSystemPreferences();

    // Listen for changes
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updateSystemPreferences);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updateSystemPreferences);
      });
    };
  }, []);

  const updatePreferences = (preferences: Partial<AccessibilityPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    dispatch({ type: 'ANNOUNCE', payload: message });
    
    // Create announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  const clearAnnouncements = () => {
    dispatch({ type: 'CLEAR_ANNOUNCEMENTS' });
  };

  const toggleAuditMode = () => {
    dispatch({ type: 'TOGGLE_AUDIT_MODE' });
  };

  const runAccessibilityAudit = async () => {
    try {
      const { runComprehensiveAccessibilityAudit } = await import('@/utils/comprehensive-accessibility-audit');
      const results = runComprehensiveAccessibilityAudit();
      
      announceToScreenReader(
        `Accessibility audit completed. Score: ${results.score}/100. ${results.issues.length} issues found.`,
        'assertive'
      );
    } catch (error) {
      console.error('Failed to run accessibility audit:', error);
      announceToScreenReader('Accessibility audit failed to run', 'assertive');
    }
  };

  return (
    <AccessibilityContext.Provider value={{
      preferences: state.preferences,
      isAuditMode: state.isAuditMode,
      updatePreferences,
      announceToScreenReader,
      clearAnnouncements,
      toggleAuditMode,
      runAccessibilityAudit
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

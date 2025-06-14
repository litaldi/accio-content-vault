
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  announceToScreenReader: (message: string) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    // Load saved preferences
    const savedContrast = localStorage.getItem('accio_high_contrast') === 'true';
    const savedMotion = localStorage.getItem('accio_reduced_motion') === 'true';
    const savedFontSize = localStorage.getItem('accio_font_size') as 'small' | 'medium' | 'large' || 'medium';

    setIsHighContrast(savedContrast);
    setIsReducedMotion(savedMotion);
    setFontSize(savedFontSize);

    // Apply classes to document
    document.documentElement.classList.toggle('high-contrast', savedContrast);
    document.documentElement.classList.toggle('reduce-motion', savedMotion);
    document.documentElement.classList.toggle(`font-size-${savedFontSize}`, true);
  }, []);

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('accio_high_contrast', newValue.toString());
    document.documentElement.classList.toggle('high-contrast', newValue);
    announceToScreenReader(`High contrast mode ${newValue ? 'enabled' : 'disabled'}`);
  };

  const toggleReducedMotion = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    localStorage.setItem('accio_reduced_motion', newValue.toString());
    document.documentElement.classList.toggle('reduce-motion', newValue);
    announceToScreenReader(`Reduced motion ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleSetFontSize = (size: 'small' | 'medium' | 'large') => {
    // Remove old font size class
    document.documentElement.classList.remove(`font-size-${fontSize}`);
    
    setFontSize(size);
    localStorage.setItem('accio_font_size', size);
    
    // Add new font size class
    document.documentElement.classList.add(`font-size-${size}`);
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const value = {
    isHighContrast,
    isReducedMotion,
    fontSize,
    announceToScreenReader,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize: handleSetFontSize
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
</lov-context>

Now I'll create the theme provider:

<lov-write file_path="src/components/theme/ThemeProvider.tsx">
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'accio-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

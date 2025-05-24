
import React, { createContext, useContext, useEffect, useState } from 'react';
import { announceToScreenReader } from '@/utils/accessibility';

type Theme = 'light' | 'dark' | 'system' | 'high-contrast';
type ThemeProviderProps = { children: React.ReactNode };

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isHighContrast: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    // Check if user has 'prefers-color-scheme: dark'
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        return 'high-contrast';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Default to light
    return 'light';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  // Derived states
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  const isHighContrast = theme === 'high-contrast';
  
  // Update localStorage and apply theme classNames
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'high-contrast');
    
    // Add appropriate class based on the active theme
    if (theme === 'system') {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Announce theme change to screen readers
    const themeName = theme === 'system' ? systemTheme : theme;
    announceToScreenReader(`Theme changed to ${themeName}`);
    
  }, [theme, systemTheme]);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Listen for high contrast preference changes
  useEffect(() => {
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches && theme !== 'high-contrast') {
        setTheme('high-contrast');
      }
    };
    
    contrastQuery.addEventListener('change', handleContrastChange);
    return () => contrastQuery.removeEventListener('change', handleContrastChange);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, isHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

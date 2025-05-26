
import React, { createContext, useContext, useEffect } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: 'dark';
  setTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Always apply dark theme
    root.classList.remove('light');
    root.classList.add('dark');
    
    // Set color scheme for better browser integration
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const value = {
    theme: 'dark' as const,
    setTheme: () => {}, // No-op since we only support dark mode
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

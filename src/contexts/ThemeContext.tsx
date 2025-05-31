
import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'dark';
  isDark: boolean;
  setTheme: (theme: 'dark') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const setTheme = (theme: 'dark') => {
    // Dark mode only - no theme switching
  };

  const toggleTheme = () => {
    // Dark mode only - no theme switching
  };

  const value: ThemeContextType = {
    theme: 'dark',
    isDark: true,
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

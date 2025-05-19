
import React, { useState, useRef, useEffect } from 'react';
import { Accessibility, ArrowUp, ArrowDown, Sun, Moon, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTheme } from 'next-themes';
import { useOnClickOutside } from '@/hooks/use-click-outside';

export const AccessibilityButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { preferences, increaseTextSize, decreaseTextSize, toggleHighContrast, toggleReduceAnimations, resetToDefaults } = useAccessibility();
  const { theme, setTheme } = useTheme();
  
  // Close menu when clicking outside
  useOnClickOutside(menuRef, (e) => {
    // Don't close if clicking on the button itself
    if (buttonRef.current?.contains(e.target as Node)) return;
    setIsMenuOpen(false);
  });

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        // Return focus to the button when menu is closed
        buttonRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Toggle menu and manage focus
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Get the current theme name for high contrast toggle
  const isHighContrast = preferences.highContrast;
  const areAnimationsReduced = preferences.reduceAnimations;

  const handleHighContrastChange = () => {
    toggleHighContrast();
    if (!preferences.highContrast) {
      // If turning on high contrast
      if (theme === 'dark' || theme === 'light') {
        setTheme(theme === 'dark' ? 'dark' : 'light');
      } else {
        setTheme('light');
      }
    }
  };
  
  return (
    <div className="relative z-50" aria-label="Accessibility controls">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="relative"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Accessibility options"
        aria-haspopup="menu"
      >
        <Accessibility className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Accessibility options</span>
      </Button>

      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="accessibility-button"
        >
          <div className="p-2 border-b border-border">
            <h3 className="px-3 py-2 text-sm font-medium" id="accessibility-menu-heading">
              Accessibility Options
            </h3>
          </div>
          
          <div className="p-2 space-y-1">
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={increaseTextSize}
              role="menuitem"
            >
              <span>Increase Text Size</span>
              <ArrowUp className="h-4 w-4" />
            </button>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={decreaseTextSize}
              role="menuitem"
            >
              <span>Decrease Text Size</span>
              <ArrowDown className="h-4 w-4" />
            </button>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={handleHighContrastChange}
              role="menuitem"
              aria-pressed={isHighContrast}
            >
              <span>High Contrast Mode</span>
              {isHighContrast ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={toggleReduceAnimations}
              role="menuitem"
              aria-pressed={areAnimationsReduced}
            >
              <span>Pause Animations</span>
              <Pause className="h-4 w-4" />
            </button>

            <div className="border-t border-border my-2"></div>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={resetToDefaults}
              role="menuitem"
            >
              <span>Reset to Default</span>
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

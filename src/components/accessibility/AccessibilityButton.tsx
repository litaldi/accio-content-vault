
import React, { useState, useRef, useEffect } from 'react';
import { Accessibility, ArrowUp, ArrowDown, Sun, Moon, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTheme } from 'next-themes';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { useFocusTrap } from '@/hooks/use-focus-trap';

export const AccessibilityButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { preferences, increaseTextSize, decreaseTextSize, toggleHighContrast, toggleReduceAnimations, resetToDefaults } = useAccessibility();
  const { theme, setTheme } = useTheme();
  const { trapRef } = useFocusTrap({ enabled: isMenuOpen, onEscape: () => setIsMenuOpen(false) });
  
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
        aria-controls="accessibility-menu"
      >
        <Accessibility className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        <span className="sr-only">Accessibility options</span>
      </Button>

      {isMenuOpen && (
        <div 
          ref={(el) => {
            // Combine refs
            if (el) {
              trapRef.current = el;
              menuRef.current = el;
            }
          }}
          className="absolute right-0 mt-2 w-64 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          id="accessibility-menu"
          aria-orientation="vertical"
          aria-labelledby="accessibility-button"
          tabIndex={-1}
        >
          <div className="p-2 border-b border-border">
            <h3 className="px-3 py-2 text-sm font-medium" id="accessibility-menu-heading">
              Accessibility Options
            </h3>
          </div>
          
          <div className="p-2 space-y-1" role="group" aria-labelledby="accessibility-menu-heading">
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={increaseTextSize}
              role="menuitem"
              aria-label="Increase text size"
            >
              <span>Increase Text Size</span>
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={decreaseTextSize}
              role="menuitem"
              aria-label="Decrease text size"
            >
              <span>Decrease Text Size</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={handleHighContrastChange}
              role="menuitem"
              aria-pressed={isHighContrast}
              aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast mode`}
            >
              <span>High Contrast Mode</span>
              {isHighContrast ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={toggleReduceAnimations}
              role="menuitem"
              aria-pressed={areAnimationsReduced}
              aria-label={`${areAnimationsReduced ? 'Enable' : 'Disable'} animations`}
            >
              <span>Pause Animations</span>
              <Pause className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="border-t border-border my-2" aria-hidden="true"></div>
            
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={resetToDefaults}
              role="menuitem"
              aria-label="Reset accessibility settings to default values"
            >
              <span>Reset to Default</span>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

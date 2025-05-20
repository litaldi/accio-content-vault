
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
  const menuItems = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState(-1);
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

  // Handle arrow keys for navigation
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusIndex(prev => Math.min(prev + 1, menuItems.current.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          setFocusIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setFocusIndex(menuItems.current.length - 1);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Set focus when focus index changes
  useEffect(() => {
    if (focusIndex >= 0 && focusIndex < menuItems.current.length) {
      menuItems.current[focusIndex]?.focus();
    }
  }, [focusIndex]);

  // Set initial focus on first menu item when opened
  useEffect(() => {
    if (isMenuOpen) {
      // Set initial focus on first menu item
      setFocusIndex(0);
    } else {
      // Reset focus index when menu closes
      setFocusIndex(-1);
    }
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
        className="relative focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              ref={el => menuItems.current[0] = el}
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={increaseTextSize}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span>Increase Text Size</span>
              <ArrowUp className="h-4 w-4" />
            </button>
            
            <button
              ref={el => menuItems.current[1] = el}
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={decreaseTextSize}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span>Decrease Text Size</span>
              <ArrowDown className="h-4 w-4" />
            </button>
            
            <button
              ref={el => menuItems.current[2] = el}
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={handleHighContrastChange}
              role="menuitem"
              aria-pressed={isHighContrast}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span>High Contrast Mode</span>
              {isHighContrast ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            
            <button
              ref={el => menuItems.current[3] = el}
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={toggleReduceAnimations}
              role="menuitem"
              aria-pressed={areAnimationsReduced}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span>Pause Animations</span>
              <Pause className="h-4 w-4" />
            </button>

            <div className="border-t border-border my-2"></div>
            
            <button
              ref={el => menuItems.current[4] = el}
              className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              onClick={resetToDefaults}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
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

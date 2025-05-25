import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AccessibilityState {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  isKeyboardUser: boolean;
}

export const useAccessibility = () => {
  const { toast } = useToast();
  const [state, setState] = useState<AccessibilityState>({
    isHighContrast: false,
    isReducedMotion: false,
    fontSize: 'normal',
    isKeyboardUser: false,
  });

  useEffect(() => {
    // Detect keyboard usage
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setState(prev => ({ ...prev, isKeyboardUser: true }));
      }
    };

    const handleMouseDown = () => {
      setState(prev => ({ ...prev, isKeyboardUser: false }));
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setState(prev => ({ ...prev, isReducedMotion: mediaQuery.matches }));

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, isReducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    // Load saved preferences
    const savedPrefs = localStorage.getItem('accessibility-preferences');
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        setState(prev => ({ ...prev, ...prefs }));
      } catch (error) {
        console.warn('Failed to load accessibility preferences');
      }
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const updatePreference = (key: keyof AccessibilityState, value: any) => {
    setState(prev => {
      const newState = { ...prev, [key]: value };
      localStorage.setItem('accessibility-preferences', JSON.stringify(newState));
      return newState;
    });

    // Apply changes to document
    if (key === 'isHighContrast') {
      document.documentElement.classList.toggle('high-contrast', value);
    } else if (key === 'fontSize') {
      document.documentElement.className = document.documentElement.className
        .replace(/font-size-\w+/g, '')
        .concat(` font-size-${value}`);
    } else if (key === 'isKeyboardUser') {
      document.documentElement.classList.toggle('keyboard-user', value);
    }

    toast({
      title: "Accessibility updated",
      description: "Your preferences have been saved.",
    });
  };

  return {
    ...state,
    updatePreference,
  };
};

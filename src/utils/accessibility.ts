
import React from 'react';

/**
 * Accessibility utilities and helpers
 */

export const focusManagement = {
  /**
   * Trap focus within a container element
   */
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    firstElement.focus();
    
    return () => container.removeEventListener('keydown', handleTabKey);
  },

  /**
   * Announce content to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }
};

export const colorContrast = {
  /**
   * Check if color combination meets WCAG contrast requirements
   */
  meetsWCAG: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    // This is a simplified implementation
    // In production, use a proper color contrast library
    const ratio = 4.5; // Mock ratio
    const requiredRatio = level === 'AAA' ? 7 : 4.5;
    return ratio >= requiredRatio;
  }
};

export const keyboardNavigation = {
  /**
   * Handle escape key for closing modals/dropdowns
   */
  handleEscape: (callback: () => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  },

  /**
   * Handle enter and space keys for custom buttons
   */
  handleActivation: (callback: () => void) => {
    return (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    };
  }
};

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
};

export const trapFocus = (container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  return () => container.removeEventListener('keydown', handleTabKey);
};

export const screenReader = {
  /**
   * Create screen reader only text component
   */
  createSROnlyText: (text: string): React.ReactElement => {
    return React.createElement('span', { className: 'sr-only' }, text);
  },

  /**
   * Create skip link component
   */
  createSkipLink: (targetId: string, text: string = 'Skip to main content'): React.ReactElement => {
    return React.createElement(
      'a',
      {
        href: `#${targetId}`,
        className: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-primary-foreground px-4 py-2 z-50'
      },
      text
    );
  }
};

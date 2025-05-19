
import { useRef, useEffect } from 'react';

type FocusTrapOptions = {
  enabled?: boolean;
  autoFocus?: boolean;
  returnFocus?: boolean;
  escapeDeactivates?: boolean;
  onEscape?: () => void;
};

/**
 * Hook for trapping focus within a designated element (like modals, dialogs)
 * Ensures keyboard navigation stays within the trapped element
 */
export function useFocusTrap(options: FocusTrapOptions = {}) {
  const {
    enabled = true,
    autoFocus = true,
    returnFocus = true,
    escapeDeactivates = true,
    onEscape,
  } = options;
  
  const trapRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    
    // Store the element that had focus before the trap was activated
    if (returnFocus) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    }

    // Auto-focus the first focusable element when trap is activated
    if (autoFocus && trapRef.current) {
      const focusableElements = getFocusableElements(trapRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // If no focusable elements, focus the trap container itself
        trapRef.current.tabIndex = -1;
        trapRef.current.focus();
      }
    }

    return () => {
      // Return focus to the previously focused element when trap is deactivated
      if (returnFocus && previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [enabled, autoFocus, returnFocus]);

  useEffect(() => {
    if (!enabled || !trapRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (escapeDeactivates && e.key === 'Escape') {
        e.preventDefault();
        if (onEscape) onEscape();
        return;
      }

      // Handle Tab key for focus trapping
      if (e.key === 'Tab' && trapRef.current) {
        const focusableElements = getFocusableElements(trapRef.current);
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const { activeElement } = document;

        // Shift+Tab on first element should wrap to last element
        if (e.shiftKey && activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } 
        // Tab on last element should wrap to first element
        else if (!e.shiftKey && activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, escapeDeactivates, onEscape]);

  return { trapRef };
}

// Helper function to get all focusable elements within a container
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  // Selector for all potentially focusable elements
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
  ].join(',');

  return Array.from(container.querySelectorAll(selector))
    .filter((el) => {
      // Filter out hidden elements
      return el.offsetWidth > 0 && 
             el.offsetHeight > 0 && 
             window.getComputedStyle(el).visibility !== 'hidden';
    }) as HTMLElement[];
}

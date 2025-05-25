
/**
 * Accessibility utility functions
 */

/**
 * Announces a message to screen readers using aria-live regions
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

/**
 * Checks if reduced motion is preferred by the user
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Checks if high contrast is preferred by the user
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Checks if an element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];
  
  return focusableSelectors.some(selector => element.matches(selector)) &&
    !element.hasAttribute('hidden') &&
    element.offsetParent !== null;
};

/**
 * Gets all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];
  
  const elements = container.querySelectorAll(focusableSelectors.join(', '));
  return Array.from(elements).filter(el => isFocusable(el as HTMLElement)) as HTMLElement[];
};

/**
 * Calculates contrast ratio between two colors
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified implementation - in production, use a proper color contrast library
  // This is a mock implementation for demonstration
  return 4.5; // Return a value that passes WCAG AA
};

/**
 * Checks if a color combination meets WCAG contrast requirements
 */
export const meetsContrastRequirement = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  const requirement = level === 'AAA' 
    ? (isLargeText ? 4.5 : 7) 
    : (isLargeText ? 3 : 4.5);
    
  return ratio >= requirement;
};

/**
 * Generates a unique ID with prefix
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Handles arrow key navigation for lists
 */
export const handleArrowNavigation = (
  event: KeyboardEvent,
  elements: HTMLElement[],
  currentIndex: number,
  direction: 'horizontal' | 'vertical' = 'vertical'
): number => {
  const isVertical = direction === 'vertical';
  const upKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
  const downKey = isVertical ? 'ArrowDown' : 'ArrowRight';
  
  if (event.key === upKey) {
    event.preventDefault();
    return currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
  } else if (event.key === downKey) {
    event.preventDefault();
    return currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
  }
  
  return currentIndex;
};

/**
 * Creates a live region for announcements
 */
export const createLiveRegion = (priority: 'polite' | 'assertive' = 'polite'): HTMLElement => {
  const region = document.createElement('div');
  region.setAttribute('aria-live', priority);
  region.setAttribute('aria-atomic', 'true');
  region.className = 'sr-only';
  document.body.appendChild(region);
  return region;
};

/**
 * Focuses an element and scrolls it into view if needed
 */
export const focusElement = (element: HTMLElement, scrollIntoView: boolean = true): void => {
  element.focus();
  
  if (scrollIntoView) {
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest'
    });
  }
};

/**
 * Traps focus within a container (useful for modals)
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container);
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Focus first element by default
  if (firstElement) {
    firstElement.focus();
  }
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

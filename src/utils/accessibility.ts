
/**
 * Accessibility utilities and helpers
 */

// Announce content to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Check if element is focusable
export const isFocusable = (element: HTMLElement): boolean => {
  const focusableSelectors = [
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];
  
  return focusableSelectors.some(selector => element.matches(selector)) &&
         !element.hasAttribute('disabled') &&
         element.tabIndex !== -1;
};

// Get all focusable elements within a container
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');
  
  return Array.from(container.querySelectorAll(focusableSelectors)).filter(element => {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.display !== 'none' && 
           computedStyle.visibility !== 'hidden' &&
           !element.hasAttribute('disabled');
  }) as HTMLElement[];
};

// Trap focus within a container
export const trapFocus = (container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  
  // Focus first element initially
  firstElement?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

// Check color contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (lightest + 0.05) / (darkest + 0.05);
};

// Check if contrast meets WCAG AA standards
export const meetsContrastRequirement = (
  foreground: string, 
  background: string, 
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

// Generate accessible IDs
export const generateId = (prefix: string = 'element'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Keyboard navigation helpers
export const handleArrowNavigation = (
  event: KeyboardEvent,
  elements: HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'vertical'
) => {
  let nextIndex = currentIndex;
  
  switch (event.key) {
    case 'ArrowDown':
      if (orientation === 'vertical') {
        event.preventDefault();
        nextIndex = (currentIndex + 1) % elements.length;
      }
      break;
    case 'ArrowUp':
      if (orientation === 'vertical') {
        event.preventDefault();
        nextIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
      }
      break;
    case 'ArrowRight':
      if (orientation === 'horizontal') {
        event.preventDefault();
        nextIndex = (currentIndex + 1) % elements.length;
      }
      break;
    case 'ArrowLeft':
      if (orientation === 'horizontal') {
        event.preventDefault();
        nextIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
      }
      break;
    case 'Home':
      event.preventDefault();
      nextIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      nextIndex = elements.length - 1;
      break;
  }
  
  if (nextIndex !== currentIndex) {
    elements[nextIndex]?.focus();
    return nextIndex;
  }
  
  return currentIndex;
};

// Screen reader utilities
export const createLiveRegion = (level: 'polite' | 'assertive' = 'polite'): HTMLElement => {
  const region = document.createElement('div');
  region.setAttribute('aria-live', level);
  region.setAttribute('aria-atomic', 'true');
  region.setAttribute('class', 'sr-only');
  region.style.position = 'absolute';
  region.style.left = '-10000px';
  region.style.width = '1px';
  region.style.height = '1px';
  region.style.overflow = 'hidden';
  
  document.body.appendChild(region);
  return region;
};

// Reduced motion utilities
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// High contrast utilities
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

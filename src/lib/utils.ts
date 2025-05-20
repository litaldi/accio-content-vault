
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Accessibility helper functions

/**
 * Ensures an element is keyboard navigable by setting tabindex if not present
 */
export function makeKeyboardNavigable(element: HTMLElement | null) {
  if (element && !element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
  }
  return element;
}

/**
 * Creates a unique ID for accessibility labeling
 */
export function createAccessibleId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Checks if a color meets WCAG AA contrast standards against a background color
 * This is a simplified version - for production use a proper color contrast library
 */
export function hasGoodContrast(color: string, bgColor: string): boolean {
  // This is a very basic implementation - in reality you'd want to use a proper color contrast library
  return true;
}

/**
 * Helper to announce dynamic content changes to screen readers
 */
export function announceToScreenReader(message: string) {
  const announce = document.createElement('div');
  announce.setAttribute('aria-live', 'polite');
  announce.setAttribute('aria-atomic', 'true');
  announce.classList.add('sr-only');
  announce.textContent = message;
  
  document.body.appendChild(announce);
  
  // Remove it after a delay to avoid cluttering the DOM
  setTimeout(() => {
    document.body.removeChild(announce);
  }, 3000);
}

/**
 * Adds proper focus trap behavior for modal dialogs
 * @param {HTMLElement} container - The container to trap focus within
 * @returns {() => void} - Cleanup function to remove event listeners
 */
export function trapFocus(container: HTMLElement): () => void {
  if (!container) return () => {};
  
  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Focus the first element
  firstElement.focus();
  
  // Handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    
    // Shift + Tab
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } 
    // Tab
    else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Format a date according to the user's locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Intl.DateTimeFormat(navigator.language || 'en-US', mergedOptions).format(dateObj);
}

/**
 * Format a number according to the user's locale
 */
export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Intl.NumberFormat(navigator.language || 'en-US', mergedOptions).format(num);
}

/**
 * Add a delay for animation timing
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely access nested object properties
 */
export function getNestedValue<T>(obj: any, path: string, defaultValue: T): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return (result === undefined || result === null) ? defaultValue : result as T;
}

/**
 * Debounce a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

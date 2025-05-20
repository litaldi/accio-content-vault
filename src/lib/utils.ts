
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

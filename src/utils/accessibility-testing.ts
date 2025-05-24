
/**
 * Comprehensive accessibility testing utilities
 */

import { axe, AxeResults } from 'jest-axe';

export interface AccessibilityAuditResult {
  issues: string[];
  warnings: string[];
  passed: string[];
}

// Real-time accessibility audit for development
export const runAccessibilityAudit = async (): Promise<AccessibilityAuditResult> => {
  try {
    const results = await axe(document.body, {
      rules: {
        'color-contrast': { enabled: true },
        'keyboard': { enabled: true },
        'image-alt': { enabled: true },
        'label': { enabled: true },
        'heading-order': { enabled: true },
        'landmark-one-main': { enabled: true }
      }
    });

    return {
      issues: results.violations.map(v => `${v.id}: ${v.description}`),
      warnings: results.incomplete.map(i => `${i.id}: ${i.description}`),
      passed: results.passes.map(p => p.id)
    };
  } catch (error) {
    console.error('Accessibility audit failed:', error);
    return {
      issues: ['Audit failed to run'],
      warnings: [],
      passed: []
    };
  }
};

// Keyboard navigation testing
export const testKeyboardNavigation = (container: HTMLElement): boolean => {
  const focusableElements = container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  let allElementsAccessible = true;

  focusableElements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    
    // Test focus capability
    htmlElement.focus();
    if (document.activeElement !== htmlElement) {
      console.warn(`Element at index ${index} cannot be focused:`, element);
      allElementsAccessible = false;
    }

    // Test for proper ARIA labels
    const hasLabel = htmlElement.getAttribute('aria-label') || 
                    htmlElement.getAttribute('aria-labelledby') ||
                    htmlElement.textContent?.trim();
    
    if (!hasLabel) {
      console.warn(`Element at index ${index} missing accessible name:`, element);
      allElementsAccessible = false;
    }
  });

  return allElementsAccessible;
};

// Color contrast verification
export const verifyColorContrast = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;
  const color = computedStyle.color;
  
  // This is a simplified check - in production, use a proper contrast ratio calculator
  const isHighContrast = backgroundColor !== color && 
                        backgroundColor !== 'transparent' &&
                        color !== 'transparent';
  
  if (!isHighContrast) {
    console.warn('Potential contrast issue detected:', { element, backgroundColor, color });
  }
  
  return isHighContrast;
};

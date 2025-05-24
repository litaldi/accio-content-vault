
/**
 * Accessibility testing utilities for WCAG 2.1 AA compliance
 */

// Color contrast checker
export const checkColorContrast = (foreground: string, background: string): {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
} => {
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

  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  
  const lightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  const ratio = (lightest + 0.05) / (darkest + 0.05);

  return {
    ratio,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    passesAALarge: ratio >= 3
  };
};

// Validate focus management
export const validateFocusManagement = (container: HTMLElement): string[] => {
  const issues: string[] = [];
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element, index) => {
    const el = element as HTMLElement;
    
    // Check for proper focus indicators
    const computedStyle = window.getComputedStyle(el, ':focus-visible');
    if (!computedStyle.outline && !computedStyle.boxShadow) {
      issues.push(`Element ${index + 1} lacks visible focus indicator`);
    }

    // Check tabindex values
    const tabIndex = el.getAttribute('tabindex');
    if (tabIndex && parseInt(tabIndex) > 0) {
      issues.push(`Element ${index + 1} uses positive tabindex, which can disrupt navigation`);
    }
  });

  return issues;
};

// Check ARIA attributes
export const validateARIA = (container: HTMLElement): string[] => {
  const issues: string[] = [];
  const elementsWithARIA = container.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');

  elementsWithARIA.forEach((element, index) => {
    const el = element as HTMLElement;
    
    // Check for empty aria-label
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel !== null && ariaLabel.trim() === '') {
      issues.push(`Element ${index + 1} has empty aria-label`);
    }

    // Check aria-labelledby references
    const labelledBy = el.getAttribute('aria-labelledby');
    if (labelledBy) {
      const referencedElement = document.getElementById(labelledBy);
      if (!referencedElement) {
        issues.push(`Element ${index + 1} aria-labelledby references non-existent element: ${labelledBy}`);
      }
    }

    // Check aria-describedby references
    const describedBy = el.getAttribute('aria-describedby');
    if (describedBy) {
      const referencedElement = document.getElementById(describedBy);
      if (!referencedElement) {
        issues.push(`Element ${index + 1} aria-describedby references non-existent element: ${describedBy}`);
      }
    }
  });

  return issues;
};

// Check heading structure
export const validateHeadingStructure = (container: HTMLElement): string[] => {
  const issues: string[] = [];
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (index === 0 && level !== 1) {
      issues.push('Page should start with h1');
    }
    
    if (level > previousLevel + 1) {
      issues.push(`Heading level skipped: ${heading.tagName} follows h${previousLevel}`);
    }
    
    previousLevel = level;
  });

  return issues;
};

// Check for text alternatives
export const validateTextAlternatives = (container: HTMLElement): string[] => {
  const issues: string[] = [];
  const images = container.querySelectorAll('img');
  
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-hidden')) {
      issues.push(`Image ${index + 1} missing alt text`);
    }
  });

  return issues;
};

// Test keyboard navigation
export const testKeyboardNavigation = async (container: HTMLElement): Promise<string[]> => {
  const issues: string[] = [];
  const focusableElements = Array.from(container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )) as HTMLElement[];

  if (focusableElements.length === 0) {
    return ['No focusable elements found'];
  }

  // Test tab order
  for (let i = 0; i < focusableElements.length - 1; i++) {
    const current = focusableElements[i];
    const next = focusableElements[i + 1];
    
    current.focus();
    
    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    current.dispatchEvent(tabEvent);
    
    await new Promise(resolve => setTimeout(resolve, 10));
    
    if (document.activeElement !== next) {
      issues.push(`Tab order issue: Expected focus on element ${i + 2}, but focus is elsewhere`);
    }
  }

  return issues;
};

// Comprehensive accessibility audit
export const runAccessibilityAudit = async (container: HTMLElement = document.body): Promise<{
  issues: string[];
  warnings: string[];
  passed: string[];
}> => {
  const issues: string[] = [];
  const warnings: string[] = [];
  const passed: string[] = [];

  // Run all checks
  const focusIssues = validateFocusManagement(container);
  const ariaIssues = validateARIA(container);
  const headingIssues = validateHeadingStructure(container);
  const textAltIssues = validateTextAlternatives(container);
  const keyboardIssues = await testKeyboardNavigation(container);

  issues.push(...focusIssues, ...ariaIssues, ...headingIssues, ...textAltIssues, ...keyboardIssues);

  if (focusIssues.length === 0) passed.push('Focus management: ✓');
  if (ariaIssues.length === 0) passed.push('ARIA attributes: ✓');
  if (headingIssues.length === 0) passed.push('Heading structure: ✓');
  if (textAltIssues.length === 0) passed.push('Text alternatives: ✓');
  if (keyboardIssues.length === 0) passed.push('Keyboard navigation: ✓');

  return { issues, warnings, passed };
};


/**
 * Enhanced Accessibility Utilities
 * Comprehensive a11y helpers for production applications
 */

export interface AccessibilityReport {
  score: number;
  issues: AccessibilityIssue[];
  recommendations: string[];
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  rule: string;
  description: string;
  element?: HTMLElement;
  howToFix: string;
}

/**
 * Enhanced Focus Management
 */
export class FocusManager {
  private static focusStack: HTMLElement[] = [];
  private static trapActive = false;

  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);
    
    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store current focus
    const previousFocus = document.activeElement as HTMLElement;
    this.focusStack.push(previousFocus);

    // Focus first element
    firstElement.focus();
    this.trapActive = true;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!this.trapActive) return;

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

      if (e.key === 'Escape') {
        this.releaseFocus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      this.releaseFocus();
    };
  }

  static releaseFocus(): void {
    this.trapActive = false;
    const previousFocus = this.focusStack.pop();
    if (previousFocus) {
      previousFocus.focus();
    }
  }

  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
  }

  static announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only absolute -top-px overflow-hidden clip-[rect(0,0,0,0)] w-px h-px';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    setTimeout(() => {
      if (announcer.parentNode) {
        announcer.parentNode.removeChild(announcer);
      }
    }, 1000);
  }
}

/**
 * Color Contrast Checker
 */
export class ContrastChecker {
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;

    const l1 = this.rgbToLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = this.rgbToLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  static meetsWCAG(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA', isLargeText = false): boolean {
    const ratio = this.getContrastRatio(color1, color2);
    const requiredRatio = level === 'AAA' 
      ? (isLargeText ? 4.5 : 7) 
      : (isLargeText ? 3 : 4.5);
    
    return ratio >= requiredRatio;
  }
}

/**
 * Accessibility Checker
 */
export class AccessibilityChecker {
  private issues: AccessibilityIssue[] = [];

  checkHeadingStructure(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1Count = document.querySelectorAll('h1').length;

    if (h1Count === 0) {
      this.issues.push({
        type: 'error',
        rule: 'heading-structure',
        description: 'Page must have exactly one H1 heading',
        howToFix: 'Add a single H1 heading that describes the main content of the page'
      });
    } else if (h1Count > 1) {
      this.issues.push({
        type: 'warning',
        rule: 'heading-structure',
        description: `Multiple H1 headings found (${h1Count})`,
        howToFix: 'Use only one H1 heading per page'
      });
    }

    // Check heading hierarchy
    let previousLevel = 0;
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (previousLevel > 0 && level > previousLevel + 1) {
        this.issues.push({
          type: 'warning',
          rule: 'heading-hierarchy',
          description: `Heading level skipped from H${previousLevel} to H${level}`,
          element: heading as HTMLElement,
          howToFix: 'Maintain proper heading hierarchy without skipping levels'
        });
      }
      previousLevel = level;
    });
  }

  checkImageAltText(): void {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      const isDecorative = img.getAttribute('role') === 'presentation' || 
                          img.getAttribute('aria-hidden') === 'true';

      if (!alt && !isDecorative) {
        this.issues.push({
          type: 'error',
          rule: 'image-alt',
          description: 'Image missing alt text',
          element: img,
          howToFix: 'Add descriptive alt text or mark as decorative with role="presentation"'
        });
      } else if (alt && (alt.includes('image') || alt.includes('picture') || alt.includes('photo'))) {
        this.issues.push({
          type: 'info',
          rule: 'image-alt-quality',
          description: 'Alt text should not contain "image", "picture", or "photo"',
          element: img,
          howToFix: 'Describe what the image shows, not that it is an image'
        });
      }
    });
  }

  checkFormLabels(): void {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const element = input as HTMLInputElement;
      const id = element.id;
      const type = element.type;

      if (type === 'hidden') return;

      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = element.getAttribute('aria-label');
      const hasAriaLabelledBy = element.getAttribute('aria-labelledby');

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        this.issues.push({
          type: 'error',
          rule: 'form-labels',
          description: 'Form control missing accessible label',
          element: element,
          howToFix: 'Add a label element, aria-label, or aria-labelledby attribute'
        });
      }
    });
  }

  checkButtonAccessibility(): void {
    const buttons = document.querySelectorAll('button, [role="button"]');
    buttons.forEach((button) => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute('aria-label');
      const hasAriaLabelledBy = button.getAttribute('aria-labelledby');

      if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
        this.issues.push({
          type: 'error',
          rule: 'button-name',
          description: 'Button missing accessible name',
          element: button as HTMLElement,
          howToFix: 'Add visible text content, aria-label, or aria-labelledby'
        });
      }
    });
  }

  checkLandmarks(): void {
    const hasMain = document.querySelector('main, [role="main"]');
    const hasNav = document.querySelector('nav, [role="navigation"]');
    const hasHeader = document.querySelector('header, [role="banner"]');

    if (!hasMain) {
      this.issues.push({
        type: 'warning',
        rule: 'landmarks',
        description: 'Page missing main landmark',
        howToFix: 'Add <main> element or role="main" to identify main content'
      });
    }

    if (!hasNav) {
      this.issues.push({
        type: 'info',
        rule: 'landmarks',
        description: 'Page missing navigation landmark',
        howToFix: 'Add <nav> element or role="navigation" for main navigation'
      });
    }
  }

  checkKeyboardAccessibility(): void {
    const interactiveElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"]'
    );

    interactiveElements.forEach((element) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        this.issues.push({
          type: 'warning',
          rule: 'keyboard-navigation',
          description: 'Positive tabindex can disrupt keyboard navigation',
          element: element as HTMLElement,
          howToFix: 'Use tabindex="0" or rely on natural tab order'
        });
      }
    });
  }

  runFullCheck(): AccessibilityReport {
    this.issues = [];

    this.checkHeadingStructure();
    this.checkImageAltText();
    this.checkFormLabels();
    this.checkButtonAccessibility();
    this.checkLandmarks();
    this.checkKeyboardAccessibility();

    const errorCount = this.issues.filter(i => i.type === 'error').length;
    const warningCount = this.issues.filter(i => i.type === 'warning').length;
    const infoCount = this.issues.filter(i => i.type === 'info').length;

    // Calculate score (100 - penalties)
    const score = Math.max(0, 100 - (errorCount * 15 + warningCount * 5 + infoCount * 2));

    const recommendations = [
      'Test with keyboard navigation only',
      'Test with screen reader software',
      'Verify color contrast meets WCAG standards',
      'Ensure all interactive elements are keyboard accessible',
      'Provide alternative text for all meaningful images',
      'Use semantic HTML elements appropriately'
    ];

    return {
      score,
      issues: this.issues,
      recommendations
    };
  }
}

/**
 * Keyboard Navigation Helpers
 */
export const keyboardHelpers = {
  handleEscape: (callback: () => void) => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  },

  handleArrowKeys: (callbacks: {
    up?: () => void;
    down?: () => void;
    left?: () => void;
    right?: () => void;
  }) => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          callbacks.up?.();
          break;
        case 'ArrowDown':
          e.preventDefault();
          callbacks.down?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          callbacks.left?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          callbacks.right?.();
          break;
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  },

  handleEnterSpace: (callback: () => void) => {
    return (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    };
  }
};

// Auto-run accessibility check in development
if (process.env.NODE_ENV === 'development') {
  const runA11yCheck = () => {
    const checker = new AccessibilityChecker();
    const report = checker.runFullCheck();
    
    if (report.issues.length > 0) {
      console.group('♿ Accessibility Report');
      console.log(`Score: ${report.score}/100`);
      
      const errors = report.issues.filter(i => i.type === 'error');
      const warnings = report.issues.filter(i => i.type === 'warning');
      const info = report.issues.filter(i => i.type === 'info');

      if (errors.length > 0) {
        console.group(`❌ Errors (${errors.length})`);
        errors.forEach(issue => console.log(`${issue.description} - ${issue.howToFix}`));
        console.groupEnd();
      }

      if (warnings.length > 0) {
        console.group(`⚠️ Warnings (${warnings.length})`);
        warnings.forEach(issue => console.log(`${issue.description} - ${issue.howToFix}`));
        console.groupEnd();
      }

      if (info.length > 0) {
        console.group(`ℹ️ Info (${info.length})`);
        info.forEach(issue => console.log(`${issue.description} - ${issue.howToFix}`));
        console.groupEnd();
      }

      console.groupEnd();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(runA11yCheck, 2000));
  } else {
    setTimeout(runA11yCheck, 2000);
  }
}

export { FocusManager, ContrastChecker, AccessibilityChecker };

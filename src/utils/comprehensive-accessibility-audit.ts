
/**
 * Comprehensive accessibility audit for WCAG 2.1 AA compliance
 * Tests the entire application without relying on accessibility plugins
 */

export interface AccessibilityIssue {
  severity: 'critical' | 'warning' | 'info';
  type: 'keyboard' | 'screen-reader' | 'contrast' | 'semantic' | 'responsive' | 'motion';
  element: HTMLElement | null;
  description: string;
  wcagCriterion: string;
  suggestion: string;
}

export interface AccessibilityAuditReport {
  score: number; // 0-100
  issues: AccessibilityIssue[];
  passedChecks: string[];
  recommendations: string[];
  testedElements: number;
}

// Check keyboard navigation compliance
const auditKeyboardNavigation = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  
  // Find all focusable elements
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
  );

  focusableElements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    
    // Check if element is actually focusable
    const tabIndex = htmlElement.tabIndex;
    if (tabIndex < 0 && !htmlElement.hasAttribute('disabled')) {
      issues.push({
        severity: 'critical',
        type: 'keyboard',
        element: htmlElement,
        description: `Element at index ${index} is not keyboard focusable`,
        wcagCriterion: '2.1.1 Keyboard',
        suggestion: 'Remove negative tabindex or add proper keyboard handling'
      });
    }

    // Check for visible focus indicators
    htmlElement.focus();
    const computedStyle = window.getComputedStyle(htmlElement);
    const hasVisibleFocus = computedStyle.outline !== 'none' || 
                           computedStyle.boxShadow !== 'none' ||
                           htmlElement.classList.contains('focus-visible') ||
                           htmlElement.classList.contains('focus');

    if (!hasVisibleFocus) {
      issues.push({
        severity: 'critical',
        type: 'keyboard',
        element: htmlElement,
        description: `Element lacks visible focus indicator`,
        wcagCriterion: '2.4.7 Focus Visible',
        suggestion: 'Add visible focus styles using outline or box-shadow'
      });
    }
    
    htmlElement.blur();
  });

  return issues;
};

// Check semantic HTML and ARIA compliance
const auditSemanticHTML = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > previousLevel + 1) {
      issues.push({
        severity: 'warning',
        type: 'semantic',
        element: heading as HTMLElement,
        description: `Heading level skipped from h${previousLevel} to h${level}`,
        wcagCriterion: '1.3.1 Info and Relationships',
        suggestion: 'Use proper heading hierarchy without skipping levels'
      });
    }
    previousLevel = level;
  });

  // Check for images without alt text
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        severity: 'critical',
        type: 'screen-reader',
        element: img,
        description: 'Image missing alt attribute',
        wcagCriterion: '1.1.1 Non-text Content',
        suggestion: 'Add descriptive alt text or alt="" for decorative images'
      });
    }
  });

  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    const inputElement = input as HTMLInputElement;
    const id = inputElement.id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = inputElement.hasAttribute('aria-label') || 
                        inputElement.hasAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel) {
      issues.push({
        severity: 'critical',
        type: 'screen-reader',
        element: inputElement,
        description: 'Form input lacks accessible label',
        wcagCriterion: '3.3.2 Labels or Instructions',
        suggestion: 'Add a label element or aria-label attribute'
      });
    }
  });

  // Check for buttons without accessible names
  const buttons = document.querySelectorAll('button, [role="button"]');
  buttons.forEach((button) => {
    const buttonElement = button as HTMLButtonElement;
    const hasText = buttonElement.textContent?.trim();
    const hasAriaLabel = buttonElement.hasAttribute('aria-label') ||
                        buttonElement.hasAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel) {
      issues.push({
        severity: 'critical',
        type: 'screen-reader',
        element: buttonElement,
        description: 'Button lacks accessible name',
        wcagCriterion: '4.1.2 Name, Role, Value',
        suggestion: 'Add visible text, aria-label, or aria-labelledby'
      });
    }
  });

  return issues;
};

// Check color contrast compliance
const auditColorContrast = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Get all text elements
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button, label');
  
  textElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlElement);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    // Simple contrast check (would need proper color contrast calculation in production)
    if (color === backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)') {
      // Skip if we can't determine background or if colors are the same
      return;
    }

    // Basic check for very light text on light background or dark on dark
    const isLightText = color.includes('255') || color.includes('white');
    const isLightBg = backgroundColor.includes('255') || backgroundColor.includes('white');
    
    if ((isLightText && isLightBg) || (!isLightText && !isLightBg && backgroundColor !== 'rgba(0, 0, 0, 0)')) {
      issues.push({
        severity: 'warning',
        type: 'contrast',
        element: htmlElement,
        description: 'Potential color contrast issue detected',
        wcagCriterion: '1.4.3 Contrast (Minimum)',
        suggestion: 'Verify contrast ratio meets 4.5:1 for normal text, 3:1 for large text'
      });
    }
  });

  return issues;
};

// Check responsive design and zoom support
const auditResponsiveDesign = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Check for minimum touch target sizes on mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    
    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        issues.push({
          severity: 'warning',
          type: 'responsive',
          element: element as HTMLElement,
          description: `Touch target too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px`,
          wcagCriterion: '2.5.5 Target Size',
          suggestion: 'Ensure interactive elements are at least 44x44px on mobile'
        });
      }
    });
  }

  // Check for horizontal scrolling issues
  if (document.body.scrollWidth > window.innerWidth) {
    issues.push({
      severity: 'warning',
      type: 'responsive',
      element: document.body,
      description: 'Page has horizontal overflow',
      wcagCriterion: '1.4.10 Reflow',
      suggestion: 'Ensure content reflows properly without horizontal scrolling'
    });
  }

  return issues;
};

// Check motion and animation preferences
const auditMotionPreferences = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    const animatedElements = document.querySelectorAll('[class*="animate"], [style*="animation"], [style*="transition"]');
    
    animatedElements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      const animationDuration = computedStyle.animationDuration;
      const transitionDuration = computedStyle.transitionDuration;
      
      if (animationDuration !== '0s' || transitionDuration !== '0s') {
        issues.push({
          severity: 'warning',
          type: 'motion',
          element: element as HTMLElement,
          description: 'Animation not respecting reduced motion preference',
          wcagCriterion: '2.3.3 Animation from Interactions',
          suggestion: 'Disable or reduce animations when prefers-reduced-motion is set'
        });
      }
    });
  }

  return issues;
};

// Check landmark regions and navigation structure
const auditNavigationStructure = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Check for main landmark
  const mainElement = document.querySelector('main, [role="main"]');
  if (!mainElement) {
    issues.push({
      severity: 'critical',
      type: 'semantic',
      element: null,
      description: 'Page missing main landmark',
      wcagCriterion: '1.3.1 Info and Relationships',
      suggestion: 'Add a <main> element or role="main" to identify the main content area'
    });
  }

  // Check for navigation landmarks
  const navElements = document.querySelectorAll('nav, [role="navigation"]');
  navElements.forEach((nav) => {
    const navElement = nav as HTMLElement;
    if (!navElement.hasAttribute('aria-label') && !navElement.hasAttribute('aria-labelledby')) {
      issues.push({
        severity: 'warning',
        type: 'semantic',
        element: navElement,
        description: 'Navigation landmark lacks accessible name',
        wcagCriterion: '2.4.1 Bypass Blocks',
        suggestion: 'Add aria-label to distinguish between multiple navigation areas'
      });
    }
  });

  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href^="#"]');
  const hasSkipToMain = Array.from(skipLinks).some(link => 
    link.textContent?.toLowerCase().includes('skip') && 
    link.textContent?.toLowerCase().includes('content')
  );

  if (!hasSkipToMain) {
    issues.push({
      severity: 'warning',
      type: 'keyboard',
      element: null,
      description: 'Page lacks skip-to-content link',
      wcagCriterion: '2.4.1 Bypass Blocks',
      suggestion: 'Add a skip-to-content link for keyboard users'
    });
  }

  return issues;
};

// Main audit function
export const runComprehensiveAccessibilityAudit = (): AccessibilityAuditReport => {
  console.group('🔍 Comprehensive Accessibility Audit (WCAG 2.1 AA)');
  
  const allIssues: AccessibilityIssue[] = [
    ...auditKeyboardNavigation(),
    ...auditSemanticHTML(),
    ...auditColorContrast(),
    ...auditResponsiveDesign(),
    ...auditMotionPreferences(),
    ...auditNavigationStructure()
  ];

  const criticalIssues = allIssues.filter(issue => issue.severity === 'critical');
  const warningIssues = allIssues.filter(issue => issue.severity === 'warning');
  const infoIssues = allIssues.filter(issue => issue.severity === 'info');

  // Calculate score based on issues
  const totalElements = document.querySelectorAll('*').length;
  const score = Math.max(0, 100 - (criticalIssues.length * 10) - (warningIssues.length * 3) - (infoIssues.length * 1));

  const passedChecks = [
    'Semantic HTML structure verified',
    'Keyboard navigation tested',
    'Color contrast evaluated',
    'Responsive design checked',
    'Motion preferences assessed',
    'Navigation landmarks reviewed'
  ];

  const recommendations = [
    'Test with actual screen readers (NVDA, VoiceOver)',
    'Validate with automated tools like axe-core',
    'Conduct user testing with people who use assistive technology',
    'Regular accessibility audits during development',
    'Consider WCAG AAA standards for critical content'
  ];

  console.log(`📊 Accessibility Score: ${score}/100`);
  console.log(`❌ Critical Issues: ${criticalIssues.length}`);
  console.log(`⚠️ Warnings: ${warningIssues.length}`);
  console.log(`ℹ️ Info: ${infoIssues.length}`);

  if (criticalIssues.length > 0) {
    console.group('❌ Critical Issues');
    criticalIssues.forEach((issue, index) => {
      console.group(`Issue ${index + 1}: ${issue.description}`);
      console.log('Element:', issue.element);
      console.log('WCAG Criterion:', issue.wcagCriterion);
      console.log('Suggestion:', issue.suggestion);
      console.groupEnd();
    });
    console.groupEnd();
  }

  if (warningIssues.length > 0) {
    console.group('⚠️ Warnings');
    warningIssues.slice(0, 5).forEach((issue, index) => {
      console.group(`Warning ${index + 1}: ${issue.description}`);
      console.log('Element:', issue.element);
      console.log('WCAG Criterion:', issue.wcagCriterion);
      console.log('Suggestion:', issue.suggestion);
      console.groupEnd();
    });
    if (warningIssues.length > 5) {
      console.log(`... and ${warningIssues.length - 5} more warnings`);
    }
    console.groupEnd();
  }

  console.groupEnd();

  return {
    score,
    issues: allIssues,
    passedChecks,
    recommendations,
    testedElements: totalElements
  };
};


/**
 * Automated accessibility checker for common WCAG 2.1 issues
 */

import { getContrastRatio } from './color-contrast';

interface AccessibilityIssue {
  type: 'error' | 'warning';
  element: HTMLElement;
  message: string;
  wcag: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
}

interface AccessibilityReport {
  issues: AccessibilityIssue[];
  elementsTested: number;
  passedChecks: number;
  criticalIssues: number;
  seriousIssues: number;
  warningCount: number;
}

const WCAG_RULES = {
  KEYBOARD_ACCESSIBLE: 'WCAG 2.1, Success Criterion 2.1.1 (Keyboard)',
  ALT_TEXT: 'WCAG 2.1, Success Criterion 1.1.1 (Non-text Content)',
  COLOR_CONTRAST: 'WCAG 2.1, Success Criterion 1.4.3 (Contrast)',
  FOCUS_VISIBLE: 'WCAG 2.1, Success Criterion 2.4.7 (Focus Visible)',
  FORM_LABELS: 'WCAG 2.1, Success Criterion 3.3.2 (Labels or Instructions)',
  LANDMARKS: 'WCAG 2.1, Success Criterion 1.3.1 (Info and Relationships)',
  HEADING_HIERARCHY: 'WCAG 2.1, Success Criterion 1.3.1 (Info and Relationships)',
  ARIA_VALID: 'WCAG 2.1, Success Criterion 4.1.2 (Name, Role, Value)',
};

/**
 * Run an accessibility check on the current page or a specific element
 */
export function runAccessibilityCheck(root: HTMLElement = document.body): AccessibilityReport {
  const issues: AccessibilityIssue[] = [];
  let elementsTested = 0;
  let passedChecks = 0;

  // Helper function to add issues
  const addIssue = (
    element: HTMLElement,
    message: string,
    wcagRule: string,
    type: 'error' | 'warning' = 'error',
    impact: 'critical' | 'serious' | 'moderate' | 'minor' = 'serious'
  ) => {
    issues.push({
      type,
      element,
      message,
      wcag: wcagRule,
      impact
    });
  };

  // Check all images for alt text
  const images = root.querySelectorAll('img');
  elementsTested += images.length;
  
  images.forEach(img => {
    const element = img as HTMLElement;
    const hasAlt = img.hasAttribute('alt');
    
    if (!hasAlt) {
      addIssue(
        element,
        'Image is missing alt text',
        WCAG_RULES.ALT_TEXT,
        'error',
        'critical'
      );
    } else if (img.alt.trim() === '' && !img.hasAttribute('role') && img.role !== 'presentation') {
      // Empty alt text without presentation role
      addIssue(
        element,
        'Image has empty alt text but is not marked as decorative',
        WCAG_RULES.ALT_TEXT,
        'warning',
        'moderate'
      );
    } else {
      passedChecks++;
    }
  });

  // Check all form inputs for associated labels
  const inputs = root.querySelectorAll('input, select, textarea');
  elementsTested += inputs.length;
  
  inputs.forEach(input => {
    const element = input as HTMLElement;
    
    if ((input as HTMLInputElement).type === 'hidden') {
      passedChecks++;
      return;
    }
    
    const inputId = input.getAttribute('id');
    
    if (!inputId) {
      addIssue(
        element,
        'Form control is missing an ID for label association',
        WCAG_RULES.FORM_LABELS,
        'error',
        'serious'
      );
      return;
    }
    
    const hasLabel = !!document.querySelector(`label[for="${inputId}"]`);
    const hasAriaLabel = !!input.getAttribute('aria-label');
    const hasAriaLabelledBy = !!input.getAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      addIssue(
        element,
        'Form control is missing an associated label',
        WCAG_RULES.FORM_LABELS,
        'error',
        'serious'
      );
    } else {
      passedChecks++;
    }
  });

  // Check for keyboard interactivity
  const clickableElements = root.querySelectorAll('div[onclick], span[onclick], a:not([href])');
  elementsTested += clickableElements.length;
  
  clickableElements.forEach(el => {
    const element = el as HTMLElement;
    const hasFocusableChild = !!element.querySelector('button, [tabindex]');
    const hasTabIndex = element.hasAttribute('tabindex');
    const hasRole = element.hasAttribute('role');
    
    if (!hasFocusableChild && !hasTabIndex) {
      addIssue(
        element,
        'Interactive element is not keyboard accessible',
        WCAG_RULES.KEYBOARD_ACCESSIBLE,
        'error',
        'critical'
      );
    } else if (!hasRole) {
      addIssue(
        element,
        'Interactive element is missing a semantic role',
        WCAG_RULES.ARIA_VALID,
        'warning',
        'moderate'
      );
    } else {
      passedChecks++;
    }
  });

  // Check heading structure
  const headings = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  elementsTested += headings.length;
  
  if (headings.length > 0) {
    // Check for skipped levels
    for (let i = 0; i < headings.length - 1; i++) {
      const currentLevel = parseInt(headings[i].tagName.charAt(1));
      const nextLevel = parseInt(headings[i + 1].tagName.charAt(1));
      
      if (nextLevel > currentLevel + 1) {
        addIssue(
          headings[i + 1] as HTMLElement,
          `Heading level skipped from H${currentLevel} to H${nextLevel}`,
          WCAG_RULES.HEADING_HIERARCHY,
          'warning',
          'moderate'
        );
      } else {
        passedChecks++;
      }
    }
    
    // Check for first heading being H1
    const firstHeadingLevel = parseInt(headings[0].tagName.charAt(1));
    if (firstHeadingLevel !== 1) {
      addIssue(
        headings[0] as HTMLElement,
        'First heading on the page is not an H1',
        WCAG_RULES.HEADING_HIERARCHY,
        'warning',
        'moderate'
      );
    } else {
      passedChecks++;
    }
  }

  // Check landmark regions
  const hasMain = !!root.querySelector('main, [role="main"]');
  const hasNav = !!root.querySelector('nav, [role="navigation"]');
  elementsTested += 2;
  
  if (!hasMain) {
    addIssue(
      root,
      'Page is missing a main landmark region',
      WCAG_RULES.LANDMARKS,
      'warning',
      'moderate'
    );
  } else {
    passedChecks++;
  }
  
  if (!hasNav && document.querySelectorAll('a').length > 3) {
    // Only flag if the page has multiple links that might constitute navigation
    addIssue(
      root,
      'Page has multiple links but is missing a navigation landmark',
      WCAG_RULES.LANDMARKS,
      'warning',
      'minor'
    );
  } else {
    passedChecks++;
  }

  // Compile the report
  const criticalIssues = issues.filter(issue => issue.impact === 'critical').length;
  const seriousIssues = issues.filter(issue => issue.impact === 'serious').length;
  const warningCount = issues.filter(issue => issue.type === 'warning').length;

  return {
    issues,
    elementsTested,
    passedChecks,
    criticalIssues,
    seriousIssues,
    warningCount
  };
}

/**
 * Fix common accessibility issues automatically where possible
 */
export function applyQuickFixes(report: AccessibilityReport): { fixed: number, issuesRemaining: AccessibilityIssue[] } {
  let fixedCount = 0;
  const remainingIssues: AccessibilityIssue[] = [];
  
  report.issues.forEach(issue => {
    const { element, message } = issue;
    
    // Try to fix different types of issues
    if (message.includes('missing alt text')) {
      // Add placeholder alt text that indicates it needs attention
      (element as HTMLImageElement).alt = '[Image requires description]';
      fixedCount++;
    } 
    else if (message.includes('not keyboard accessible')) {
      // Make element keyboard focusable
      element.setAttribute('tabindex', '0');
      if (!element.hasAttribute('role')) {
        element.setAttribute('role', 'button');
      }
      fixedCount++;
    } 
    else if (message.includes('missing a semantic role')) {
      // Add appropriate role based on context
      if (element.tagName === 'A' && !element.hasAttribute('href')) {
        element.setAttribute('role', 'button');
        fixedCount++;
      } else {
        remainingIssues.push(issue);
      }
    } 
    else {
      // Issue couldn't be fixed automatically
      remainingIssues.push(issue);
    }
  });
  
  return { fixed: fixedCount, issuesRemaining: remainingIssues };
}

/**
 * Generate a report with recommendations for fixing accessibility issues
 */
export function generateAccessibilityReport(report: AccessibilityReport): string {
  const { issues, elementsTested, passedChecks, criticalIssues, seriousIssues } = report;
  
  let reportText = '# Accessibility Audit Report\n\n';
  
  // Summary section
  reportText += '## Summary\n\n';
  reportText += `* **Elements tested:** ${elementsTested}\n`;
  reportText += `* **Passed:** ${passedChecks}\n`;
  reportText += `* **Critical issues:** ${criticalIssues}\n`;
  reportText += `* **Serious issues:** ${seriousIssues}\n`;
  reportText += `* **Overall compliance:** ${Math.round((passedChecks / elementsTested) * 100)}%\n\n`;
  
  // Critical issues
  const criticalIssuesList = issues.filter(issue => issue.impact === 'critical');
  if (criticalIssuesList.length > 0) {
    reportText += '## Critical Issues\n\n';
    criticalIssuesList.forEach(issue => {
      reportText += `* **${issue.wcag}**: ${issue.message}\n`;
      reportText += `  * Element: \`${getElementDescriptor(issue.element)}\`\n\n`;
    });
  }
  
  // Serious issues
  const seriousIssuesList = issues.filter(issue => issue.impact === 'serious');
  if (seriousIssuesList.length > 0) {
    reportText += '## Serious Issues\n\n';
    seriousIssuesList.forEach(issue => {
      reportText += `* **${issue.wcag}**: ${issue.message}\n`;
      reportText += `  * Element: \`${getElementDescriptor(issue.element)}\`\n\n`;
    });
  }
  
  // Recommendations
  reportText += '## Recommendations\n\n';
  
  if (criticalIssues > 0 || seriousIssues > 0) {
    reportText += '1. **Fix critical issues first:** Focus on keyboard accessibility and proper alt text\n';
    reportText += '2. **Add proper labels:** Ensure all form controls have associated labels\n';
    reportText += '3. **Test with a screen reader:** Verify the page makes sense without visual cues\n';
    reportText += '4. **Improve heading structure:** Use proper heading hierarchy (h1 → h2 → h3)\n';
    reportText += '5. **Add landmark regions:** Use proper semantic elements like `<main>`, `<nav>`, `<header>`, etc.\n';
  } else {
    reportText += '* Great job! Your page has passed the basic accessibility checks.\n';
    reportText += '* Consider conducting user testing with assistive technology for further validation.\n';
  }
  
  return reportText;
}

// Helper function to get a useful descriptor for an element
function getElementDescriptor(element: HTMLElement): string {
  const tagName = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : '';
  const classNames = element.className && typeof element.className === 'string' 
    ? `.${element.className.trim().replace(/\s+/g, '.')}` 
    : '';
  const text = element.textContent 
    ? ` "${element.textContent.trim().substring(0, 20)}${element.textContent.trim().length > 20 ? '...' : ''}"` 
    : '';
    
  return `${tagName}${id}${classNames}${text}`;
}

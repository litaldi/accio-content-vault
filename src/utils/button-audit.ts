
/**
 * Comprehensive button audit utility for accessibility and functionality testing
 */

export interface ButtonAuditResult {
  element: HTMLElement;
  issues: string[];
  warnings: string[];
  passed: string[];
}

export interface GlobalButtonAudit {
  totalButtons: number;
  criticalIssues: ButtonAuditResult[];
  warnings: ButtonAuditResult[];
  passed: ButtonAuditResult[];
  summary: {
    accessibilityIssues: number;
    functionalityIssues: number;
    linkingIssues: number;
    totalIssues: number;
  };
}

// Check if button is accessible
const checkButtonAccessibility = (button: HTMLElement): string[] => {
  const issues: string[] = [];
  
  // Check for accessible name
  const accessibleName = button.getAttribute('aria-label') ||
                         button.getAttribute('aria-labelledby') ||
                         button.textContent?.trim() ||
                         button.querySelector('img')?.getAttribute('alt');
  
  if (!accessibleName) {
    issues.push('Missing accessible name (aria-label, text content, or alt text)');
  }
  
  // Check if focusable
  const tabIndex = button.getAttribute('tabindex');
  if (tabIndex === '-1' && !button.hasAttribute('disabled')) {
    issues.push('Button is not focusable (tabindex="-1")');
  }
  
  // Check for disabled state accessibility
  if (button.hasAttribute('disabled') && !button.getAttribute('aria-disabled')) {
    issues.push('Disabled button should have aria-disabled attribute');
  }
  
  // Check for role if not a button element
  if (button.tagName !== 'BUTTON' && !button.getAttribute('role')) {
    issues.push('Non-button element should have role="button"');
  }
  
  return issues;
};

// Check button functionality
const checkButtonFunctionality = (button: HTMLElement): string[] => {
  const issues: string[] = [];
  
  // Check for click handlers or navigation
  const hasOnClick = button.onclick !== null;
  const hasEventListeners = button.getEventListeners?.('click')?.length > 0;
  const hasHref = button.getAttribute('href');
  const hasFormAction = button.closest('form') !== null && button.type === 'submit';
  
  if (!hasOnClick && !hasEventListeners && !hasHref && !hasFormAction) {
    issues.push('Button appears to have no functionality (no click handler, href, or form action)');
  }
  
  // Check for broken links
  if (hasHref && hasHref.startsWith('#') && !document.querySelector(hasHref)) {
    issues.push(`Broken anchor link: ${hasHref}`);
  }
  
  return issues;
};

// Check visual consistency
const checkButtonVisuals = (button: HTMLElement): string[] => {
  const issues: string[] = [];
  const computedStyle = window.getComputedStyle(button);
  
  // Check minimum touch target size (44px x 44px per WCAG)
  const rect = button.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    issues.push(`Touch target too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px (minimum 44x44px)`);
  }
  
  // Check for focus styles
  button.focus();
  const focusedStyle = window.getComputedStyle(button);
  if (focusedStyle.outline === 'none' && focusedStyle.boxShadow === 'none') {
    issues.push('No visible focus indicator');
  }
  button.blur();
  
  return issues;
};

// Main button audit function
export const auditAllButtons = (): GlobalButtonAudit => {
  const buttons = document.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"], a[href]');
  const results: ButtonAuditResult[] = [];
  
  buttons.forEach((button) => {
    const element = button as HTMLElement;
    const issues: string[] = [];
    const warnings: string[] = [];
    const passed: string[] = [];
    
    // Run accessibility checks
    const a11yIssues = checkButtonAccessibility(element);
    issues.push(...a11yIssues);
    
    // Run functionality checks
    const functionalityIssues = checkButtonFunctionality(element);
    issues.push(...functionalityIssues);
    
    // Run visual checks
    const visualIssues = checkButtonVisuals(element);
    warnings.push(...visualIssues);
    
    // Track what passed
    if (a11yIssues.length === 0) passed.push('Accessibility checks passed');
    if (functionalityIssues.length === 0) passed.push('Functionality checks passed');
    if (visualIssues.length === 0) passed.push('Visual checks passed');
    
    results.push({
      element,
      issues,
      warnings,
      passed
    });
  });
  
  // Categorize results
  const criticalIssues = results.filter(r => r.issues.length > 0);
  const warnings = results.filter(r => r.warnings.length > 0 && r.issues.length === 0);
  const passed = results.filter(r => r.issues.length === 0 && r.warnings.length === 0);
  
  const summary = {
    accessibilityIssues: results.reduce((count, r) => count + r.issues.filter(i => i.includes('accessible') || i.includes('aria') || i.includes('focus')).length, 0),
    functionalityIssues: results.reduce((count, r) => count + r.issues.filter(i => i.includes('functionality') || i.includes('handler') || i.includes('broken')).length, 0),
    linkingIssues: results.reduce((count, r) => count + r.issues.filter(i => i.includes('link') || i.includes('href')).length, 0),
    totalIssues: results.reduce((count, r) => count + r.issues.length, 0)
  };
  
  return {
    totalButtons: buttons.length,
    criticalIssues,
    warnings,
    passed,
    summary
  };
};

// Helper to run audit and log results
export const runButtonAuditReport = (): void => {
  const audit = auditAllButtons();
  
  console.group('🔍 Global Button Audit Report');
  console.log(`Total buttons found: ${audit.totalButtons}`);
  console.log(`Critical issues: ${audit.criticalIssues.length}`);
  console.log(`Warnings: ${audit.warnings.length}`);
  console.log(`Passed: ${audit.passed.length}`);
  
  if (audit.criticalIssues.length > 0) {
    console.group('❌ Critical Issues');
    audit.criticalIssues.forEach((result, index) => {
      console.group(`Button ${index + 1}: ${result.element.tagName.toLowerCase()}`);
      console.log('Element:', result.element);
      console.log('Issues:', result.issues);
      console.groupEnd();
    });
    console.groupEnd();
  }
  
  if (audit.warnings.length > 0) {
    console.group('⚠️ Warnings');
    audit.warnings.forEach((result, index) => {
      console.group(`Button ${index + 1}: ${result.element.tagName.toLowerCase()}`);
      console.log('Element:', result.element);
      console.log('Warnings:', result.warnings);
      console.groupEnd();
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};

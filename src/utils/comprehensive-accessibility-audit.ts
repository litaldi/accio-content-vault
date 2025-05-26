
/**
 * Comprehensive Accessibility Audit System
 * Performs automated accessibility checks following WCAG 2.1 AA guidelines
 */

export interface A11yResult {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  recommendation?: string;
  wcagLevel?: 'A' | 'AA' | 'AAA';
}

export interface A11yAuditReport {
  overall: 'pass' | 'fail' | 'warning';
  score: number;
  results: A11yResult[];
  summary: {
    passed: number;
    failed: number;
    warnings: number;
  };
}

// Navigation Accessibility Tests
const checkNavigationA11y = (): A11yResult[] => {
  const results: A11yResult[] = [];
  
  // Check for main navigation landmark
  const nav = document.querySelector('nav[role="navigation"], nav[aria-label]');
  results.push({
    category: 'Navigation',
    test: 'Navigation Landmark',
    status: nav ? 'pass' : 'fail',
    message: nav ? 'Navigation landmark found' : 'No navigation landmark found',
    recommendation: !nav ? 'Add role="navigation" or aria-label to main navigation' : undefined,
    wcagLevel: 'AA'
  });

  // Check for skip links
  const skipLinks = document.querySelector('a[href="#main"], a[href="#content"]');
  results.push({
    category: 'Navigation',
    test: 'Skip Links',
    status: skipLinks ? 'pass' : 'warning',
    message: skipLinks ? 'Skip links present' : 'No skip links found',
    recommendation: !skipLinks ? 'Add skip links for keyboard users' : undefined,
    wcagLevel: 'A'
  });

  // Check navigation links have proper focus indicators
  const navLinks = document.querySelectorAll('nav a, [role="navigation"] a');
  let focusableLinksCount = 0;
  navLinks.forEach(link => {
    const computedStyle = window.getComputedStyle(link, ':focus');
    if (computedStyle.outline !== 'none' || computedStyle.boxShadow !== 'none') {
      focusableLinksCount++;
    }
  });

  results.push({
    category: 'Navigation',
    test: 'Focus Indicators',
    status: focusableLinksCount === navLinks.length ? 'pass' : 'warning',
    message: `${focusableLinksCount}/${navLinks.length} navigation links have focus indicators`,
    recommendation: focusableLinksCount < navLinks.length ? 'Ensure all navigation links have visible focus indicators' : undefined,
    wcagLevel: 'AA'
  });

  return results;
};

// Keyboard Navigation Tests
const checkKeyboardNavigation = (): A11yResult[] => {
  const results: A11yResult[] = [];
  
  // Check for focusable elements
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  results.push({
    category: 'Keyboard',
    test: 'Focusable Elements',
    status: focusableElements.length > 0 ? 'pass' : 'fail',
    message: `Found ${focusableElements.length} focusable elements`,
    recommendation: focusableElements.length === 0 ? 'Ensure interactive elements are keyboard accessible' : undefined,
    wcagLevel: 'A'
  });

  // Check for tab traps (basic check)
  const modals = document.querySelectorAll('[role="dialog"], .modal, [aria-modal="true"]');
  results.push({
    category: 'Keyboard',
    test: 'Modal Focus Management',
    status: modals.length === 0 ? 'pass' : 'warning',
    message: modals.length === 0 ? 'No modals to check' : `${modals.length} modals found - manual testing required`,
    recommendation: modals.length > 0 ? 'Ensure modals trap focus and are dismissible with Escape key' : undefined,
    wcagLevel: 'AA'
  });

  return results;
};

// Color Contrast Tests
const checkColorContrast = (): A11yResult[] => {
  const results: A11yResult[] = [];
  
  // This is a simplified check - in production, you'd use a more sophisticated color contrast analyzer
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label');
  let contrastIssues = 0;
  
  textElements.forEach(element => {
    const styles = window.getComputedStyle(element);
    const fontSize = parseFloat(styles.fontSize);
    const fontWeight = styles.fontWeight;
    
    // Basic heuristic - this would need actual color contrast calculation in production
    if (fontSize < 14 && fontWeight < 600) {
      contrastIssues++;
    }
  });

  results.push({
    category: 'Color & Contrast',
    test: 'Text Size & Weight',
    status: contrastIssues === 0 ? 'pass' : 'warning',
    message: contrastIssues === 0 ? 'Text sizing appears adequate' : `${contrastIssues} elements may have contrast issues`,
    recommendation: contrastIssues > 0 ? 'Check color contrast ratios meet WCAG AA standards (4.5:1 for normal text)' : undefined,
    wcagLevel: 'AA'
  });

  return results;
};

// ARIA and Semantic HTML Tests
const checkARIAAndSemantics = (): A11yResult[] => {
  const results: A11yResult[] = [];
  
  // Check for proper heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingLevels = headings.map(h => parseInt(h.tagName.charAt(1)));
  let hierarchyIssues = 0;
  
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i-1] + 1) {
      hierarchyIssues++;
    }
  }

  results.push({
    category: 'Semantics',
    test: 'Heading Hierarchy',
    status: hierarchyIssues === 0 ? 'pass' : 'warning',
    message: hierarchyIssues === 0 ? 'Heading hierarchy is logical' : `${hierarchyIssues} potential heading hierarchy issues`,
    recommendation: hierarchyIssues > 0 ? 'Ensure headings follow a logical hierarchy (h1 → h2 → h3, etc.)' : undefined,
    wcagLevel: 'AA'
  });

  // Check for ARIA labels on interactive elements without text
  const interactiveElements = document.querySelectorAll('button, [role="button"], input[type="button"]');
  let missingLabels = 0;
  
  interactiveElements.forEach(element => {
    const hasText = element.textContent?.trim();
    const hasAriaLabel = element.getAttribute('aria-label');
    const hasAriaLabelledby = element.getAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledby) {
      missingLabels++;
    }
  });

  results.push({
    category: 'ARIA',
    test: 'Interactive Element Labels',
    status: missingLabels === 0 ? 'pass' : 'fail',
    message: missingLabels === 0 ? 'All interactive elements have labels' : `${missingLabels} interactive elements missing labels`,
    recommendation: missingLabels > 0 ? 'Add aria-label or visible text to all interactive elements' : undefined,
    wcagLevel: 'A'
  });

  return results;
};

// Form Accessibility Tests
const checkFormAccessibility = (): A11yResult[] => {
  const results: A11yResult[] = [];
  
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input, select, textarea');
  let inputsWithLabels = 0;
  
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.getAttribute('aria-label');
    const hasAriaLabelledby = input.getAttribute('aria-labelledby');
    
    if (hasLabel || hasAriaLabel || hasAriaLabelledby) {
      inputsWithLabels++;
    }
  });

  results.push({
    category: 'Forms',
    test: 'Form Labels',
    status: inputs.length === 0 ? 'pass' : (inputsWithLabels === inputs.length ? 'pass' : 'fail'),
    message: inputs.length === 0 ? 'No forms to check' : `${inputsWithLabels}/${inputs.length} form inputs have labels`,
    recommendation: inputsWithLabels < inputs.length ? 'Associate all form inputs with descriptive labels' : undefined,
    wcagLevel: 'A'
  });

  return results;
};

// Main audit function
export const runComprehensiveAccessibilityAudit = (): A11yAuditReport => {
  console.group('♿ Comprehensive Accessibility Audit');
  
  const allResults: A11yResult[] = [
    ...checkNavigationA11y(),
    ...checkKeyboardNavigation(),
    ...checkColorContrast(),
    ...checkARIAAndSemantics(),
    ...checkFormAccessibility()
  ];

  const summary = {
    passed: allResults.filter(r => r.status === 'pass').length,
    failed: allResults.filter(r => r.status === 'fail').length,
    warnings: allResults.filter(r => r.status === 'warning').length
  };

  const score = Math.round(((summary.passed + summary.warnings * 0.5) / allResults.length) * 100);
  const overall = summary.failed > 0 ? 'fail' : summary.warnings > 0 ? 'warning' : 'pass';

  console.log(`♿ Accessibility Score: ${score}/100`);
  console.log(`✅ Passed: ${summary.passed}`);
  console.log(`⚠️ Warnings: ${summary.warnings}`);
  console.log(`❌ Failed: ${summary.failed}`);

  // Log results by category
  const categories = [...new Set(allResults.map(r => r.category))];
  categories.forEach(category => {
    const categoryResults = allResults.filter(r => r.category === category);
    console.group(`♿ ${category}`);
    categoryResults.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
      const wcag = result.wcagLevel ? ` (WCAG ${result.wcagLevel})` : '';
      console.log(`${icon} ${result.test}${wcag}: ${result.message}`);
      if (result.recommendation) {
        console.log(`💡 Recommendation: ${result.recommendation}`);
      }
    });
    console.groupEnd();
  });

  console.groupEnd();

  return {
    overall,
    score,
    results: allResults,
    summary
  };
};

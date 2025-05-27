
/**
 * Real-time accessibility validation utility
 */

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  element?: Element;
  recommendation: string;
}

export const validateAccessibility = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  
  // Check for missing alt text on images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        type: 'error',
        rule: 'WCAG 1.1.1 - Non-text Content',
        message: 'Image missing alt attribute',
        element: img,
        recommendation: 'Add descriptive alt text for images'
      });
    } else if (img.getAttribute('alt') === '') {
      const isDecorative = img.hasAttribute('aria-hidden') || img.getAttribute('role') === 'presentation';
      if (!isDecorative) {
        issues.push({
          type: 'warning',
          rule: 'WCAG 1.1.1 - Non-text Content',
          message: 'Image has empty alt attribute but may not be decorative',
          element: img,
          recommendation: 'Ensure empty alt is only used for decorative images'
        });
      }
    }
  });
  
  // Check for proper heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  if (headings.length > 0) {
    const h1s = headings.filter(h => h.tagName === 'H1');
    if (h1s.length === 0) {
      issues.push({
        type: 'error',
        rule: 'WCAG 1.3.1 - Info and Relationships',
        message: 'Page missing H1 heading',
        recommendation: 'Add exactly one H1 heading to define the main page topic'
      });
    } else if (h1s.length > 1) {
      issues.push({
        type: 'warning',
        rule: 'WCAG 1.3.1 - Info and Relationships',
        message: `Page has ${h1s.length} H1 headings`,
        recommendation: 'Use only one H1 per page for clear document structure'
      });
    }
    
    // Check heading hierarchy
    for (let i = 1; i < headings.length; i++) {
      const current = parseInt(headings[i].tagName.charAt(1));
      const previous = parseInt(headings[i-1].tagName.charAt(1));
      
      if (current > previous + 1) {
        issues.push({
          type: 'warning',
          rule: 'WCAG 1.3.1 - Info and Relationships',
          message: `Heading level skipped from H${previous} to H${current}`,
          element: headings[i],
          recommendation: 'Maintain logical heading hierarchy without skipping levels'
        });
      }
    }
  }
  
  // Check form labels
  const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
  inputs.forEach(input => {
    const id = (input as HTMLInputElement).id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.hasAttribute('aria-label');
    const hasAriaLabelledBy = input.hasAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        type: 'error',
        rule: 'WCAG 1.3.1 - Info and Relationships',
        message: 'Form input missing accessible label',
        element: input,
        recommendation: 'Associate form inputs with labels using for/id, aria-label, or aria-labelledby'
      });
    }
  });
  
  // Check button accessibility
  const buttons = document.querySelectorAll('button, [role="button"]');
  buttons.forEach(button => {
    const hasText = button.textContent?.trim();
    const hasAriaLabel = button.hasAttribute('aria-label');
    const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        type: 'error',
        rule: 'WCAG 4.1.2 - Name, Role, Value',
        message: 'Button missing accessible name',
        element: button,
        recommendation: 'Provide button text or aria-label for screen readers'
      });
    }
  });
  
  // Check color contrast (simplified check)
  const textElements = document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6');
  textElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;
    
    // Basic check - would need more sophisticated contrast ratio calculation in production
    if (color === backgroundColor) {
      issues.push({
        type: 'error',
        rule: 'WCAG 1.4.3 - Contrast (Minimum)',
        message: 'Text may have insufficient color contrast',
        element: element,
        recommendation: 'Ensure text has sufficient contrast ratio (4.5:1 for normal text)'
      });
    }
  });
  
  // Check keyboard navigation
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(element => {
    const tabIndex = element.getAttribute('tabindex');
    if (tabIndex && parseInt(tabIndex) > 0) {
      issues.push({
        type: 'warning',
        rule: 'WCAG 2.4.3 - Focus Order',
        message: 'Positive tabindex detected',
        element: element,
        recommendation: 'Avoid positive tabindex values; use document order or tabindex="0"'
      });
    }
  });
  
  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href^="#"]');
  const hasSkipToMain = Array.from(skipLinks).some(link => 
    link.textContent?.toLowerCase().includes('skip') &&
    (link.textContent?.toLowerCase().includes('main') || 
     link.textContent?.toLowerCase().includes('content'))
  );
  
  if (!hasSkipToMain) {
    issues.push({
      type: 'warning',
      rule: 'WCAG 2.4.1 - Bypass Blocks',
      message: 'No skip to main content link found',
      recommendation: 'Add a skip link to help keyboard users bypass navigation'
    });
  }
  
  // Check language attribute
  const html = document.documentElement;
  if (!html.hasAttribute('lang')) {
    issues.push({
      type: 'error',
      rule: 'WCAG 3.1.1 - Language of Page',
      message: 'HTML element missing lang attribute',
      recommendation: 'Add lang attribute to html element (e.g., lang="en")'
    });
  }
  
  return issues;
};

// Auto-run validation in development
export const runAccessibilityValidation = () => {
  if (process.env.NODE_ENV === 'development') {
    const issues = validateAccessibility();
    
    if (issues.length > 0) {
      console.group('♿ Accessibility Issues Found');
      
      const errors = issues.filter(i => i.type === 'error');
      const warnings = issues.filter(i => i.type === 'warning');
      const info = issues.filter(i => i.type === 'info');
      
      console.log(`🔴 Errors: ${errors.length}`);
      console.log(`🟡 Warnings: ${warnings.length}`);
      console.log(`🔵 Info: ${info.length}`);
      
      issues.forEach(issue => {
        const icon = issue.type === 'error' ? '🔴' : issue.type === 'warning' ? '🟡' : '🔵';
        console.log(`${icon} ${issue.rule}: ${issue.message}`);
        console.log(`→ ${issue.recommendation}`);
        if (issue.element) {
          console.log('Element:', issue.element);
        }
      });
      
      console.groupEnd();
    } else {
      console.log('♿ ✅ No accessibility issues found!');
    }
  }
};

// Auto-run on DOM changes
if (process.env.NODE_ENV === 'development') {
  let timeoutId: NodeJS.Timeout;
  
  const observer = new MutationObserver(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(runAccessibilityValidation, 1000);
  });
  
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['alt', 'aria-label', 'aria-labelledby', 'lang', 'tabindex']
    });
  }
}

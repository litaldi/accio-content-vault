
/**
 * Final QA Audit - Comprehensive pre-launch quality assurance
 */

export interface QAIssue {
  category: 'accessibility' | 'duplicates' | 'code-quality' | 'security' | 'ux-ui';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  file?: string;
  recommendation: string;
}

export interface FinalQAReport {
  score: number;
  issues: QAIssue[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// Accessibility Audit
const checkAccessibility = (): QAIssue[] => {
  const issues: QAIssue[] = [];
  
  // Check for missing alt text
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
  
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      category: 'accessibility',
      severity: 'high',
      description: `${imagesWithoutAlt.length} images missing alt text`,
      recommendation: 'Add descriptive alt attributes to all images'
    });
  }
  
  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const h1Count = document.querySelectorAll('h1').length;
  
  if (h1Count === 0) {
    issues.push({
      category: 'accessibility',
      severity: 'high',
      description: 'No H1 heading found on page',
      recommendation: 'Add exactly one H1 heading per page for proper document structure'
    });
  } else if (h1Count > 1) {
    issues.push({
      category: 'accessibility',
      severity: 'medium',
      description: `Multiple H1 headings found (${h1Count})`,
      recommendation: 'Use only one H1 heading per page'
    });
  }
  
  // Check for keyboard navigation
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.outline === 'none' && !element.classList.contains('focus-visible')) {
      issues.push({
        category: 'accessibility',
        severity: 'medium',
        description: `Interactive element lacks focus indicators`,
        recommendation: 'Add visible focus indicators for keyboard navigation'
      });
    }
  });
  
  // Check for ARIA labels on buttons without text
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    const hasText = button.textContent?.trim();
    const hasAriaLabel = button.getAttribute('aria-label');
    const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        category: 'accessibility',
        severity: 'high',
        description: 'Button without accessible name',
        recommendation: 'Add aria-label or visible text to buttons'
      });
    }
  });
  
  return issues;
};

// Code Quality Audit
const checkCodeQuality = (): QAIssue[] => {
  const issues: QAIssue[] = [];
  
  // Check for consistent spacing and layout
  const hasDesignSystem = document.querySelector('[class*="design-system"]');
  if (!hasDesignSystem) {
    issues.push({
      category: 'code-quality',
      severity: 'medium',
      description: 'No design system implementation detected',
      recommendation: 'Implement consistent design tokens and spacing system'
    });
  }
  
  return issues;
};

// UX/UI Quality Audit
const checkUXUI = (): QAIssue[] => {
  const issues: QAIssue[] = [];
  
  // Check for consistent navigation
  const navElements = document.querySelectorAll('nav');
  const hasMainNav = document.querySelector('nav[aria-label*="main"], nav[aria-label*="Main"]');
  
  if (!hasMainNav && navElements.length > 0) {
    issues.push({
      category: 'ux-ui',
      severity: 'medium',
      description: 'Navigation lacks proper labeling',
      recommendation: 'Add aria-label to main navigation elements'
    });
  }
  
  // Check for loading states
  const buttons = document.querySelectorAll('button');
  const hasLoadingStates = Array.from(buttons).some(btn => 
    btn.getAttribute('aria-busy') === 'true' || btn.textContent?.includes('Loading')
  );
  
  if (!hasLoadingStates) {
    issues.push({
      category: 'ux-ui',
      severity: 'low',
      description: 'No loading states detected',
      recommendation: 'Add loading indicators for async operations'
    });
  }
  
  return issues;
};

// Security Audit
const checkSecurity = (): QAIssue[] => {
  const issues: QAIssue[] = [];
  
  // Check for HTTPS
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    issues.push({
      category: 'security',
      severity: 'critical',
      description: 'Site not served over HTTPS',
      recommendation: 'Configure HTTPS for production deployment'
    });
  }
  
  // Check for potential data exposure
  const scripts = document.querySelectorAll('script');
  const pageContent = document.documentElement.innerHTML.toLowerCase();
  const sensitivePatterns = ['api_key', 'secret', 'password', 'token'];
  const exposedSecrets = sensitivePatterns.filter(pattern => pageContent.includes(pattern));
  
  if (exposedSecrets.length > 0) {
    issues.push({
      category: 'security',
      severity: 'critical',
      description: `Potential sensitive data exposure: ${exposedSecrets.join(', ')}`,
      recommendation: 'Remove sensitive data from frontend code'
    });
  }
  
  return issues;
};

// Main audit function
export const runFinalQAAudit = (): FinalQAReport => {
  console.group('🧪 Final QA Audit - Comprehensive Review');
  
  const allIssues: QAIssue[] = [
    ...checkAccessibility(),
    ...checkCodeQuality(),
    ...checkUXUI(),
    ...checkSecurity()
  ];
  
  const summary = {
    critical: allIssues.filter(i => i.severity === 'critical').length,
    high: allIssues.filter(i => i.severity === 'high').length,
    medium: allIssues.filter(i => i.severity === 'medium').length,
    low: allIssues.filter(i => i.severity === 'low').length
  };
  
  const totalIssues = allIssues.length;
  const weightedScore = totalIssues === 0 ? 100 : Math.max(0, 100 - (
    summary.critical * 25 +
    summary.high * 15 +
    summary.medium * 10 +
    summary.low * 5
  ));
  
  console.log(`📊 QA Score: ${weightedScore}/100`);
  console.log(`🔴 Critical: ${summary.critical}`);
  console.log(`🟠 High: ${summary.high}`);
  console.log(`🟡 Medium: ${summary.medium}`);
  console.log(`🟢 Low: ${summary.low}`);
  
  // Log issues by category
  const categories = [...new Set(allIssues.map(i => i.category))];
  categories.forEach(category => {
    const categoryIssues = allIssues.filter(i => i.category === category);
    if (categoryIssues.length > 0) {
      console.group(`📋 ${category.charAt(0).toUpperCase() + category.slice(1)} Issues`);
      categoryIssues.forEach(issue => {
        console.log(`${issue.severity.toUpperCase()}: ${issue.description}`);
        console.log(`→ ${issue.recommendation}`);
      });
      console.groupEnd();
    }
  });
  
  console.groupEnd();
  
  return {
    score: weightedScore,
    issues: allIssues,
    summary
  };
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(runFinalQAAudit, 2000);
    });
  } else {
    setTimeout(runFinalQAAudit, 2000);
  }
}

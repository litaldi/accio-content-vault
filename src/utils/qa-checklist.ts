
/**
 * Comprehensive QA Checklist for Production Readiness
 * This utility performs automated checks for common issues
 */

export interface QAIssue {
  category: 'accessibility' | 'security' | 'performance' | 'ui-ux' | 'code-quality';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  element?: HTMLElement;
  recommendation: string;
  autoFixable?: boolean;
}

export interface QAReport {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  issues: QAIssue[];
  timestamp: string;
}

class QAChecker {
  private issues: QAIssue[] = [];

  // Accessibility Checks
  private checkAccessibility(): void {
    // Check for images without alt text
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      this.issues.push({
        category: 'accessibility',
        severity: 'high',
        description: `${images.length} images missing alt text`,
        recommendation: 'Add descriptive alt attributes to all images',
        autoFixable: false
      });
    }

    // Check heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1Count = document.querySelectorAll('h1').length;
    
    if (h1Count === 0) {
      this.issues.push({
        category: 'accessibility',
        severity: 'high',
        description: 'No H1 heading found',
        recommendation: 'Add exactly one H1 heading per page',
        autoFixable: false
      });
    } else if (h1Count > 1) {
      this.issues.push({
        category: 'accessibility',
        severity: 'medium',
        description: `Multiple H1 headings found (${h1Count})`,
        recommendation: 'Use only one H1 heading per page',
        autoFixable: false
      });
    }

    // Check for proper form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const element = input as HTMLInputElement;
      const id = element.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = element.getAttribute('aria-label');
      const hasAriaLabelledBy = element.getAttribute('aria-labelledby');

      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy && element.type !== 'hidden') {
        this.issues.push({
          category: 'accessibility',
          severity: 'high',
          description: 'Form input without proper label',
          element: element,
          recommendation: 'Add label, aria-label, or aria-labelledby to form inputs',
          autoFixable: false
        });
      }
    });

    // Check for keyboard accessibility
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element as HTMLElement);
      const hasVisibleFocus = computedStyle.outline !== 'none' || 
        element.classList.contains('focus:outline-none') ||
        element.classList.contains('focus-visible:outline-none');
      
      if (!hasVisibleFocus) {
        this.issues.push({
          category: 'accessibility',
          severity: 'medium',
          description: 'Interactive element may lack visible focus indicator',
          element: element as HTMLElement,
          recommendation: 'Ensure all interactive elements have visible focus indicators',
          autoFixable: false
        });
      }
    });
  }

  // Security Checks
  private checkSecurity(): void {
    // Check for potential XSS vulnerabilities
    const scriptTags = document.querySelectorAll('script');
    scriptTags.forEach((script) => {
      if (script.innerHTML.includes('document.write') || 
          script.innerHTML.includes('eval(') ||
          script.innerHTML.includes('innerHTML =')) {
        this.issues.push({
          category: 'security',
          severity: 'critical',
          description: 'Potentially unsafe JavaScript patterns detected',
          element: script,
          recommendation: 'Avoid document.write, eval(), and direct innerHTML assignments',
          autoFixable: false
        });
      }
    });

    // Check for exposed sensitive data
    const bodyText = document.body.textContent?.toLowerCase() || '';
    const sensitivePatterns = ['api_key', 'secret', 'password', 'token'];
    
    sensitivePatterns.forEach((pattern) => {
      if (bodyText.includes(pattern)) {
        this.issues.push({
          category: 'security',
          severity: 'critical',
          description: `Potentially sensitive data exposed: ${pattern}`,
          recommendation: 'Remove sensitive data from frontend',
          autoFixable: false
        });
      }
    });

    // Check for HTTPS
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      this.issues.push({
        category: 'security',
        severity: 'high',
        description: 'Site not served over HTTPS',
        recommendation: 'Configure HTTPS for production',
        autoFixable: false
      });
    }
  }

  // UI/UX Checks
  private checkUIUX(): void {
    // Check for proper button states
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      const hasText = button.textContent?.trim();
      const hasAriaLabel = button.getAttribute('aria-label');
      const hasIcon = button.querySelector('svg');

      if (!hasText && !hasAriaLabel && hasIcon) {
        this.issues.push({
          category: 'ui-ux',
          severity: 'medium',
          description: 'Icon button without accessible label',
          element: button,
          recommendation: 'Add aria-label to icon-only buttons',
          autoFixable: false
        });
      }
    });

    // Check for color contrast issues (simplified check)
    const elements = document.querySelectorAll('[class*="text-"], [class*="bg-"]');
    elements.forEach((element) => {
      const style = window.getComputedStyle(element as HTMLElement);
      const backgroundColor = style.backgroundColor;
      const color = style.color;
      
      // Simplified check for very low contrast
      if (backgroundColor === color) {
        this.issues.push({
          category: 'ui-ux',
          severity: 'high',
          description: 'Potential color contrast issue detected',
          element: element as HTMLElement,
          recommendation: 'Ensure sufficient color contrast for readability',
          autoFixable: false
        });
      }
    });

    // Check for responsive images
    const images = document.querySelectorAll('img:not([srcset])');
    if (images.length > 0) {
      this.issues.push({
        category: 'ui-ux',
        severity: 'low',
        description: `${images.length} images without responsive srcset`,
        recommendation: 'Consider adding responsive images with srcset',
        autoFixable: false
      });
    }
  }

  // Performance Checks
  private checkPerformance(): void {
    // Check for large images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
        this.issues.push({
          category: 'performance',
          severity: 'medium',
          description: 'Large image detected',
          element: img,
          recommendation: 'Optimize image size and consider lazy loading',
          autoFixable: false
        });
      }
    });

    // Check for excessive DOM nodes
    const totalNodes = document.querySelectorAll('*').length;
    if (totalNodes > 1500) {
      this.issues.push({
        category: 'performance',
        severity: 'medium',
        description: `High DOM node count: ${totalNodes}`,
        recommendation: 'Consider optimizing DOM structure and lazy loading',
        autoFixable: false
      });
    }
  }

  // Code Quality Checks
  private checkCodeQuality(): void {
    // Check for console errors (if any were logged)
    const errors = console.error.toString();
    if (errors.includes('Error') || errors.includes('Warning')) {
      this.issues.push({
        category: 'code-quality',
        severity: 'medium',
        description: 'Console errors or warnings detected',
        recommendation: 'Check browser console and fix any errors',
        autoFixable: false
      });
    }

    // Check for proper semantic HTML
    const hasMain = document.querySelector('main');
    const hasNav = document.querySelector('nav');
    const hasHeader = document.querySelector('header');
    
    if (!hasMain) {
      this.issues.push({
        category: 'code-quality',
        severity: 'medium',
        description: 'Missing main landmark',
        recommendation: 'Add <main> element to page structure',
        autoFixable: false
      });
    }

    if (!hasNav) {
      this.issues.push({
        category: 'code-quality',
        severity: 'low',
        description: 'Missing navigation landmark',
        recommendation: 'Add <nav> element for main navigation',
        autoFixable: false
      });
    }
  }

  public runFullCheck(): QAReport {
    this.issues = []; // Reset issues

    this.checkAccessibility();
    this.checkSecurity();
    this.checkUIUX();
    this.checkPerformance();
    this.checkCodeQuality();

    const criticalIssues = this.issues.filter(i => i.severity === 'critical').length;
    const highIssues = this.issues.filter(i => i.severity === 'high').length;
    const mediumIssues = this.issues.filter(i => i.severity === 'medium').length;
    const lowIssues = this.issues.filter(i => i.severity === 'low').length;

    // Calculate score (100 - weighted penalty)
    const score = Math.max(0, 100 - (
      criticalIssues * 25 +
      highIssues * 15 +
      mediumIssues * 10 +
      lowIssues * 5
    ));

    return {
      score,
      totalIssues: this.issues.length,
      criticalIssues,
      issues: this.issues,
      timestamp: new Date().toISOString()
    };
  }
}

export const runQACheck = (): QAReport => {
  const checker = new QAChecker();
  return checker.runFullCheck();
};

// Auto-run QA check in development
if (process.env.NODE_ENV === 'development') {
  let qaCheckTimeout: NodeJS.Timeout;
  
  const scheduleQACheck = () => {
    if (qaCheckTimeout) clearTimeout(qaCheckTimeout);
    qaCheckTimeout = setTimeout(() => {
      const report = runQACheck();
      if (report.totalIssues > 0) {
        console.group('🔍 QA Report');
        console.log(`Score: ${report.score}/100`);
        console.log(`Total Issues: ${report.totalIssues}`);
        
        const categories = ['critical', 'high', 'medium', 'low'] as const;
        categories.forEach(severity => {
          const categoryIssues = report.issues.filter(i => i.severity === severity);
          if (categoryIssues.length > 0) {
            console.group(`${severity.toUpperCase()} (${categoryIssues.length})`);
            categoryIssues.forEach(issue => {
              console.log(`${issue.description} - ${issue.recommendation}`);
            });
            console.groupEnd();
          }
        });
        console.groupEnd();
      }
    }, 3000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleQACheck);
  } else {
    scheduleQACheck();
  }
}


/**
 * Comprehensive site audit utility for navigation, accessibility, and quality checks
 */

export interface SiteAuditResult {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  recommendation?: string;
}

export interface SiteAuditReport {
  overall: 'pass' | 'fail' | 'warning';
  score: number;
  results: SiteAuditResult[];
  summary: {
    passed: number;
    failed: number;
    warnings: number;
  };
}

// Navigation and Link Validation
const checkNavigation = (): SiteAuditResult[] => {
  const results: SiteAuditResult[] = [];
  
  // Check all navigation links
  const navLinks = document.querySelectorAll('nav a[href]');
  const internalLinks = Array.from(navLinks).filter(link => 
    (link as HTMLAnchorElement).href.startsWith(window.location.origin)
  );
  
  results.push({
    category: 'Navigation',
    test: 'Navigation Links',
    status: internalLinks.length > 0 ? 'pass' : 'fail',
    message: `Found ${internalLinks.length} navigation links`,
    recommendation: internalLinks.length === 0 ? 'Add proper navigation links' : undefined
  });

  // Check for broken internal links
  const allInternalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="#"]');
  let brokenLinks = 0;
  
  allInternalLinks.forEach(link => {
    const href = (link as HTMLAnchorElement).href;
    if (href.includes('#') && !href.startsWith('#')) {
      const [, fragment] = href.split('#');
      if (fragment && !document.getElementById(fragment)) {
        brokenLinks++;
      }
    }
  });

  results.push({
    category: 'Navigation',
    test: 'Broken Links',
    status: brokenLinks === 0 ? 'pass' : 'warning',
    message: brokenLinks === 0 ? 'No broken anchor links found' : `Found ${brokenLinks} potentially broken anchor links`,
    recommendation: brokenLinks > 0 ? 'Review and fix broken anchor links' : undefined
  });

  return results;
};

// UX/UI Consistency Checks
const checkUIConsistency = (): SiteAuditResult[] => {
  const results: SiteAuditResult[] = [];
  
  // Check for consistent button styles
  const buttons = document.querySelectorAll('button, [role="button"]');
  const buttonClasses = new Set();
  
  buttons.forEach(button => {
    const classes = (button as HTMLElement).className;
    buttonClasses.add(classes);
  });

  results.push({
    category: 'UI/UX',
    test: 'Button Consistency',
    status: buttonClasses.size <= 5 ? 'pass' : 'warning',
    message: `Found ${buttonClasses.size} different button style combinations`,
    recommendation: buttonClasses.size > 5 ? 'Consider standardizing button styles' : undefined
  });

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const hasH1 = document.querySelector('h1');
  
  results.push({
    category: 'UI/UX',
    test: 'Heading Structure',
    status: hasH1 ? 'pass' : 'fail',
    message: hasH1 ? `Found proper heading structure with ${headings.length} headings` : 'No H1 heading found',
    recommendation: !hasH1 ? 'Add an H1 heading to the page' : undefined
  });

  return results;
};

// Security and Code Quality Checks
const checkSecurity = (): SiteAuditResult[] => {
  const results: SiteAuditResult[] = [];
  
  // Check for HTTPS
  const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  
  results.push({
    category: 'Security',
    test: 'HTTPS',
    status: isHTTPS ? 'pass' : 'fail',
    message: isHTTPS ? 'Site is served over HTTPS' : 'Site should use HTTPS in production',
    recommendation: !isHTTPS ? 'Enable HTTPS for production deployment' : undefined
  });

  // Check for input validation
  const inputs = document.querySelectorAll('input, textarea');
  let inputsWithValidation = 0;
  
  inputs.forEach(input => {
    const hasValidation = input.hasAttribute('required') || 
                         input.hasAttribute('pattern') || 
                         input.hasAttribute('minlength') || 
                         input.hasAttribute('maxlength');
    if (hasValidation) inputsWithValidation++;
  });

  results.push({
    category: 'Security',
    test: 'Input Validation',
    status: inputs.length === 0 || inputsWithValidation > 0 ? 'pass' : 'warning',
    message: inputs.length === 0 ? 'No form inputs found' : `${inputsWithValidation}/${inputs.length} inputs have validation attributes`,
    recommendation: inputs.length > 0 && inputsWithValidation === 0 ? 'Add validation attributes to form inputs' : undefined
  });

  return results;
};

// Accessibility Checks
const checkAccessibility = (): SiteAuditResult[] => {
  const results: SiteAuditResult[] = [];
  
  // Check for alt text on images
  const images = document.querySelectorAll('img');
  let imagesWithAlt = 0;
  
  images.forEach(img => {
    if (img.hasAttribute('alt')) imagesWithAlt++;
  });

  results.push({
    category: 'Accessibility',
    test: 'Image Alt Text',
    status: images.length === 0 || imagesWithAlt === images.length ? 'pass' : 'fail',
    message: images.length === 0 ? 'No images found' : `${imagesWithAlt}/${images.length} images have alt text`,
    recommendation: imagesWithAlt < images.length ? 'Add alt text to all images' : undefined
  });

  // Check for proper form labels
  const formInputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
  let inputsWithLabels = 0;
  
  formInputs.forEach(input => {
    const hasLabel = input.hasAttribute('aria-label') || 
                    input.hasAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${input.id}"]`);
    if (hasLabel) inputsWithLabels++;
  });

  results.push({
    category: 'Accessibility',
    test: 'Form Labels',
    status: formInputs.length === 0 || inputsWithLabels === formInputs.length ? 'pass' : 'fail',
    message: formInputs.length === 0 ? 'No form inputs found' : `${inputsWithLabels}/${formInputs.length} inputs have proper labels`,
    recommendation: inputsWithLabels < formInputs.length ? 'Add labels to all form inputs' : undefined
  });

  return results;
};

// Performance and Compatibility Checks
const checkPerformance = (): SiteAuditResult[] => {
  const results: SiteAuditResult[] = [];
  
  // Check for excessive DOM size
  const domSize = document.querySelectorAll('*').length;
  
  results.push({
    category: 'Performance',
    test: 'DOM Size',
    status: domSize < 1500 ? 'pass' : domSize < 3000 ? 'warning' : 'fail',
    message: `DOM contains ${domSize} elements`,
    recommendation: domSize >= 1500 ? 'Consider optimizing DOM structure and reducing element count' : undefined
  });

  // Check for proper meta tags
  const hasViewport = document.querySelector('meta[name="viewport"]');
  const hasDescription = document.querySelector('meta[name="description"]');
  
  results.push({
    category: 'Performance',
    test: 'Meta Tags',
    status: hasViewport && hasDescription ? 'pass' : 'warning',
    message: `Viewport: ${hasViewport ? 'Yes' : 'No'}, Description: ${hasDescription ? 'Yes' : 'No'}`,
    recommendation: !hasViewport || !hasDescription ? 'Add missing meta tags for better SEO and mobile experience' : undefined
  });

  return results;
};

// Main audit function
export const runSiteAudit = (): SiteAuditReport => {
  const allResults = [
    ...checkNavigation(),
    ...checkUIConsistency(),
    ...checkSecurity(),
    ...checkAccessibility(),
    ...checkPerformance()
  ];

  const passed = allResults.filter(r => r.status === 'pass').length;
  const failed = allResults.filter(r => r.status === 'fail').length;
  const warnings = allResults.filter(r => r.status === 'warning').length;

  const score = Math.round((passed / allResults.length) * 100);
  const overall = failed > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass';

  return {
    overall,
    score,
    results: allResults,
    summary: { passed, failed, warnings }
  };
};

// Helper to log audit results
export const logSiteAudit = (): void => {
  const audit = runSiteAudit();
  
  console.group('🔍 Site Quality Audit Report');
  console.log(`Overall Status: ${audit.overall.toUpperCase()}`);
  console.log(`Quality Score: ${audit.score}%`);
  console.log(`Tests: ${audit.summary.passed} passed, ${audit.summary.failed} failed, ${audit.summary.warnings} warnings`);
  
  if (audit.results.filter(r => r.status === 'fail').length > 0) {
    console.group('❌ Failed Tests');
    audit.results.filter(r => r.status === 'fail').forEach(result => {
      console.log(`${result.category} - ${result.test}: ${result.message}`);
      if (result.recommendation) console.log(`  💡 ${result.recommendation}`);
    });
    console.groupEnd();
  }
  
  if (audit.results.filter(r => r.status === 'warning').length > 0) {
    console.group('⚠️ Warnings');
    audit.results.filter(r => r.status === 'warning').forEach(result => {
      console.log(`${result.category} - ${result.test}: ${result.message}`);
      if (result.recommendation) console.log(`  💡 ${result.recommendation}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};

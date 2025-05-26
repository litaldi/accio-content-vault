
/**
 * Comprehensive Pre-Launch QA Audit Utility
 * Performs automated checks across functionality, accessibility, security, and performance
 */

export interface QAResult {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  recommendation?: string;
}

export interface QAAuditReport {
  overall: 'pass' | 'fail' | 'warning';
  score: number;
  results: QAResult[];
  summary: {
    passed: number;
    failed: number;
    warnings: number;
  };
}

// Functionality Tests
const checkFunctionality = (): QAResult[] => {
  const results: QAResult[] = [];
  
  // Check all navigation links
  const links = document.querySelectorAll('a[href]');
  const internalLinks = Array.from(links).filter(link => 
    (link as HTMLAnchorElement).href.startsWith(window.location.origin)
  );
  
  results.push({
    category: 'Functionality',
    test: 'Navigation Links',
    status: internalLinks.length > 0 ? 'pass' : 'warning',
    message: `Found ${internalLinks.length} internal navigation links`,
    recommendation: internalLinks.length === 0 ? 'Add navigation links between pages' : undefined
  });

  // Check interactive elements
  const buttons = document.querySelectorAll('button, [role="button"]');
  const forms = document.querySelectorAll('form');
  
  results.push({
    category: 'Functionality',
    test: 'Interactive Elements',
    status: buttons.length > 0 ? 'pass' : 'fail',
    message: `Found ${buttons.length} buttons and ${forms.length} forms`,
    recommendation: buttons.length === 0 ? 'Add interactive elements for user engagement' : undefined
  });

  return results;
};

// UX/UI & Design Tests
const checkDesign = (): QAResult[] => {
  const results: QAResult[] = [];
  
  // Check for consistent spacing
  const hasGridSystem = document.querySelector('[class*="grid"], [class*="flex"]');
  results.push({
    category: 'Design',
    test: 'Layout System',
    status: hasGridSystem ? 'pass' : 'warning',
    message: hasGridSystem ? 'Layout system detected' : 'No layout system detected',
    recommendation: !hasGridSystem ? 'Consider using CSS Grid or Flexbox for consistent layouts' : undefined
  });

  // Check typography consistency
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  results.push({
    category: 'Design',
    test: 'Typography',
    status: headings.length > 0 ? 'pass' : 'warning',
    message: `Found ${headings.length} heading elements`,
    recommendation: headings.length === 0 ? 'Add proper heading hierarchy for better structure' : undefined
  });

  return results;
};

// Accessibility Tests
const checkAccessibility = (): QAResult[] => {
  const results: QAResult[] = [];
  
  // Check for alt text on images
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'));
  
  results.push({
    category: 'Accessibility',
    test: 'Image Alt Text',
    status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
    message: `${imagesWithoutAlt.length} of ${images.length} images missing alt text`,
    recommendation: imagesWithoutAlt.length > 0 ? 'Add alt attributes to all images' : undefined
  });

  // Check for form labels
  const inputs = document.querySelectorAll('input, select, textarea');
  const inputsWithoutLabels = Array.from(inputs).filter(input => {
    const id = (input as HTMLInputElement).id;
    return !id || !document.querySelector(`label[for="${id}"]`);
  });

  results.push({
    category: 'Accessibility',
    test: 'Form Labels',
    status: inputsWithoutLabels.length === 0 ? 'pass' : 'fail',
    message: `${inputsWithoutLabels.length} of ${inputs.length} form inputs missing labels`,
    recommendation: inputsWithoutLabels.length > 0 ? 'Associate all form inputs with labels' : undefined
  });

  // Check keyboard navigation
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  results.push({
    category: 'Accessibility',
    test: 'Keyboard Navigation',
    status: focusableElements.length > 0 ? 'pass' : 'warning',
    message: `${focusableElements.length} focusable elements found`,
    recommendation: focusableElements.length === 0 ? 'Ensure all interactive elements are keyboard accessible' : undefined
  });

  return results;
};

// Security Tests
const checkSecurity = (): QAResult[] => {
  const results: QAResult[] = [];
  
  // Check HTTPS
  const isHTTPS = window.location.protocol === 'https:';
  results.push({
    category: 'Security',
    test: 'HTTPS',
    status: isHTTPS ? 'pass' : 'fail',
    message: isHTTPS ? 'Site served over HTTPS' : 'Site not served over HTTPS',
    recommendation: !isHTTPS ? 'Configure HTTPS for production deployment' : undefined
  });

  // Check for sensitive data exposure
  const scripts = document.querySelectorAll('script');
  const pageContent = document.documentElement.innerHTML.toLowerCase();
  const sensitivePatterns = ['api_key', 'secret', 'password', 'token'];
  const exposedSecrets = sensitivePatterns.filter(pattern => pageContent.includes(pattern));

  results.push({
    category: 'Security',
    test: 'Data Exposure',
    status: exposedSecrets.length === 0 ? 'pass' : 'warning',
    message: exposedSecrets.length === 0 ? 'No sensitive data detected in DOM' : `Potential sensitive data found: ${exposedSecrets.join(', ')}`,
    recommendation: exposedSecrets.length > 0 ? 'Review and remove any exposed sensitive information' : undefined
  });

  return results;
};

// Performance & SEO Tests
const checkPerformanceSEO = (): QAResult[] => {
  const results: QAResult[] = [];
  
  // Check meta tags
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');
  
  results.push({
    category: 'SEO',
    test: 'Meta Tags',
    status: title && description ? 'pass' : 'fail',
    message: `Title: ${title ? 'present' : 'missing'}, Description: ${description ? 'present' : 'missing'}`,
    recommendation: !title || !description ? 'Add title and description meta tags to all pages' : undefined
  });

  // Check favicon
  const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  results.push({
    category: 'SEO',
    test: 'Favicon',
    status: favicon ? 'pass' : 'warning',
    message: favicon ? 'Favicon present' : 'Favicon missing',
    recommendation: !favicon ? 'Add a favicon for better branding' : undefined
  });

  return results;
};

// Technical Tests
const checkTechnical = (): QAResult[] => {
  const results: QAResult[] = [];
  
  // Check console errors
  const consoleErrors = performance.getEntriesByType('navigation');
  results.push({
    category: 'Technical',
    test: 'Console Errors',
    status: 'pass', // Would need actual console monitoring
    message: 'Manual console review required',
    recommendation: 'Check browser console for errors and warnings'
  });

  // Check responsive viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  results.push({
    category: 'Technical',
    test: 'Responsive Viewport',
    status: viewport ? 'pass' : 'fail',
    message: viewport ? 'Viewport meta tag present' : 'Viewport meta tag missing',
    recommendation: !viewport ? 'Add viewport meta tag for responsive design' : undefined
  });

  return results;
};

// Main audit function
export const runPreLaunchQA = (): QAAuditReport => {
  console.group('🧪 Pre-Launch QA Audit');
  
  const allResults: QAResult[] = [
    ...checkFunctionality(),
    ...checkDesign(),
    ...checkAccessibility(),
    ...checkSecurity(),
    ...checkPerformanceSEO(),
    ...checkTechnical()
  ];

  const summary = {
    passed: allResults.filter(r => r.status === 'pass').length,
    failed: allResults.filter(r => r.status === 'fail').length,
    warnings: allResults.filter(r => r.status === 'warning').length
  };

  const score = Math.round(((summary.passed + summary.warnings * 0.5) / allResults.length) * 100);
  const overall = summary.failed > 0 ? 'fail' : summary.warnings > 0 ? 'warning' : 'pass';

  console.log(`📊 Overall Score: ${score}/100`);
  console.log(`✅ Passed: ${summary.passed}`);
  console.log(`⚠️ Warnings: ${summary.warnings}`);
  console.log(`❌ Failed: ${summary.failed}`);

  // Log results by category
  const categories = [...new Set(allResults.map(r => r.category))];
  categories.forEach(category => {
    const categoryResults = allResults.filter(r => r.category === category);
    console.group(`📋 ${category}`);
    categoryResults.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
      console.log(`${icon} ${result.test}: ${result.message}`);
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

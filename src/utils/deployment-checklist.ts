
/**
 * Production Deployment Checklist for Accio Platform
 * Run this utility to verify deployment readiness
 */

export interface DeploymentCheck {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning' | 'manual';
  message: string;
  recommendation?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface DeploymentReport {
  overall: 'ready' | 'needs-attention' | 'not-ready';
  score: number;
  checks: DeploymentCheck[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// Security Checks
const checkSecurity = (): DeploymentCheck[] => {
  const checks: DeploymentCheck[] = [];
  
  // HTTPS Check
  const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  checks.push({
    category: 'Security',
    test: 'HTTPS Protocol',
    status: isHTTPS ? 'pass' : 'fail',
    message: isHTTPS ? 'Site is served over HTTPS' : 'Site must use HTTPS in production',
    recommendation: !isHTTPS ? 'Configure HTTPS for production deployment' : undefined,
    priority: 'critical'
  });

  // Security Headers Check
  const hasCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  checks.push({
    category: 'Security',
    test: 'Content Security Policy',
    status: hasCSP ? 'pass' : 'warning',
    message: hasCSP ? 'CSP header detected' : 'Consider adding Content Security Policy',
    recommendation: !hasCSP ? 'Add CSP meta tag or server headers' : undefined,
    priority: 'high'
  });

  // Environment Variables Check
  const pageContent = document.documentElement.innerHTML;
  const sensitivePatterns = ['api_key', 'secret', 'private_key', 'password'];
  const exposedSecrets = sensitivePatterns.filter(pattern => pageContent.toLowerCase().includes(pattern));
  
  checks.push({
    category: 'Security',
    test: 'Sensitive Data Exposure',
    status: exposedSecrets.length === 0 ? 'pass' : 'fail',
    message: exposedSecrets.length === 0 ? 'No sensitive data detected' : `Potential exposure: ${exposedSecrets.join(', ')}`,
    recommendation: exposedSecrets.length > 0 ? 'Remove sensitive data from client-side code' : undefined,
    priority: 'critical'
  });

  return checks;
};

// Performance Checks
const checkPerformance = (): DeploymentCheck[] => {
  const checks: DeploymentCheck[] = [];
  
  // DOM Size Check
  const domSize = document.querySelectorAll('*').length;
  checks.push({
    category: 'Performance',
    test: 'DOM Size',
    status: domSize < 1500 ? 'pass' : domSize < 3000 ? 'warning' : 'fail',
    message: `DOM contains ${domSize} elements`,
    recommendation: domSize >= 1500 ? 'Consider code splitting and lazy loading' : undefined,
    priority: domSize >= 3000 ? 'high' : 'medium'
  });

  // Image Optimization Check
  const images = document.querySelectorAll('img');
  let unoptimizedImages = 0;
  images.forEach(img => {
    const src = img.src;
    if (src && !src.includes('webp') && !src.includes('optimized')) {
      unoptimizedImages++;
    }
  });

  checks.push({
    category: 'Performance',
    test: 'Image Optimization',
    status: unoptimizedImages === 0 ? 'pass' : 'warning',
    message: `${unoptimizedImages} potentially unoptimized images`,
    recommendation: unoptimizedImages > 0 ? 'Optimize images for web delivery' : undefined,
    priority: 'medium'
  });

  return checks;
};

// SEO Checks
const checkSEO = (): DeploymentCheck[] => {
  const checks: DeploymentCheck[] = [];
  
  // Meta Tags Check
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');
  const viewport = document.querySelector('meta[name="viewport"]');
  
  checks.push({
    category: 'SEO',
    test: 'Essential Meta Tags',
    status: title && description && viewport ? 'pass' : 'fail',
    message: `Title: ${title ? 'Yes' : 'No'}, Description: ${description ? 'Yes' : 'No'}, Viewport: ${viewport ? 'Yes' : 'No'}`,
    recommendation: !title || !description || !viewport ? 'Add missing meta tags' : undefined,
    priority: 'high'
  });

  // Favicon Check
  const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  checks.push({
    category: 'SEO',
    test: 'Favicon',
    status: favicon ? 'pass' : 'warning',
    message: favicon ? 'Favicon is present' : 'Favicon is missing',
    recommendation: !favicon ? 'Add a favicon for better branding' : undefined,
    priority: 'low'
  });

  return checks;
};

// Accessibility Checks
const checkAccessibility = (): DeploymentCheck[] => {
  const checks: DeploymentCheck[] = [];
  
  // Alt Text Check
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'));
  
  checks.push({
    category: 'Accessibility',
    test: 'Image Alt Text',
    status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
    message: `${imagesWithoutAlt.length} of ${images.length} images missing alt text`,
    recommendation: imagesWithoutAlt.length > 0 ? 'Add alt attributes to all images' : undefined,
    priority: 'high'
  });

  // Heading Structure Check
  const h1Count = document.querySelectorAll('h1').length;
  checks.push({
    category: 'Accessibility',
    test: 'Heading Structure',
    status: h1Count === 1 ? 'pass' : 'warning',
    message: `Found ${h1Count} H1 headings`,
    recommendation: h1Count !== 1 ? 'Use exactly one H1 heading per page' : undefined,
    priority: 'medium'
  });

  // Form Labels Check
  const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
  let inputsWithoutLabels = 0;
  inputs.forEach(input => {
    const hasLabel = input.hasAttribute('aria-label') || 
                    input.hasAttribute('aria-labelledby') ||
                    document.querySelector(`label[for="${input.id}"]`);
    if (!hasLabel) inputsWithoutLabels++;
  });

  checks.push({
    category: 'Accessibility',
    test: 'Form Labels',
    status: inputsWithoutLabels === 0 ? 'pass' : 'fail',
    message: `${inputsWithoutLabels} form inputs missing labels`,
    recommendation: inputsWithoutLabels > 0 ? 'Add labels to all form inputs' : undefined,
    priority: 'high'
  });

  return checks;
};

// Functionality Checks
const checkFunctionality = (): DeploymentCheck[] => {
  const checks: DeploymentCheck[] = [];
  
  // Navigation Check
  const navLinks = document.querySelectorAll('nav a[href]');
  checks.push({
    category: 'Functionality',
    test: 'Navigation Links',
    status: navLinks.length > 0 ? 'pass' : 'fail',
    message: `Found ${navLinks.length} navigation links`,
    recommendation: navLinks.length === 0 ? 'Add navigation links' : undefined,
    priority: 'high'
  });

  // Error Boundaries Check
  const hasErrorBoundary = document.querySelector('[data-error-boundary]') || 
                          window.React && window.React.version; // Simplified check
  checks.push({
    category: 'Functionality',
    test: 'Error Handling',
    status: 'manual',
    message: 'Error boundaries require manual verification',
    recommendation: 'Verify error boundaries are implemented and working',
    priority: 'high'
  });

  return checks;
};

// Browser Compatibility Checks
const checkCompatibility = (): DeploymentCheck[] => {
  const checks: DeploymentCheck[] = [];
  
  // Modern Browser Features
  const hasModernFeatures = 'fetch' in window && 'Promise' in window && 'Map' in window;
  checks.push({
    category: 'Compatibility',
    test: 'Modern Browser Support',
    status: hasModernFeatures ? 'pass' : 'fail',
    message: hasModernFeatures ? 'Modern browser features available' : 'Missing modern browser features',
    recommendation: !hasModernFeatures ? 'Add polyfills for older browsers' : undefined,
    priority: 'medium'
  });

  // CSS Grid/Flexbox Support
  const testDiv = document.createElement('div');
  testDiv.style.display = 'grid';
  const hasGridSupport = testDiv.style.display === 'grid';
  
  checks.push({
    category: 'Compatibility',
    test: 'CSS Grid Support',
    status: hasGridSupport ? 'pass' : 'warning',
    message: hasGridSupport ? 'CSS Grid is supported' : 'CSS Grid may not be supported',
    recommendation: !hasGridSupport ? 'Test layout fallbacks for older browsers' : undefined,
    priority: 'low'
  });

  return checks;
};

// Main deployment check function
export const runDeploymentCheck = (): DeploymentReport => {
  console.group('🚀 Production Deployment Checklist');
  
  const allChecks: DeploymentCheck[] = [
    ...checkSecurity(),
    ...checkPerformance(),
    ...checkSEO(),
    ...checkAccessibility(),
    ...checkFunctionality(),
    ...checkCompatibility()
  ];

  const summary = {
    critical: allChecks.filter(c => c.priority === 'critical' && c.status === 'fail').length,
    high: allChecks.filter(c => c.priority === 'high' && (c.status === 'fail' || c.status === 'warning')).length,
    medium: allChecks.filter(c => c.priority === 'medium' && (c.status === 'fail' || c.status === 'warning')).length,
    low: allChecks.filter(c => c.priority === 'low' && (c.status === 'fail' || c.status === 'warning')).length
  };

  const passedChecks = allChecks.filter(c => c.status === 'pass').length;
  const score = Math.round((passedChecks / allChecks.length) * 100);

  let overall: 'ready' | 'needs-attention' | 'not-ready';
  if (summary.critical > 0) {
    overall = 'not-ready';
  } else if (summary.high > 2 || summary.medium > 5) {
    overall = 'needs-attention';
  } else {
    overall = 'ready';
  }

  console.log(`📊 Deployment Score: ${score}%`);
  console.log(`🎯 Overall Status: ${overall.toUpperCase()}`);
  console.log(`🔴 Critical Issues: ${summary.critical}`);
  console.log(`🟠 High Priority: ${summary.high}`);
  console.log(`🟡 Medium Priority: ${summary.medium}`);
  console.log(`🟢 Low Priority: ${summary.low}`);

  // Log issues by category
  const categories = [...new Set(allChecks.map(c => c.category))];
  categories.forEach(category => {
    const categoryChecks = allChecks.filter(c => c.category === category);
    const failedChecks = categoryChecks.filter(c => c.status === 'fail' || c.status === 'warning');
    
    if (failedChecks.length > 0) {
      console.group(`📋 ${category} Issues`);
      failedChecks.forEach(check => {
        const icon = check.priority === 'critical' ? '🔴' : 
                    check.priority === 'high' ? '🟠' : 
                    check.priority === 'medium' ? '🟡' : '🟢';
        console.log(`${icon} ${check.test}: ${check.message}`);
        if (check.recommendation) {
          console.log(`  💡 ${check.recommendation}`);
        }
      });
      console.groupEnd();
    }
  });

  console.groupEnd();

  return {
    overall,
    score,
    checks: allChecks,
    summary
  };
};

// Auto-run deployment check in development
if (process.env.NODE_ENV === 'development') {
  // Run checks after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(runDeploymentCheck, 3000); // Wait for app to fully load
    });
  } else {
    setTimeout(runDeploymentCheck, 3000);
  }
}

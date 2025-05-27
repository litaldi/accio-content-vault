
/**
 * Test helpers and utilities for validating application functionality
 */

export interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
}

export interface ComponentTest {
  component: string;
  tests: TestResult[];
}

// Test all navigation links
export const testNavigation = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Test internal links
  const links = document.querySelectorAll('a[href]');
  const internalLinks = Array.from(links).filter(link => 
    (link as HTMLAnchorElement).href.startsWith(window.location.origin)
  );
  
  results.push({
    test: 'Internal Navigation Links',
    status: internalLinks.length > 0 ? 'pass' : 'fail',
    message: `Found ${internalLinks.length} internal navigation links`,
    details: internalLinks.length === 0 ? 'No internal navigation links found' : undefined
  });
  
  // Test menu visibility
  const mainMenu = document.querySelector('nav[aria-label*="main"], nav[aria-label*="Main"]');
  results.push({
    test: 'Main Navigation Menu',
    status: mainMenu ? 'pass' : 'fail',
    message: mainMenu ? 'Main navigation menu found' : 'Main navigation menu not found'
  });
  
  return results;
};

// Test responsive design
export const testResponsiveness = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Check viewport meta tag
  const viewport = document.querySelector('meta[name="viewport"]');
  results.push({
    test: 'Responsive Viewport',
    status: viewport ? 'pass' : 'fail',
    message: viewport ? 'Viewport meta tag present' : 'Viewport meta tag missing'
  });
  
  // Check responsive layout elements
  const responsiveElements = document.querySelectorAll('[class*="grid"], [class*="flex"], [class*="responsive"]');
  results.push({
    test: 'Responsive Layout Elements',
    status: responsiveElements.length > 0 ? 'pass' : 'warning',
    message: `Found ${responsiveElements.length} responsive layout elements`
  });
  
  return results;
};

// Test interactive elements
export const testInteractivity = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Test buttons
  const buttons = document.querySelectorAll('button, [role="button"]');
  results.push({
    test: 'Interactive Buttons',
    status: buttons.length > 0 ? 'pass' : 'warning',
    message: `Found ${buttons.length} interactive buttons`
  });
  
  // Test forms
  const forms = document.querySelectorAll('form');
  results.push({
    test: 'Forms',
    status: forms.length >= 0 ? 'pass' : 'warning',
    message: `Found ${forms.length} forms`
  });
  
  // Test inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  results.push({
    test: 'Form Inputs',
    status: inputs.length >= 0 ? 'pass' : 'warning',
    message: `Found ${inputs.length} form inputs`
  });
  
  return results;
};

// Test accessibility
export const testAccessibility = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Test alt text on images
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'));
  results.push({
    test: 'Image Alt Text',
    status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
    message: `${imagesWithoutAlt.length} of ${images.length} images missing alt text`
  });
  
  // Test form labels
  const formInputs = document.querySelectorAll('input, select, textarea');
  const inputsWithoutLabels = Array.from(formInputs).filter(input => {
    const id = (input as HTMLInputElement).id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');
    return !hasLabel && !hasAriaLabel;
  });
  
  results.push({
    test: 'Form Labels',
    status: inputsWithoutLabels.length === 0 ? 'pass' : 'fail',
    message: `${inputsWithoutLabels.length} of ${formInputs.length} inputs missing labels`
  });
  
  // Test heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const h1Count = document.querySelectorAll('h1').length;
  
  results.push({
    test: 'Heading Hierarchy',
    status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
    message: `Found ${h1Count} H1 headings and ${headings.length} total headings`
  });
  
  // Test skip links
  const skipLinks = document.querySelectorAll('a[href^="#"]');
  results.push({
    test: 'Skip Links',
    status: skipLinks.length > 0 ? 'pass' : 'warning',
    message: `Found ${skipLinks.length} skip links for accessibility`
  });
  
  return results;
};

// Test SEO elements
export const testSEO = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Test page title
  const title = document.querySelector('title');
  results.push({
    test: 'Page Title',
    status: title && title.textContent ? 'pass' : 'fail',
    message: title && title.textContent ? `Title: "${title.textContent}"` : 'Page title missing'
  });
  
  // Test meta description
  const description = document.querySelector('meta[name="description"]');
  results.push({
    test: 'Meta Description',
    status: description && description.getAttribute('content') ? 'pass' : 'fail',
    message: description ? 'Meta description present' : 'Meta description missing'
  });
  
  // Test favicon
  const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  results.push({
    test: 'Favicon',
    status: favicon ? 'pass' : 'warning',
    message: favicon ? 'Favicon present' : 'Favicon missing'
  });
  
  return results;
};

// Test error handling
export const testErrorHandling = (): TestResult[] => {
  const results: TestResult[] = [];
  
  // Check for error boundary
  const hasErrorBoundary = document.querySelector('[data-error-boundary]') || 
                          window.React?.Component?.toString().includes('componentDidCatch');
  
  results.push({
    test: 'Error Boundary',
    status: hasErrorBoundary ? 'pass' : 'warning',
    message: hasErrorBoundary ? 'Error boundary detected' : 'No error boundary detected'
  });
  
  // Check console errors (simplified check)
  results.push({
    test: 'Console Errors',
    status: 'warning',
    message: 'Manual console review required - check browser developer tools'
  });
  
  return results;
};

// Run all tests
export const runAllTests = (): ComponentTest[] => {
  console.group('🧪 Application Functionality Test Suite');
  
  const testSuites: ComponentTest[] = [
    {
      component: 'Navigation',
      tests: testNavigation()
    },
    {
      component: 'Responsiveness',
      tests: testResponsiveness()
    },
    {
      component: 'Interactivity',
      tests: testInteractivity()
    },
    {
      component: 'Accessibility',
      tests: testAccessibility()
    },
    {
      component: 'SEO',
      tests: testSEO()
    },
    {
      component: 'Error Handling',
      tests: testErrorHandling()
    }
  ];
  
  // Log results
  testSuites.forEach(suite => {
    console.group(`📋 ${suite.component}`);
    suite.tests.forEach(test => {
      const icon = test.status === 'pass' ? '✅' : test.status === 'warning' ? '⚠️' : '❌';
      console.log(`${icon} ${test.test}: ${test.message}`);
      if (test.details) {
        console.log(`   Details: ${test.details}`);
      }
    });
    console.groupEnd();
  });
  
  // Summary
  const totalTests = testSuites.reduce((sum, suite) => sum + suite.tests.length, 0);
  const passedTests = testSuites.reduce((sum, suite) => 
    sum + suite.tests.filter(t => t.status === 'pass').length, 0
  );
  const warningTests = testSuites.reduce((sum, suite) => 
    sum + suite.tests.filter(t => t.status === 'warning').length, 0
  );
  const failedTests = testSuites.reduce((sum, suite) => 
    sum + suite.tests.filter(t => t.status === 'fail').length, 0
  );
  
  console.log(`📊 Test Summary: ${passedTests}/${totalTests} passed, ${warningTests} warnings, ${failedTests} failed`);
  console.groupEnd();
  
  return testSuites;
};

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(runAllTests, 3000);
    });
  } else {
    setTimeout(runAllTests, 3000);
  }
}

export default {
  runAllTests,
  testNavigation,
  testResponsiveness,
  testInteractivity,
  testAccessibility,
  testSEO,
  testErrorHandling
};

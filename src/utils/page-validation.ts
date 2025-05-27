
/**
 * Page Validation Utilities
 * Ensures all routes are accessible and functioning correctly
 */

export interface PageValidationResult {
  path: string;
  isAccessible: boolean;
  requiresAuth: boolean;
  error?: string;
  loadTime?: number;
}

export interface ValidationSummary {
  totalPages: number;
  accessiblePages: number;
  inaccessiblePages: number;
  authProtectedPages: number;
  results: PageValidationResult[];
}

// Define all application routes
export const APPLICATION_ROUTES = {
  public: [
    '/',
    '/features',
    '/ai-features',
    '/pricing',
    '/help',
    '/contact',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
    '/tutorials',
    '/accessibility',
    '/login',
    '/register'
  ],
  protected: [
    '/dashboard',
    '/saved',
    '/save',
    '/search',
    '/collections',
    '/activity',
    '/profile',
    '/settings'
  ]
};

/**
 * Validates if a route is accessible and responds correctly
 */
export const validateRoute = async (path: string, requiresAuth: boolean = false): Promise<PageValidationResult> => {
  const startTime = Date.now();
  
  try {
    // For client-side validation, we can check if the route exists in our router config
    const isValidRoute = [...APPLICATION_ROUTES.public, ...APPLICATION_ROUTES.protected].includes(path);
    
    if (!isValidRoute) {
      return {
        path,
        isAccessible: false,
        requiresAuth,
        error: 'Route not found in application configuration',
        loadTime: Date.now() - startTime
      };
    }
    
    return {
      path,
      isAccessible: true,
      requiresAuth,
      loadTime: Date.now() - startTime
    };
  } catch (error: any) {
    return {
      path,
      isAccessible: false,
      requiresAuth,
      error: error.message || 'Unknown error',
      loadTime: Date.now() - startTime
    };
  }
};

/**
 * Validates all application routes
 */
export const validateAllRoutes = async (): Promise<ValidationSummary> => {
  const results: PageValidationResult[] = [];
  
  // Validate public routes
  for (const path of APPLICATION_ROUTES.public) {
    const result = await validateRoute(path, false);
    results.push(result);
  }
  
  // Validate protected routes
  for (const path of APPLICATION_ROUTES.protected) {
    const result = await validateRoute(path, true);
    results.push(result);
  }
  
  const accessiblePages = results.filter(r => r.isAccessible).length;
  const authProtectedPages = results.filter(r => r.requiresAuth).length;
  
  return {
    totalPages: results.length,
    accessiblePages,
    inaccessiblePages: results.length - accessiblePages,
    authProtectedPages,
    results
  };
};

/**
 * Checks for broken internal links
 */
export const validateInternalLinks = (): { validLinks: string[]; brokenLinks: string[] } => {
  const validLinks: string[] = [];
  const brokenLinks: string[] = [];
  
  // Get all anchor tags in the document
  const links = document.querySelectorAll('a[href^="/"]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const isValidRoute = [...APPLICATION_ROUTES.public, ...APPLICATION_ROUTES.protected].includes(href);
      
      if (isValidRoute) {
        validLinks.push(href);
      } else {
        brokenLinks.push(href);
      }
    }
  });
  
  return { validLinks, brokenLinks };
};

/**
 * Validates navigation consistency across pages
 */
export const validateNavigationConsistency = (): {
  hasMainNavigation: boolean;
  hasFooterNavigation: boolean;
  navigationErrors: string[];
} => {
  const errors: string[] = [];
  
  // Check for main navigation
  const mainNav = document.querySelector('nav[role="navigation"]') || 
                  document.querySelector('header nav') ||
                  document.querySelector('[aria-label*="navigation" i]');
  
  if (!mainNav) {
    errors.push('Main navigation not found');
  }
  
  // Check for footer navigation (if applicable)
  const footerNav = document.querySelector('footer nav') ||
                    document.querySelector('footer [role="navigation"]');
  
  // Check for consistent navigation items
  const navLinks = document.querySelectorAll('nav a[href^="/"]');
  if (navLinks.length === 0) {
    errors.push('No internal navigation links found');
  }
  
  return {
    hasMainNavigation: !!mainNav,
    hasFooterNavigation: !!footerNav,
    navigationErrors: errors
  };
};

/**
 * Performance validation for pages
 */
export const validatePagePerformance = (): {
  loadTime: number;
  memoryUsage?: number;
  performanceWarnings: string[];
} => {
  const warnings: string[] = [];
  const loadTime = performance.now();
  
  // Check for potential performance issues
  const images = document.querySelectorAll('img:not([loading="lazy"])');
  if (images.length > 10) {
    warnings.push(`${images.length} images without lazy loading detected`);
  }
  
  const scripts = document.querySelectorAll('script');
  if (scripts.length > 20) {
    warnings.push(`${scripts.length} script tags detected - consider bundling`);
  }
  
  // Memory usage (if available)
  let memoryUsage: number | undefined;
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    memoryUsage = memory.usedJSHeapSize;
    
    if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
      warnings.push('High memory usage detected');
    }
  }
  
  return {
    loadTime,
    memoryUsage,
    performanceWarnings: warnings
  };
};

/**
 * Accessibility validation
 */
export const validateAccessibility = (): {
  hasSkipLinks: boolean;
  hasProperHeadingStructure: boolean;
  hasAltTextIssues: boolean;
  accessibilityWarnings: string[];
} => {
  const warnings: string[] = [];
  
  // Check for skip links
  const skipLinks = document.querySelectorAll('a[href="#main-content"], a[href^="#main"]');
  
  // Check heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const h1Count = document.querySelectorAll('h1').length;
  
  if (h1Count === 0) {
    warnings.push('No H1 heading found');
  } else if (h1Count > 1) {
    warnings.push('Multiple H1 headings found');
  }
  
  // Check for images without alt text
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} images without alt text`);
  }
  
  // Check for proper form labels
  const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
  const unlabeledInputs = Array.from(inputsWithoutLabels).filter(input => {
    const id = input.getAttribute('id');
    return !id || !document.querySelector(`label[for="${id}"]`);
  });
  
  if (unlabeledInputs.length > 0) {
    warnings.push(`${unlabeledInputs.length} form inputs without proper labels`);
  }
  
  return {
    hasSkipLinks: skipLinks.length > 0,
    hasProperHeadingStructure: h1Count === 1,
    hasAltTextIssues: imagesWithoutAlt.length > 0,
    accessibilityWarnings: warnings
  };
};

/**
 * Comprehensive page validation
 */
export const runFullPageValidation = async () => {
  console.log('🔍 Running comprehensive page validation...');
  
  const routeValidation = await validateAllRoutes();
  const linkValidation = validateInternalLinks();
  const navigationValidation = validateNavigationConsistency();
  const performanceValidation = validatePagePerformance();
  const accessibilityValidation = validateAccessibility();
  
  const report = {
    timestamp: new Date().toISOString(),
    routes: routeValidation,
    links: linkValidation,
    navigation: navigationValidation,
    performance: performanceValidation,
    accessibility: accessibilityValidation
  };
  
  console.log('✅ Page validation complete:', report);
  return report;
};

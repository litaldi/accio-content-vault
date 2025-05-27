
/**
 * Page Validation Utilities - Main Entry Point
 * Comprehensive validation orchestrator
 */

// Re-export all validation types and functions
export { 
  validateRoute, 
  validateAllRoutes, 
  APPLICATION_ROUTES,
  type PageValidationResult,
  type ValidationSummary 
} from './validation/route-validation';

export { 
  validateInternalLinks, 
  validateNavigationConsistency 
} from './validation/link-validation';

export { 
  validatePagePerformance 
} from './validation/performance-validation';

export { 
  validateAccessibility 
} from './validation/accessibility-validation';

// Import for comprehensive validation
import { validateAllRoutes } from './validation/route-validation';
import { validateInternalLinks, validateNavigationConsistency } from './validation/link-validation';
import { validatePagePerformance } from './validation/performance-validation';
import { validateAccessibility } from './validation/accessibility-validation';

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

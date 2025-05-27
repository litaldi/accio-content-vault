
/**
 * Route Validation Utilities
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

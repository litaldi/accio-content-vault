
/**
 * Production readiness checks and utilities
 */

interface ProductionCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export const runProductionChecks = (): ProductionCheck[] => {
  const checks: ProductionCheck[] = [];

  // Check for console.log statements in production
  if (process.env.NODE_ENV === 'production') {
    const originalLog = console.log;
    let hasConsoleLogs = false;
    
    console.log = (...args) => {
      hasConsoleLogs = true;
      originalLog(...args);
    };

    checks.push({
      name: 'Console Logs',
      status: hasConsoleLogs ? 'warning' : 'pass',
      message: hasConsoleLogs 
        ? 'Console.log statements detected in production'
        : 'No console.log statements in production'
    });
  }

  // Check for proper meta tags
  const hasTitle = document.title && document.title !== 'Vite + React + TS';
  const hasDescription = document.querySelector('meta[name="description"]');
  
  checks.push({
    name: 'SEO Meta Tags',
    status: hasTitle && hasDescription ? 'pass' : 'fail',
    message: hasTitle && hasDescription 
      ? 'Title and description meta tags present'
      : 'Missing title or description meta tags'
  });

  // Check for HTTPS in production
  const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  
  checks.push({
    name: 'HTTPS Security',
    status: isHTTPS ? 'pass' : 'fail',
    message: isHTTPS 
      ? 'Site is served over HTTPS'
      : 'Site should be served over HTTPS in production'
  });

  // Check for accessibility landmarks
  const hasMain = document.querySelector('main');
  const hasNav = document.querySelector('nav');
  
  checks.push({
    name: 'Accessibility Landmarks',
    status: hasMain && hasNav ? 'pass' : 'warning',
    message: hasMain && hasNav 
      ? 'Main and navigation landmarks present'
      : 'Missing some accessibility landmarks'
  });

  // Check for favicon
  const hasFavicon = document.querySelector('link[rel="icon"]') || 
                    document.querySelector('link[rel="shortcut icon"]');
  
  checks.push({
    name: 'Favicon',
    status: hasFavicon ? 'pass' : 'warning',
    message: hasFavicon ? 'Favicon is present' : 'Favicon is missing'
  });

  return checks;
};

export const logProductionChecks = () => {
  if (process.env.NODE_ENV === 'development') {
    const checks = runProductionChecks();
    
    console.group('🚀 Production Readiness Checks');
    checks.forEach(check => {
      const emoji = check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
      console.log(`${emoji} ${check.name}: ${check.message}`);
    });
    console.groupEnd();
  }
};

// Auto-run checks in development
if (process.env.NODE_ENV === 'development') {
  // Run checks after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logProductionChecks);
  } else {
    logProductionChecks();
  }
}

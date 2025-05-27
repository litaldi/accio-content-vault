
/**
 * Utility to help identify and clean up unused code
 * This file can be used in development to audit the codebase
 */

export const auditUnusedCode = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.group('🧹 Code Cleanup Audit');
  
  // Check for unused CSS classes
  const unusedClasses = findUnusedTailwindClasses();
  if (unusedClasses.length > 0) {
    console.warn('Potentially unused CSS classes:', unusedClasses);
  }

  // Check for unused imports (this would need static analysis in a real implementation)
  console.info('💡 Run `npx depcheck` to find unused dependencies');
  console.info('💡 Run ESLint with unused-imports rule to find unused imports');
  
  console.groupEnd();
};

const findUnusedTailwindClasses = (): string[] => {
  // This is a simplified implementation
  // In a real audit, you'd scan all files for class usage
  const potentiallyUnused = [
    'story-link', // Check if this custom class is still used
    'pulse', // Check if pulse animation is used
  ];

  return potentiallyUnused.filter(className => {
    // Simple check - in real implementation, scan all files
    return !document.querySelector(`.${className}`);
  });
};

// Clean up localStorage entries that might be outdated
export const cleanupLocalStorage = () => {
  if (typeof window === 'undefined') return;

  const keysToCheck = [
    'vite-ui-theme', // Current theme key
    'accio-preferences', // App preferences
    'auth-state' // Auth state
  ];

  Object.keys(localStorage).forEach(key => {
    if (!keysToCheck.includes(key) && key.startsWith('accio-')) {
      console.warn(`Potentially outdated localStorage key: ${key}`);
      // In development, log it; in production, you might want to remove it
      if (process.env.NODE_ENV === 'development') {
        console.log(`Consider removing: localStorage.removeItem('${key}')`);
      }
    }
  });
};

// Run audits in development
if (process.env.NODE_ENV === 'development') {
  // Run after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        auditUnusedCode();
        cleanupLocalStorage();
      }, 2000);
    });
  } else {
    setTimeout(() => {
      auditUnusedCode();
      cleanupLocalStorage();
    }, 2000);
  }
}

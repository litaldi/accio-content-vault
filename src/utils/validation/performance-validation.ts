
/**
 * Performance Validation Utilities
 */

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

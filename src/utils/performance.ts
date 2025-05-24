
/**
 * Performance utilities for optimizing user experience
 */

// Debounce function to limit API calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Performance measurement utility
export const measurePerformance = <T>(
  label: string,
  fn: () => T
): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
  return result;
};

// Lazy loading intersection observer
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  return null;
};

// Image optimization helper
export const optimizeImageLoading = (img: HTMLImageElement) => {
  // Add loading="lazy" if not already set
  if (!img.loading) {
    img.loading = 'lazy';
  }
  
  // Add decode="async" for better performance
  img.decoding = 'async';
  
  // Preload critical images
  if (img.classList.contains('critical')) {
    img.loading = 'eager';
  }
};

// Bundle size analyzer helper
export const analyzeBundleSize = () => {
  const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  
  if (entries.length > 0) {
    const navigation = entries[0];
    
    return {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      connection: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      dom: navigation.domContentLoadedEventEnd - navigation.responseEnd,
      total: navigation.loadEventEnd - navigation.navigationStart
    };
  }
  
  return null;
};

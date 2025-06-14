
/**
 * Performance utilities for optimization and measurement
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function measurePerformance<T>(
  label: string,
  fn: () => T
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
  return result;
}

// Export a performance utilities object to avoid conflicts with global performance
export const performanceUtils = {
  measureRender: (component: string) => {
    console.log(`Measuring render performance for ${component}`);
  },
  measureFunction: <T>(fn: () => T, label: string): T => {
    return measurePerformance(label, fn);
  }
};

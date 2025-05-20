
/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit how often a function can be called
 * @param func The function to debounce
 * @param wait Time in milliseconds to wait before calling the function
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      window.clearTimeout(timeout);
    }
    
    timeout = window.setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit how often a function can be called
 * @param func The function to throttle
 * @param limit Time in milliseconds between function calls
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  let lastArgs: Parameters<T> | null = null;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          const currentArgs = lastArgs;
          lastArgs = null;
          func(...currentArgs);
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

/**
 * Lazy loads an image and returns a promise that resolves when the image is loaded
 * @param src Image source URL
 * @returns Promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Measure component render time
 * @param name Component name for logging
 * @param callback Function to measure
 * @returns Result of the callback
 */
export function measurePerformance<T>(name: string, callback: () => T): T {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    console.log(`[Performance] ${name} took ${(end - start).toFixed(2)}ms to render`);
    return result;
  }
  
  return callback();
}

/**
 * Create a reusable memoization function
 * @returns Memoized function
 */
export function createMemoize<T extends (...args: any[]) => any>() {
  const cache = new Map();
  
  return function memoize(func: T): T {
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  };
}

/**
 * Request idle callback with fallback
 * @param callback Function to run during idle time
 * @param options Options for requestIdleCallback
 * @returns ID for cancellation
 */
export function requestIdleCallback(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(callback, options);
  }
  
  // Fallback for browsers that don't support requestIdleCallback
  const timeout = options?.timeout || 50;
  return window.setTimeout(() => {
    const start = Date.now();
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    });
  }, timeout);
}

/**
 * Cancel an idle callback
 * @param id ID from requestIdleCallback
 */
export function cancelIdleCallback(id: number): void {
  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

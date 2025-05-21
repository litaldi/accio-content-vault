
/**
 * Performance utility functions for monitoring and optimizing app performance
 */

/**
 * Measure the performance of a function execution
 * 
 * @param name - Name of the performance measurement
 * @param fn - Function to measure
 * @returns The result of the function
 */
export function measurePerformance<T>(name: string, fn: () => T): T {
  const startTime = performance.now();
  const result = fn();
  const endTime = performance.now();
  
  console.log(`⚡️ Performance [${name}]: ${(endTime - startTime).toFixed(2)}ms`);
  
  return result;
}

/**
 * Debounce function to limit how often a function can be called
 * 
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function to limit how often a function can be called
 * 
 * @param fn - Function to throttle
 * @param limit - Limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      fn(...args);
      lastCall = now;
    }
  };
}

/**
 * Get Core Web Vitals metrics
 * 
 * @returns Promise that resolves to web vitals metrics
 */
export async function getCoreWebVitals(): Promise<Record<string, number>> {
  if ('web-vitals' in window) {
    // In a real implementation, you would use the web-vitals library
    // This is a placeholder for demonstration purposes
    return {
      LCP: 0, // Largest Contentful Paint
      FID: 0, // First Input Delay
      CLS: 0, // Cumulative Layout Shift
      FCP: 0, // First Contentful Paint
      TTFB: 0, // Time to First Byte
    };
  }
  
  return Promise.resolve({});
}

/**
 * Lazy load images when they come into view
 * 
 * @param imageSelector - CSS selector for images to lazy load
 */
export function setupLazyLoading(imageSelector: string = 'img.lazy'): void {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    document.querySelectorAll(imageSelector).forEach((image) => {
      lazyImageObserver.observe(image);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    console.warn('IntersectionObserver not supported, lazy loading disabled');
  }
}

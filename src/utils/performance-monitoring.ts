
import React from 'react';

/**
 * Performance monitoring and web vitals tracking
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initWebVitals();
  }

  private initWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Monitor Core Web Vitals
    try {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Handle different types of performance entries with proper typing
          let value = 0;
          
          // Check for entries with a value property (like web vitals)
          if ('value' in entry && typeof (entry as any).value === 'number') {
            value = (entry as any).value;
          } 
          // Check for entries with duration (like measures)
          else if ('duration' in entry && typeof entry.duration === 'number') {
            value = entry.duration;
          } 
          // Fallback to startTime for other entry types
          else if ('startTime' in entry && typeof entry.startTime === 'number') {
            value = entry.startTime;
          }
          
          this.recordMetric(entry.name, value);
        });
      });

      this.observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
    } catch (error) {
      console.warn('Performance monitoring failed to initialize:', error);
    }
  }

  recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now()
    };

    this.metrics.push(metric);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} = ${value}ms`);
    }

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const filteredMetrics = this.metrics.filter(m => m.name === name);
    if (filteredMetrics.length === 0) return 0;
    
    const sum = filteredMetrics.reduce((acc, m) => acc + m.value, 0);
    return sum / filteredMetrics.length;
  }

  // Measure page load performance
  measurePageLoad() {
    if (typeof window === 'undefined') return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      // Use proper PerformanceNavigationTiming properties
      this.recordMetric('page-load', navigation.loadEventEnd - navigation.fetchStart);
      this.recordMetric('dom-content-loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
      this.recordMetric('first-byte', navigation.responseStart - navigation.fetchStart);
    }
  }

  // Measure component render time
  measureRender(componentName: string, startTime: number) {
    const endTime = performance.now();
    this.recordMetric(`render-${componentName}`, endTime - startTime);
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// React hook for measuring component performance
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      performanceMonitor.measureRender(componentName, startTime);
    };
  }, [componentName]);
};

// Utility to measure async operations
export const measureAsync = async <T>(
  name: string, 
  operation: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await operation();
    performanceMonitor.recordMetric(name, performance.now() - startTime);
    return result;
  } catch (error) {
    performanceMonitor.recordMetric(`${name}-error`, performance.now() - startTime);
    throw error;
  }
};

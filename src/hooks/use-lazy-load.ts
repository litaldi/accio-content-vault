
import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
  onInView?: () => void;
}

/**
 * Custom hook for lazy loading elements when they come into view
 * Uses the IntersectionObserver API to detect when an element is visible
 * 
 * @param options Configuration options for the IntersectionObserver
 * @returns An object with a ref to attach to the element and a boolean indicating if the element is in view
 */
export const useLazyLoad = ({
  rootMargin = '200px',
  threshold = 0.1,
  enabled = true,
  onInView,
}: UseLazyLoadOptions = {}) => {
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // If disabled, skip observer setup
    if (!enabled) {
      setInView(true);
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      console.warn('IntersectionObserver not supported, lazy loading disabled');
      return;
    }

    // Cleanup previous observer if element changes
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          setInView(true);
          
          // Call onInView callback if provided
          if (onInView) {
            onInView();
          }
          
          // Once the element is in view, stop observing
          if (observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      },
      { rootMargin, threshold }
    );

    // Start observing the element if it exists
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    // Cleanup function to disconnect the observer when component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [rootMargin, threshold, enabled, onInView]);

  return { ref: elementRef, inView };
};

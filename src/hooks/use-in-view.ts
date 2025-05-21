
import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useInView(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    rootMargin = '0px',
    once = true,
    delay = 0
  }: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView) {
          // Apply delay if specified
          if (delay > 0) {
            const timer = setTimeout(() => {
              setIsInView(true);
            }, delay);
            return () => clearTimeout(timer);
          } else {
            setIsInView(true);
          }
          
          // If the element has been seen and the once option is true,
          // unobserve the element
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // Only toggle off visibility if once is false
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, threshold, rootMargin, once, delay]);

  return isInView;
}

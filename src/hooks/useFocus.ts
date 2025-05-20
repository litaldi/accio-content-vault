
import { useRef, useEffect } from 'react';

export function useFocus<T extends HTMLElement = HTMLElement>(
  shouldFocus: boolean = false, 
  options: FocusOptions = {}
) {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    if (shouldFocus && ref.current) {
      // Ensure the element exists and is focusable
      try {
        ref.current.focus(options);
      } catch (error) {
        console.error("Error focusing element:", error);
      }
    }
    
    return () => {
      // Clean up any focus-related side effects if needed
    };
  }, [shouldFocus, options]);
  
  return ref;
}

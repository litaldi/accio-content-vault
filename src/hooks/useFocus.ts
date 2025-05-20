
import { useRef, useEffect } from 'react';

export function useFocus<T extends HTMLElement = HTMLElement>(
  shouldFocus: boolean = false, 
  options: FocusOptions = {}
) {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus(options);
    }
  }, [shouldFocus, options]);
  
  return ref;
}


import React, { useEffect, useRef, ReactNode } from 'react';
import { trapFocus, getFocusableElements } from '@/utils/accessibility';

interface FocusManagerProps {
  children: ReactNode;
  enabled?: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  enabled = true,
  restoreFocus = true,
  autoFocus = true,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Store the previously focused element
    if (restoreFocus) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    }

    // Auto-focus the first focusable element
    if (autoFocus) {
      const focusableElements = getFocusableElements(containerRef.current);
      const firstElement = focusableElements[0];
      if (firstElement) {
        firstElement.focus();
      }
    }

    // Set up focus trap
    const cleanup = trapFocus(containerRef.current);

    return () => {
      cleanup();
      
      // Restore focus to previously focused element
      if (restoreFocus && previouslyFocusedElement.current) {
        try {
          previouslyFocusedElement.current.focus();
        } catch (error) {
          // Element might no longer be in the DOM
          console.warn('Could not restore focus to previous element:', error);
        }
      }
    };
  }, [enabled, restoreFocus, autoFocus]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      role="region"
      aria-label="Focus managed content"
    >
      {children}
    </div>
  );
};

export default FocusManager;


import React, { createContext, useContext, useCallback, useRef } from 'react';

interface AccessibilityAnnouncerContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  announceNavigation: (page: string) => void;
  announceAction: (action: string, result?: string) => void;
}

const AccessibilityAnnouncerContext = createContext<AccessibilityAnnouncerContextType | undefined>(undefined);

export const useAccessibilityAnnouncer = () => {
  const context = useContext(AccessibilityAnnouncerContext);
  if (!context) {
    throw new Error('useAccessibilityAnnouncer must be used within an AccessibilityAnnouncerProvider');
  }
  return context;
};

interface AccessibilityAnnouncerProviderProps {
  children: React.ReactNode;
}

export const AccessibilityAnnouncerProvider: React.FC<AccessibilityAnnouncerProviderProps> = ({ children }) => {
  const politeRef = useRef<HTMLDivElement>(null);
  const assertiveRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const targetRef = priority === 'assertive' ? assertiveRef : politeRef;
    
    if (targetRef.current) {
      // Clear and then set the message to ensure it's announced
      targetRef.current.textContent = '';
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.textContent = message;
        }
      }, 100);
    }
  }, []);

  const announceNavigation = useCallback((page: string) => {
    announce(`Navigated to ${page}`, 'polite');
  }, [announce]);

  const announceAction = useCallback((action: string, result?: string) => {
    const message = result ? `${action}. ${result}` : action;
    announce(message, 'polite');
  }, [announce]);

  const value = {
    announce,
    announceNavigation,
    announceAction
  };

  return (
    <AccessibilityAnnouncerContext.Provider value={value}>
      {children}
      {/* Screen reader announcement regions */}
      <div
        ref={politeRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div
        ref={assertiveRef}
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
    </AccessibilityAnnouncerContext.Provider>
  );
};

export const AccessibilityAnnouncer = AccessibilityAnnouncerProvider;

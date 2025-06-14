
import React, { createContext, useContext, useState, useRef } from 'react';

interface AccessibilityAnnouncerContextType {
  announceNavigation: (message: string) => void;
  announceAction: (message: string) => void;
  announceError: (message: string) => void;
}

const AccessibilityAnnouncerContext = createContext<AccessibilityAnnouncerContextType | undefined>(undefined);

export const AccessibilityAnnouncerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');
  
  const politeTimeoutRef = useRef<NodeJS.Timeout>();
  const assertiveTimeoutRef = useRef<NodeJS.Timeout>();

  const announceNavigation = (message: string) => {
    setPoliteMessage(message);
    if (politeTimeoutRef.current) clearTimeout(politeTimeoutRef.current);
    politeTimeoutRef.current = setTimeout(() => setPoliteMessage(''), 1000);
  };

  const announceAction = (message: string) => {
    setPoliteMessage(message);
    if (politeTimeoutRef.current) clearTimeout(politeTimeoutRef.current);
    politeTimeoutRef.current = setTimeout(() => setPoliteMessage(''), 1000);
  };

  const announceError = (message: string) => {
    setAssertiveMessage(message);
    if (assertiveTimeoutRef.current) clearTimeout(assertiveTimeoutRef.current);
    assertiveTimeoutRef.current = setTimeout(() => setAssertiveMessage(''), 2000);
  };

  return (
    <AccessibilityAnnouncerContext.Provider value={{ announceNavigation, announceAction, announceError }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {politeMessage}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {assertiveMessage}
      </div>
    </AccessibilityAnnouncerContext.Provider>
  );
};

export const useAccessibilityAnnouncer = () => {
  const context = useContext(AccessibilityAnnouncerContext);
  if (context === undefined) {
    throw new Error('useAccessibilityAnnouncer must be used within an AccessibilityAnnouncerProvider');
  }
  return context;
};

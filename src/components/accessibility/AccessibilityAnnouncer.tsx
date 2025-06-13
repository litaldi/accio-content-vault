
import React, { createContext, useContext, useCallback } from 'react';

interface AccessibilityAnnouncerContextType {
  announceNavigation: (message: string) => void;
  announceAction: (message: string) => void;
  announceError: (message: string) => void;
  announceSuccess: (message: string) => void;
}

const AccessibilityAnnouncerContext = createContext<AccessibilityAnnouncerContextType | undefined>(undefined);

export const useAccessibilityAnnouncer = () => {
  const context = useContext(AccessibilityAnnouncerContext);
  if (!context) {
    throw new Error('useAccessibilityAnnouncer must be used within AccessibilityAnnouncerProvider');
  }
  return context;
};

interface AccessibilityAnnouncerProviderProps {
  children: React.ReactNode;
}

export const AccessibilityAnnouncerProvider: React.FC<AccessibilityAnnouncerProviderProps> = ({ children }) => {
  const createAnnouncement = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  const announceNavigation = useCallback((message: string) => {
    createAnnouncement(`Navigated to ${message}`, 'polite');
  }, [createAnnouncement]);

  const announceAction = useCallback((message: string) => {
    createAnnouncement(message, 'polite');
  }, [createAnnouncement]);

  const announceError = useCallback((message: string) => {
    createAnnouncement(`Error: ${message}`, 'assertive');
  }, [createAnnouncement]);

  const announceSuccess = useCallback((message: string) => {
    createAnnouncement(`Success: ${message}`, 'polite');
  }, [createAnnouncement]);

  const value = {
    announceNavigation,
    announceAction,
    announceError,
    announceSuccess
  };

  return (
    <AccessibilityAnnouncerContext.Provider value={value}>
      {children}
    </AccessibilityAnnouncerContext.Provider>
  );
};

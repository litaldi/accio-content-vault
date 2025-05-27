
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface AccessibilityAnnouncerProps {
  children: React.ReactNode;
}

export const AccessibilityAnnouncer: React.FC<AccessibilityAnnouncerProps> = ({ children }) => {
  const location = useLocation();
  const { announceToScreenReader } = useAccessibility();

  // Announce route changes
  useEffect(() => {
    const pageTitle = document.title;
    announceToScreenReader(`Navigated to ${pageTitle}`);
  }, [location.pathname, announceToScreenReader]);

  return (
    <>
      {children}
      
      {/* Live region for announcements */}
      <div
        id="accessibility-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />
      
      {/* Alert region for urgent announcements */}
      <div
        id="accessibility-alerts"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="alert"
      />
    </>
  );
};

export default AccessibilityAnnouncer;


import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EnhancedAccessibility: React.FC = () => {
  const location = useLocation();

  // Announce route changes to screen readers
  useEffect(() => {
    const announcePageChange = () => {
      const pageTitle = document.title;
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Page changed to ${pageTitle}`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    announcePageChange();
  }, [location.pathname]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Skip to main content on Alt+M
      if (event.altKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Escape key to close modals and menus
      if (event.key === 'Escape') {
        const openMenus = document.querySelectorAll('[data-state="open"]');
        openMenus.forEach(menu => {
          const closeButton = menu.querySelector('[aria-label*="close"], [aria-label*="Close"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return null;
};

export default EnhancedAccessibility;

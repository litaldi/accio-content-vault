
/**
 * Link Validation Utilities
 */

import { APPLICATION_ROUTES } from './route-validation';

/**
 * Checks for broken internal links
 */
export const validateInternalLinks = (): { validLinks: string[]; brokenLinks: string[] } => {
  const validLinks: string[] = [];
  const brokenLinks: string[] = [];
  
  // Get all anchor tags in the document
  const links = document.querySelectorAll('a[href^="/"]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const isValidRoute = [...APPLICATION_ROUTES.public, ...APPLICATION_ROUTES.protected].includes(href);
      
      if (isValidRoute) {
        validLinks.push(href);
      } else {
        brokenLinks.push(href);
      }
    }
  });
  
  return { validLinks, brokenLinks };
};

/**
 * Validates navigation consistency across pages
 */
export const validateNavigationConsistency = (): {
  hasMainNavigation: boolean;
  hasFooterNavigation: boolean;
  navigationErrors: string[];
} => {
  const errors: string[] = [];
  
  // Check for main navigation
  const mainNav = document.querySelector('nav[role="navigation"]') || 
                  document.querySelector('header nav') ||
                  document.querySelector('[aria-label*="navigation" i]');
  
  if (!mainNav) {
    errors.push('Main navigation not found');
  }
  
  // Check for footer navigation (if applicable)
  const footerNav = document.querySelector('footer nav') ||
                    document.querySelector('footer [role="navigation"]');
  
  // Check for consistent navigation items
  const navLinks = document.querySelectorAll('nav a[href^="/"]');
  if (navLinks.length === 0) {
    errors.push('No internal navigation links found');
  }
  
  return {
    hasMainNavigation: !!mainNav,
    hasFooterNavigation: !!footerNav,
    navigationErrors: errors
  };
};

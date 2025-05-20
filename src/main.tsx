
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set up any global handlers or polyfills for accessibility
if (typeof window !== 'undefined') {
  // Add keyboard navigation listener for improving accessibility
  window.addEventListener('keydown', (e) => {
    // Add visible outline to focused elements when using keyboard navigation
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });
  
  // Remove the outline when mouse is used
  window.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
  
  // Add focus-visible polyfill for browsers that don't support it
  if (!('focusVisible' in document.documentElement.style)) {
    import('focus-visible').then(() => {
      console.log('Focus-visible polyfill loaded');
    });
  }
  
  // Add skip link handler for better keyboard navigation
  window.addEventListener('DOMContentLoaded', () => {
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.tabIndex = -1;
            targetElement.focus();
            targetElement.addEventListener('blur', () => {
              targetElement.removeAttribute('tabindex');
            }, { once: true });
          }
        }
      });
    });
  });
  
  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-animations');
  }
  
  // Listen for changes to reduced motion preference
  prefersReducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      document.documentElement.classList.add('reduce-animations');
    } else {
      document.documentElement.classList.remove('reduce-animations');
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

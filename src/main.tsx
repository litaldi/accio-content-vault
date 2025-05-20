
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
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

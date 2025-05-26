
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { logProductionChecks } from './utils/production-checks';

// Run production readiness checks in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(logProductionChecks, 1000);
}

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Log page load performance
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    console.info('Page load time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

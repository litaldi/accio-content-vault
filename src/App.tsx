
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import SecureErrorBoundary from '@/components/error/SecureErrorBoundary';
import { AppRoutes } from '@/routing/AppRoutes';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppSecurity } from '@/hooks/useAppSecurity';

function App() {
  const location = useLocation();

  // Scroll to top on route change for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize security monitoring and validation
  useAppSecurity();

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <SecureErrorBoundary>
            <Helmet titleTemplate="%s | Accio" defaultTitle="Accio - AI-Powered Knowledge Management">
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="X-Content-Type-Options" content="nosniff" />
              <meta name="X-Frame-Options" content="DENY" />
              <meta name="X-XSS-Protection" content="1; mode=block" />
              <meta name="Referrer-Policy" content="strict-origin-when-cross-origin" />
            </Helmet>
            
            {/* Skip link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium z-50 transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                  mainContent.focus();
                  mainContent.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Skip to main content
            </a>
            
            <AppLayout>
              <AppRoutes />
            </AppLayout>
            
            <Toaster />
          </SecureErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

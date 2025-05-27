
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routing/AppRoutes';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppSecurity } from '@/hooks/useAppSecurity';
import { useErrorBoundary } from '@/hooks/useErrorBoundary';
import '@/styles/enhanced-responsive.css';

/**
 * AppContent - Main application content with security and error handling
 * This component handles app-level security checks and error boundaries
 */
const AppContent: React.FC = () => {
  useAppSecurity();
  const { ErrorBoundary } = useErrorBoundary();

  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">
            We're sorry, but something unexpected happened.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reload Page
          </button>
        </div>
      </div>
    }>
      {/* Main Layout wraps all routes with consistent header/footer */}
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ErrorBoundary>
  );
};

/**
 * App - Root application component
 * Provides global context providers and routing setup
 * 
 * Router Structure:
 * - BrowserRouter: Single router instance at app root
 * - AuthProvider: Authentication context for all routes
 * - HelmetProvider: SEO/meta tag management
 * - MainLayout: Consistent navigation and footer
 * - AppRoutes: All route definitions
 */
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

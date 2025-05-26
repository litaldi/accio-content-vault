
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load pages for better performance
const UnifiedIndex = lazy(() => import('@/pages/UnifiedIndex'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Dashboard = lazy(() => import('@/components/Dashboard/Dashboard'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AccessibilityProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <div className="min-h-screen bg-background text-foreground">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<UnifiedIndex />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Add more routes as needed */}
                      </Routes>
                    </Suspense>
                    <Toaster />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

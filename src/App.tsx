
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/ui/loading-spinner';
import EnhancedAccessibility from '@/components/accessibility/EnhancedAccessibility';
import ProtectedRoute from '@/components/ProtectedRoute';

// Import Login, Register and NotFound directly instead of lazy loading to avoid dynamic import errors
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

// Lazy load other pages for better performance
const ImprovedIndex = lazy(() => import('@/pages/ImprovedIndex'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Save = lazy(() => import('@/pages/Save'));
const Search = lazy(() => import('@/pages/Search'));
const Settings = lazy(() => import('@/pages/Settings'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AccessibilityProvider>
              <AuthProvider>
                <TooltipProvider>
                  <BrowserRouter>
                    <div className="min-h-screen bg-background text-foreground">
                      <EnhancedAccessibility />
                      
                      <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                          <Route path="/" element={<ImprovedIndex />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route 
                            path="/dashboard" 
                            element={
                              <ProtectedRoute>
                                <Dashboard />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="/save" 
                            element={
                              <ProtectedRoute>
                                <Save />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="/search" 
                            element={
                              <ProtectedRoute>
                                <Search />
                              </ProtectedRoute>
                            } 
                          />
                          <Route 
                            path="/settings" 
                            element={
                              <ProtectedRoute>
                                <Settings />
                              </ProtectedRoute>
                            } 
                          />
                          {/* Catch-all route for 404 pages */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                      
                      <Toaster />
                    </div>
                  </BrowserRouter>
                </TooltipProvider>
              </AuthProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

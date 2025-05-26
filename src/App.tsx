
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
const Features = lazy(() => import('@/pages/Features'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const About = lazy(() => import('@/pages/About'));
const SaveContent = lazy(() => import('@/pages/SaveContent'));
const Collections = lazy(() => import('@/pages/Collections'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Settings = lazy(() => import('@/pages/Settings'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Blog = lazy(() => import('@/pages/Blog'));

// Create a client with security-focused configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false, // Don't retry mutations for security
    },
  },
});

// Enhanced loading component with accessibility
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-hidden="true"></div>
    <span className="sr-only">Loading application...</span>
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
                        <Route path="/features" element={<Features />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/save" element={<SaveContent />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/blog" element={<Blog />} />
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

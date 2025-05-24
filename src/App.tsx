
import React, { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { HelmetProvider } from 'react-helmet-async';
import SkipToContent from "./components/SkipToContent";
import ErrorBoundary from "./components/ErrorBoundary";
import ShareTargetHandler from "./components/ShareTargetHandler";
import { setupGlobalErrorHandlers } from "@/utils/errorHandling";

// Import components
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SaveContent from "./pages/SaveContent";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import AccountSettings from "./pages/AccountSettings";
import Analytics from "./pages/Analytics";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import FAQ from "./pages/FAQ";
import Sitemap from "./pages/Sitemap";
import Blog from "./pages/Blog";
import Features from "./pages/Features";
import Playground from "./pages/Playground";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client with improved error handling and performance optimization
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = error.status as number;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      meta: {
        onError: (error) => {
          console.error('Query error:', error);
        }
      }
    },
    mutations: {
      retry: 1,
      meta: {
        onError: (error) => {
          console.error('Mutation error:', error);
        }
      }
    }
  },
});

const App: React.FC = () => {
  useEffect(() => {
    // Set up global error handlers
    setupGlobalErrorHandlers();
    
    // Performance monitoring with proper type checking
    if ('performance' in window && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input' && 'processingStart' in entry) {
            const fidEntry = entry as PerformanceEventTiming;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      } catch (error) {
        console.warn('Performance observer not supported:', error);
      }
    }
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <HelmetProvider>
                <AuthProvider>
                  <AccessibilityProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <SkipToContent />
                      <ShareTargetHandler />
                      <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/pricing" element={<Pricing />} />
                        
                        {/* New and existing static pages */}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/playground" element={<Playground />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/accessibility" element={<AccessibilityStatement />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/sitemap" element={<Sitemap />} />
                        
                        {/* Protected routes - require authentication */}
                        <Route path="/dashboard" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading dashboard">Loading dashboard...</div>}>
                              <Dashboard />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/save" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading content form">Loading content form...</div>}>
                              <SaveContent />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading settings">Loading settings...</div>}>
                              <AccountSettings />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/analytics" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading analytics">Loading analytics...</div>}>
                              <Analytics />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/collections" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen" role="status" aria-label="Loading collections">Loading collections...</div>}>
                              <Collections />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        
                        {/* Catch all route - 404 */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </AccessibilityProvider>
                </AuthProvider>
              </HelmetProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;

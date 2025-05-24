
import React, { Suspense, lazy } from "react";
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

// Create a client with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      meta: {
        onError: (error) => {
          console.error('Query error:', error);
        }
      }
    },
    mutations: {
      meta: {
        onError: (error) => {
          console.error('Mutation error:', error);
        }
      }
    }
  },
});

const App: React.FC = () => {
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
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading dashboard...</div>}>
                              <Dashboard />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/save" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading content form...</div>}>
                              <SaveContent />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading settings...</div>}>
                              <AccountSettings />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/analytics" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading analytics...</div>}>
                              <Analytics />
                            </Suspense>
                          </ProtectedRoute>
                        } />
                        <Route path="/collections" element={
                          <ProtectedRoute>
                            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading collections...</div>}>
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

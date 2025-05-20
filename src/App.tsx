
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SkipLink } from "@/components/accessibility/SkipLink";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import '@/i18n'; // Import i18n initialization

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="loading-spinner" aria-label="Loading content"></div>
  </div>
);

// Lazy-loaded pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const EnterpriseLanding = React.lazy(() => import("./pages/EnterpriseLanding"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const SaveContent = React.lazy(() => import("./pages/SaveContent"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const AccountSettings = React.lazy(() => import("./pages/AccountSettings"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const Collections = React.lazy(() => import("./pages/Collections"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1, // Only retry once to avoid excessive retries on server errors
    },
  }
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageProvider>
              <TooltipProvider>
                <AuthProvider>
                  <AccessibilityProvider>
                    {/* Skip link for keyboard navigation */}
                    <SkipLink 
                      targetId="main-content" 
                      className="absolute z-50 top-2 left-2 transform -translate-y-16 focus:translate-y-0"
                    />
                    
                    {/* Toast notifications */}
                    <Toaster />
                    <Sonner />
                    
                    <BrowserRouter>
                      <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                          <Route path="/" element={<LandingPage />} />
                          <Route path="/home" element={<Index />} />
                          <Route path="/enterprise" element={<EnterpriseLanding />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          
                          {/* Protected routes - require authentication */}
                          <Route path="/dashboard" element={
                            <ProtectedRoute>
                              <Dashboard />
                            </ProtectedRoute>
                          } />
                          <Route path="/save" element={
                            <ProtectedRoute>
                              <SaveContent />
                            </ProtectedRoute>
                          } />
                          <Route path="/settings" element={
                            <ProtectedRoute>
                              <AccountSettings />
                            </ProtectedRoute>
                          } />
                          <Route path="/analytics" element={
                            <ProtectedRoute>
                              <Analytics />
                            </ProtectedRoute>
                          } />
                          <Route path="/collections" element={
                            <ProtectedRoute>
                              <Collections />
                            </ProtectedRoute>
                          } />
                          
                          <Route path="/pricing" element={<Pricing />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </BrowserRouter>
                  </AccessibilityProvider>
                </AuthProvider>
              </TooltipProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;

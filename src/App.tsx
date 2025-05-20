
import React from "react";
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
import { AccessibilityButton } from "@/components/accessibility/AccessibilityButton";
import '@/i18n'; // Import i18n initialization
import { useErrorBoundary } from "@/hooks/useErrorBoundary";

import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SaveContent from "./pages/SaveContent";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import AccountSettings from "./pages/AccountSettings";
import Analytics from "./pages/Analytics";
import Collections from "./pages/Collections";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 2,
      onError: (error) => {
        console.error("Query error:", error);
      },
    },
  }
});

const App: React.FC = () => {
  const { ErrorBoundary } = useErrorBoundary();
  
  // Global error boundary fallback UI
  const globalErrorFallback = (error: Error) => (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full p-6 bg-card rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold text-destructive mb-4">Application Error</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, something went wrong. Our team has been notified.
        </p>
        <div className="bg-muted/50 p-4 rounded mb-6 overflow-auto max-h-[200px]">
          <code className="text-sm">{error.message}</code>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Reload Application
        </button>
      </div>
    </div>
  );

  return (
    <React.StrictMode>
      <ErrorBoundary fallback={globalErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageProvider>
              <TooltipProvider>
                <AuthProvider>
                  <AccessibilityProvider>
                    <SkipLink targetId="main-content" />
                    <AccessibilityButton />
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<Index />} />
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


import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { SecureAuthProvider } from '@/contexts/SecureAuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { EnhancedAccessibility } from '@/components/accessibility/EnhancedAccessibility';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SecurityHeaders } from '@/components/security/SecurityHeaders';
import { useAppSecurity } from '@/hooks/useAppSecurity';
import { securityMonitor } from '@/utils/securityMonitor';
import SecureProtectedRoute from '@/components/security/SecureProtectedRoute';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: false,
    },
  },
});

function AppContent() {
  useAppSecurity();
  
  useEffect(() => {
    // Initialize security monitoring
    securityMonitor.initialize();
  }, []);
  
  return (
    <div className="min-h-screen">
      <SecurityHeaders />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/features" element={<Features />} />
        <Route 
          path="/dashboard" 
          element={
            <SecureProtectedRoute>
              <Dashboard />
            </SecureProtectedRoute>
          } 
        />
      </Routes>
      <AccessibilityToolbar />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <SecureAuthProvider>
              <AccessibilityProvider>
                <EnhancedAccessibility>
                  <TooltipProvider>
                    <AppContent />
                    <Toaster />
                  </TooltipProvider>
                </EnhancedAccessibility>
              </AccessibilityProvider>
            </SecureAuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

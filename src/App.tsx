
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { SecureAuthProvider } from "@/contexts/SecureAuthContext";
import { EnhancedSecurityHeaders } from "@/components/security/EnhancedSecurityHeaders";
import { useAppSecurity } from "@/hooks/useAppSecurity";
import Index from "./pages/Index";

// Lazy load components for better performance
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const EnhancedSettings = lazy(() => import("./pages/EnhancedSettings"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error?.message?.includes('JWT') || error?.message?.includes('auth')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const SecurityWrapper = ({ children }: { children: React.ReactNode }) => {
  useAppSecurity();
  return <>{children}</>;
};

function App() {
  return (
    <HelmetProvider>
      <EnhancedSecurityHeaders />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <SecureAuthProvider>
                <SecurityWrapper>
                  <BrowserRouter>
                    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
                      <Suspense fallback={
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                      }>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<EnhancedSettings />} />
                        </Routes>
                      </Suspense>
                    </div>
                    <Toaster />
                    <Sonner />
                  </BrowserRouter>
                </SecurityWrapper>
              </SecureAuthProvider>
            </AuthProvider>
          </AccessibilityProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

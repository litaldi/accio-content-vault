
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Index from "./pages/Index";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const SaveContent = lazy(() => import("./pages/SaveContent"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/save"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<div>Loading...</div>}>
                        <SaveContent />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;


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

// Lazy load all pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SaveContent = lazy(() => import("./pages/SaveContent"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Collections = lazy(() => import("./pages/Collections"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Playground = lazy(() => import("./pages/Playground"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

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
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Login />
                  </Suspense>
                } />
                <Route path="/register" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Register />
                  </Suspense>
                } />
                <Route path="/about" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <About />
                  </Suspense>
                } />
                <Route path="/features" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Features />
                  </Suspense>
                } />
                <Route path="/pricing" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Pricing />
                  </Suspense>
                } />
                <Route path="/contact" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Contact />
                  </Suspense>
                } />
                <Route path="/faq" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <FAQ />
                  </Suspense>
                } />
                <Route path="/blog" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Blog />
                  </Suspense>
                } />
                <Route path="/privacy" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Privacy />
                  </Suspense>
                } />
                <Route path="/terms" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Terms />
                  </Suspense>
                } />
                <Route path="/playground" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Playground />
                  </Suspense>
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <Dashboard />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/save" element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <SaveContent />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/collections" element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <Collections />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <Analytics />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingFallback />}>
                      <AccountSettings />
                    </Suspense>
                  </ProtectedRoute>
                } />

                {/* 404 Route */}
                <Route path="*" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

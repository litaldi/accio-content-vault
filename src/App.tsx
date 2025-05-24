import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import ShareTargetHandler from "@/components/ShareTargetHandler";
import PrimaryNavigation from "@/components/navigation/PrimaryNavigation";
import AppFooter from "@/components/layout/AppFooter";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SaveContent = lazy(() => import("./pages/SaveContent"));
const Search = lazy(() => import("./pages/Search"));
const Collections = lazy(() => import("./pages/Collections"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const OfflinePage = lazy(() => import("./pages/OfflinePage"));
const Reminders = lazy(() => import("./pages/Reminders"));
const Upgrade = lazy(() => import("./pages/Upgrade"));
const Features = lazy(() => import("./pages/Features"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AccessibilityProvider>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                <BrowserRouter>
                  <AuthProvider>
                    <div className="min-h-screen bg-background flex flex-col">
                      <ShareTargetHandler />
                      <PrimaryNavigation />
                      <main className="flex-1">
                        <Suspense fallback={
                          <div className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                              <p className="text-muted-foreground">Loading...</p>
                            </div>
                          </div>
                        }>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
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
                                  <SaveContent />
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
                              path="/collections" 
                              element={
                                <ProtectedRoute>
                                  <Collections />
                                </ProtectedRoute>
                              } 
                            />
                            <Route 
                              path="/analytics" 
                              element={
                                <ProtectedRoute>
                                  <Analytics />
                                </ProtectedRoute>
                              } 
                            />
                            <Route 
                              path="/reminders" 
                              element={
                                <ProtectedRoute>
                                  <Reminders />
                                </ProtectedRoute>
                              } 
                            />
                            <Route 
                              path="/settings" 
                              element={
                                <ProtectedRoute>
                                  <AccountSettings />
                                </ProtectedRoute>
                              } 
                            />
                            <Route 
                              path="/offline" 
                              element={
                                <ProtectedRoute>
                                  <OfflinePage />
                                </ProtectedRoute>
                              } 
                            />
                            <Route 
                              path="/upgrade" 
                              element={
                                <ProtectedRoute>
                                  <Upgrade />
                                </ProtectedRoute>
                              } 
                            />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </main>
                      <AppFooter />
                    </div>
                    <Toaster />
                    <Sonner />
                  </AuthProvider>
                </BrowserRouter>
              </TooltipProvider>
            </QueryClientProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

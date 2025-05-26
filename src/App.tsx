
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import pages
import Index from "./pages/Index";
import EnhancedDashboard from "./pages/EnhancedDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SaveContent from "./pages/SaveContent";
import Collections from "./pages/Collections";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Help from "./pages/Help";

// Import error pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/help" element={<Help />} />
                    
                    {/* Protected routes - require authentication */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <EnhancedDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/save" element={
                      <ProtectedRoute>
                        <SaveContent />
                      </ProtectedRoute>
                    } />
                    <Route path="/collections" element={
                      <ProtectedRoute>
                        <Collections />
                      </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    <Route path="/search" element={
                      <ProtectedRoute>
                        <Search />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    {/* Marketing pages - redirect to home for now */}
                    <Route path="/features" element={<Navigate to="/#features" replace />} />
                    <Route path="/pricing" element={<Navigate to="/#pricing" replace />} />
                    <Route path="/about" element={<Navigate to="/#about" replace />} />
                    
                    {/* Redirect old routes */}
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    
                    {/* 404 fallback */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

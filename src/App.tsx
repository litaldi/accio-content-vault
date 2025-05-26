
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

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

const queryClient = new QueryClient();

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
                    
                    {/* Protected routes */}
                    <Route path="/dashboard" element={<EnhancedDashboard />} />
                    <Route path="/save" element={<SaveContent />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile" element={<Profile />} />
                    
                    {/* Marketing pages */}
                    <Route path="/features" element={<Index />} />
                    <Route path="/pricing" element={<Index />} />
                    <Route path="/about" element={<Index />} />
                    
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

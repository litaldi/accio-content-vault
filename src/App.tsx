
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ResponsiveNavigation from '@/components/navigation/ResponsiveNavigation';
import FooterNavigation from '@/components/navigation/FooterNavigation';
import SkipLink from '@/components/SkipLink';
import ProtectedRoute from '@/components/ProtectedRoute';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SavedContent from "./pages/SavedContent";
import Profile from "./pages/Profile";
import EnhancedSettings from "./pages/EnhancedSettings";
import Features from "./pages/Features";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Collections from "./pages/Collections";
import Analytics from "./pages/Analytics";
import Save from "./pages/Save";
import Upgrade from "./pages/Upgrade";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <SkipLink />
                <ResponsiveNavigation />
                
                <main className="flex-1" id="main-content" tabIndex={-1}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/saved" element={
                      <ProtectedRoute>
                        <SavedContent />
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
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <EnhancedSettings />
                      </ProtectedRoute>
                    } />
                    <Route path="/save" element={
                      <ProtectedRoute>
                        <Save />
                      </ProtectedRoute>
                    } />
                    <Route path="/upgrade" element={
                      <ProtectedRoute>
                        <Upgrade />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>

                <FooterNavigation />
                <Toaster />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;

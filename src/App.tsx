
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Cookies from '@/pages/Cookies';
import ResetPassword from '@/pages/ResetPassword';
import Accessibility from '@/pages/Accessibility';
import Settings from '@/pages/Settings';

// Auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// Protected pages
import Dashboard from '@/pages/Dashboard';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Profile from '@/pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Public routes */}
                  <Route index element={<Index />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="features" element={<Features />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="cookies" element={<Cookies />} />
                  <Route path="accessibility" element={<Accessibility />} />
                  
                  {/* Auth routes */}
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                  
                  {/* Protected routes */}
                  <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                </Route>
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

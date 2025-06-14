
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Save from './pages/Save';
import Features from './pages/Features';
import EnhancedHome from './pages/EnhancedHome';
import EnhancedDashboard from './pages/EnhancedDashboard';
import { EnhancedErrorBoundary } from '@/components/ui/enhanced-error-boundary';
import { AccessibilityAnnouncerProvider } from '@/components/accessibility/AccessibilityAnnouncer';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

function App() {
  return (
    <EnhancedErrorBoundary>
      <AccessibilityProvider>
        <AccessibilityAnnouncerProvider>
          <HelmetProvider>
            <QueryClientProvider client={new QueryClient()}>
              <AuthProvider>
                <BrowserRouter>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Toaster />
                    <Routes>
                      <Route path="/" element={<EnhancedHome />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/dashboard" element={<EnhancedDashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/save" element={<Save />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </BrowserRouter>
              </AuthProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </AccessibilityAnnouncerProvider>
      </AccessibilityProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;

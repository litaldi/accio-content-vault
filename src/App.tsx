
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Save from '@/pages/Save';
import Collections from '@/pages/Collections';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Pricing from '@/pages/Pricing';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import AccessibilityTest from '@/pages/AccessibilityTest';
import FAQ from '@/pages/FAQ';
import Help from '@/pages/Help';
import Blog from '@/pages/Blog';
import Sitemap from '@/pages/Sitemap';
import Reminders from '@/pages/Reminders';
import OfflinePage from '@/pages/OfflinePage';
import NotFound from '@/pages/NotFound';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import '@/styles/accessibility.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AccessibilityProvider>
              <AuthProvider>
                <Router>
                  <div className="min-h-screen bg-background text-foreground">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/save" element={<Save />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/accessibility" element={<AccessibilityTest />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/sitemap" element={<Sitemap />} />
                      <Route path="/reminders" element={<Reminders />} />
                      <Route path="/offline" element={<OfflinePage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                  </div>
                </Router>
              </AuthProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;

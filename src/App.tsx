
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { UnifiedThemeProvider } from '@/contexts/UnifiedThemeContext';
import { UnifiedMainNavigation } from '@/components/navigation/UnifiedMainNavigation';
import { SkipToContent } from '@/components/common/SkipToContent';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import Playground from '@/pages/Playground';
import Dashboard from '@/pages/Dashboard';
import Search from '@/pages/Search';
import Collections from '@/pages/Collections';
import Analytics from '@/pages/Analytics';
import Integrations from '@/pages/Integrations';
import AccountSettings from '@/pages/AccountSettings';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/NotFound';
import QueryProvider from '@/providers/QueryProvider';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <UnifiedThemeProvider defaultTheme="system" storageKey="accio-ui-theme">
        <QueryProvider>
          <AuthProvider>
            <Router>
              <div className="App min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
                <SkipToContent />
                <UnifiedMainNavigation />
                <ErrorBoundary>
                  <main id="main-content" className="flex-grow" tabIndex={-1}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/playground" element={<Playground />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/account" element={<AccountSettings />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </ErrorBoundary>
                <Footer />
                <Toaster />
              </div>
            </Router>
          </AuthProvider>
        </QueryProvider>
      </UnifiedThemeProvider>
    </HelmetProvider>
  );
};

export default App;

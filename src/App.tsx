
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GlobalFeatures } from '@/components/GlobalFeatures/GlobalFeatures';
import { AIContentAssistant } from '@/components/ai/AIContentAssistant';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Search from '@/pages/Search';
import Collections from '@/pages/Collections';
import Analytics from '@/pages/Analytics';
import Integrations from '@/pages/Integrations';
import AccountSettings from '@/pages/AccountSettings';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import QueryProvider from '@/providers/QueryProvider';
import ChatWidget from '@/components/contact/ChatWidget';
import Features from '@/pages/Features';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="accio-theme">
        <QueryProvider>
          <AuthProvider>
            <Router>
              <div className="App min-h-screen flex flex-col bg-background text-foreground">
                <MainNavigation />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/account" element={<AccountSettings />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster />
                <ChatWidget />
                <AIContentAssistant />
                <GlobalFeatures />
              </div>
            </Router>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;

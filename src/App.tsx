
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import Dashboard from '@/pages/Dashboard';
import SavedContent from '@/pages/SavedContent';
import Collections from '@/pages/Collections';
import Analytics from '@/pages/Analytics';
import Reminders from '@/pages/Reminders';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/saved-content" element={<SavedContent />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reminders" element={<Reminders />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import MegaMenuNavigation from '@/components/navigation/MegaMenuNavigation';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import Search from '@/pages/Search';
import SaveContent from '@/pages/SaveContent';
import Settings from '@/pages/Settings';
import { QuickCaptureWidget } from '@/components/QuickCapture/QuickCaptureWidget';
import { AIContentAssistant } from '@/components/ai/AIContentAssistant';
import AIFeatures from '@/pages/AIFeatures';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background font-sans antialiased">
              <MegaMenuNavigation />
              <main className="relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/ai-features" element={<AIFeatures />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/save" element={<SaveContent />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              <QuickCaptureWidget />
              <AIContentAssistant />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

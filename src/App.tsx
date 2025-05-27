
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { KeyboardShortcutsProvider } from '@/hooks/useKeyboardShortcuts';
import EnhancedMainNavigation from '@/components/navigation/EnhancedMainNavigation';
import EnhancedGlobalFooter from '@/components/layout/EnhancedGlobalFooter';
import { QuickActionBar } from '@/components/ui/quick-action-bar';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import SavedContent from '@/pages/SavedContent';
import Features from '@/pages/Features';
import Search from '@/pages/Search';
import SaveContent from '@/pages/SaveContent';
import Settings from '@/pages/Settings';
import Pricing from '@/pages/Pricing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { EnhancedQuickCaptureWidget } from '@/components/QuickCapture/EnhancedQuickCaptureWidget';
import { AIContentAssistant } from '@/components/ai/AIContentAssistant';
import AIFeatures from '@/pages/AIFeatures';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <KeyboardShortcutsProvider>
              <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
                <EnhancedMainNavigation />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/saved" element={<SavedContent />} />
                    <Route path="/collections" element={<SavedContent />} />
                    <Route path="/analytics" element={<Dashboard />} />
                    <Route path="/profile" element={<Settings />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/ai-features" element={<AIFeatures />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/save" element={<SaveContent />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <EnhancedGlobalFooter />
                <EnhancedQuickCaptureWidget />
                <AIContentAssistant />
                <QuickActionBar variant="floating" />
              </div>
            </KeyboardShortcutsProvider>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

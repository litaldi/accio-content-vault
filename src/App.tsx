
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { KeyboardShortcutsProvider } from '@/hooks/useKeyboardShortcuts';
import ResponsiveMainNavigation from '@/components/navigation/ResponsiveMainNavigation';
import EnhancedGlobalFooter from '@/components/layout/EnhancedGlobalFooter';
import { UnifiedFloatingActions } from '@/components/ui/unified-floating-actions';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import SavedContent from '@/pages/SavedContent';
import Features from '@/pages/Features';
import Search from '@/pages/Search';
import SaveContent from '@/pages/SaveContent';
import Settings from '@/pages/EnhancedSettings';
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
            <AccessibilityProvider>
              <KeyboardShortcutsProvider>
                <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
                  <ResponsiveMainNavigation />
                  <main className="flex-1 relative">
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
                  <UnifiedFloatingActions />
                </div>
              </KeyboardShortcutsProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

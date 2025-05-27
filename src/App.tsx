
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { KeyboardShortcutsProvider } from '@/hooks/useKeyboardShortcuts';
import StreamlinedMainNavigation from '@/components/navigation/StreamlinedMainNavigation';
import EnhancedGlobalFooter from '@/components/layout/EnhancedGlobalFooter';
import { UnifiedFloatingActions } from '@/components/ui/unified-floating-actions';
import EnhancedAccessibility from '@/components/accessibility/EnhancedAccessibility';
import AccessibilityAnnouncer from '@/components/accessibility/AccessibilityAnnouncer';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import SavedContent from '@/pages/SavedContent';
import Features from '@/pages/Features';
import Search from '@/pages/Search';
import SaveContent from '@/pages/SaveContent';
import Settings from '@/pages/EnhancedSettings';
import EnhancedPricing from '@/pages/EnhancedPricing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AIFeatures from '@/pages/AIFeatures';
import { EnhancedQuickCaptureWidget } from '@/components/QuickCapture/EnhancedQuickCaptureWidget';
import { AIContentAssistant } from '@/components/ai/AIContentAssistant';
import EnhancedAccessibilityHelper from '@/components/accessibility/EnhancedAccessibilityHelper';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <AuthProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <AccessibilityProvider>
                <KeyboardShortcutsProvider>
                  <AccessibilityAnnouncer>
                    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
                      <EnhancedAccessibility />
                      <StreamlinedMainNavigation />
                      <main className="flex-1 relative" role="main" id="main-content">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/features" element={<Features />} />
                          <Route path="/ai-features" element={<AIFeatures />} />
                          <Route path="/pricing" element={<EnhancedPricing />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/saved" element={<SavedContent />} />
                          <Route path="/save" element={<SaveContent />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/collections" element={<SavedContent />} />
                          <Route path="/analytics" element={<Dashboard />} />
                          <Route path="/profile" element={<Settings />} />
                        </Routes>
                      </main>
                      <EnhancedGlobalFooter />
                      <EnhancedQuickCaptureWidget />
                      <AIContentAssistant />
                      <UnifiedFloatingActions />
                      <EnhancedAccessibilityHelper />
                      <Toaster />
                    </div>
                  </AccessibilityAnnouncer>
                </KeyboardShortcutsProvider>
              </AccessibilityProvider>
            </ThemeProvider>
          </AuthProvider>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

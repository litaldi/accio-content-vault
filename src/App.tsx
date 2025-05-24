
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { QueryProvider } from '@/providers/QueryProvider';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Help from './pages/Help';
import AccessibilityStatement from './pages/AccessibilityStatement';
import Login from './pages/Login';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Settings from './pages/Settings';
import Register from './pages/Register';
import { AccessibleLayout } from './components/layout/AccessibleLayout';
import { EnhancedOnboardingFlow } from './components/onboarding/EnhancedOnboardingFlow';
import { useOnboardingContext } from '@/contexts/OnboardingContext';

function AppContent() {
  const { shouldShowOnboarding, completeOnboarding, skipOnboarding } = useOnboardingContext();

  if (shouldShowOnboarding) {
    return (
      <EnhancedOnboardingFlow 
        onComplete={completeOnboarding} 
        onSkip={skipOnboarding}
      />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AccessibleLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/help" element={<Help />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
          </Routes>
        </AccessibleLayout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <OnboardingProvider>
          <AppContent />
        </OnboardingProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;

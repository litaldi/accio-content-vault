
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import AccessibilityStatement from './pages/AccessibilityStatement';
import Login from './pages/Login';
import { AccessibleLayout } from './components/layout/AccessibleLayout';
import { EnhancedOnboardingFlow } from './components/onboarding/EnhancedOnboardingFlow';

function App() {
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  
  // This would normally check if the user has completed onboarding
  React.useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed') === 'true';
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);
  
  const handleCompleteOnboarding = (preferences?: any) => {
    localStorage.setItem('onboarding-completed', 'true');
    if (preferences) {
      localStorage.setItem('user-preferences', JSON.stringify(preferences));
    }
    setShowOnboarding(false);
  };
  
  const handleSkipOnboarding = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <AuthProvider>
        <EnhancedOnboardingFlow 
          onComplete={handleCompleteOnboarding} 
          onSkip={handleSkipOnboarding}
        />
      </AuthProvider>
    );
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AccessibleLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accessibility" element={<AccessibilityStatement />} />
            </Routes>
          </AccessibleLayout>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

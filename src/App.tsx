
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { setupGlobalErrorHandlers } from './utils/errorHandling';

// Modern pages
import ModernHomePage from './pages/ModernHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { SecurityAuditDashboard } from './components/security/SecurityAuditDashboard';

// Security monitoring
import { useSecurityMonitoring } from './hooks/useSecurityMonitoring';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Security wrapper component
const SecurityWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSecurityMonitoring();
  return <>{children}</>;
};

function App() {
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <SecurityWrapper>
              <Router>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
                  {/* Skip to content link */}
                  <a 
                    href="#main-content" 
                    className="skip-link"
                    tabIndex={0}
                  >
                    Skip to main content
                  </a>
                  
                  <Routes>
                    <Route path="/" element={<ModernHomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/security-audit" element={<SecurityAuditDashboard />} />
                  </Routes>
                  
                  <Toaster />
                </div>
              </Router>
            </SecurityWrapper>
          </AuthProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlobalErrorBoundary } from '@/components/error-handling/GlobalErrorBoundary';
import { useAppSecurity } from '@/hooks/useAppSecurity';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// App component with security hook inside Router context
const AppContent: React.FC = () => {
  useAppSecurity();

  return (
    <AppLayout>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </AppLayout>
  );
};

function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AccessibilityProvider>
              <Router>
                <AppContent />
                <Toaster />
              </Router>
            </AccessibilityProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

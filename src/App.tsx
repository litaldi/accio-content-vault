
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import EnhancedAccessibility from '@/components/accessibility/EnhancedAccessibility';
import ResponsiveAccessibilityButton from '@/components/accessibility/ResponsiveAccessibilityButton';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Blog from '@/pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import AccessibilityStatement from '@/pages/AccessibilityStatement';
import Sitemap from '@/pages/Sitemap';
import NotFound from '@/pages/NotFound';
import Upgrade from '@/pages/Upgrade';
import Reminders from '@/pages/Reminders';
import OfflinePage from '@/pages/OfflinePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AccessibilityProvider>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>
                <AuthProvider>
                  <Router>
                    <EnhancedAccessibility />
                    <ResponsiveAccessibilityButton />
                    <div className="min-h-screen flex flex-col w-full">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/accessibility" element={<AccessibilityStatement />} />
                        <Route path="/sitemap" element={<Sitemap />} />
                        <Route path="/upgrade" element={<Upgrade />} />
                        <Route path="/reminders" element={<Reminders />} />
                        <Route path="/offline" element={<OfflinePage />} />
                        
                        {/* Dashboard sub-routes - all redirect to main dashboard */}
                        <Route path="/save" element={<Dashboard />} />
                        <Route path="/save-content" element={<Dashboard />} />
                        <Route path="/collections" element={<Dashboard />} />
                        <Route path="/analytics" element={<Dashboard />} />
                        <Route path="/search" element={<Dashboard />} />
                        <Route path="/settings" element={<Dashboard />} />
                        
                        {/* Catch all route */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                    <Toaster />
                  </Router>
                </AuthProvider>
              </TooltipProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

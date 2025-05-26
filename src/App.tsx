
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import ModernIndex from '@/pages/ModernIndex';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Collections from '@/pages/Collections';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Features from '@/pages/Features';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import Help from '@/pages/Help';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Router>
                <Helmet>
                  <html lang="en" />
                  <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta name="description" content="Accio - Your AI-powered knowledge engine for organizing and accessing information instantly." />
                  <meta name="keywords" content="knowledge management, AI organization, digital library, search, productivity" />
                  <meta name="author" content="Accio" />
                  
                  {/* Open Graph Tags */}
                  <meta property="og:title" content="Accio - AI-Powered Knowledge Engine" />
                  <meta property="og:description" content="Transform how you save, organize, and access information with AI-powered intelligence." />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content={window.location.href} />
                  
                  {/* Twitter Card Tags */}
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:title" content="Accio - AI-Powered Knowledge Engine" />
                  <meta name="twitter:description" content="Transform how you save, organize, and access information with AI-powered intelligence." />
                  
                  {/* Security Headers */}
                  <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
                  <meta httpEquiv="X-Frame-Options" content="DENY" />
                  <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
                  <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
                </Helmet>
                
                <Routes>
                  <Route path="/" element={<ModernIndex />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                <Toaster />
              </Router>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

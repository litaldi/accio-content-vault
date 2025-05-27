
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import SecureErrorBoundary from '@/components/error/SecureErrorBoundary';
import MainNavigation from '@/components/navigation/MainNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import FooterNavigation from '@/components/navigation/FooterNavigation';
import Search from '@/pages/Search';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Features from '@/pages/Features';
import AIFeatures from '@/pages/AIFeatures';
import Pricing from '@/pages/Pricing';
import Help from '@/pages/Help';
import Contact from '@/pages/Contact';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Dashboard from '@/pages/Dashboard';
import SaveContent from '@/pages/SaveContent';
import SavedContent from '@/pages/SavedContent';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Collections from '@/pages/Collections';
import Tutorials from '@/pages/Tutorials';
import Activity from '@/pages/Activity';
import Accessibility from '@/pages/Accessibility';

// Security and validation imports
import { getSecurityHeaders, logSecurityEvent } from '@/utils/security-validation-enhanced';
import { runFullPageValidation } from '@/utils/page-validation';

function App() {
  const location = useLocation();

  // Scroll to top on route change for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Security headers and validation setup
  useEffect(() => {
    // Log page navigation for security monitoring
    logSecurityEvent('PAGE_NAVIGATION', { 
      path: location.pathname,
      timestamp: new Date().toISOString()
    });

    // Set security headers (where possible in client-side)
    const headers = getSecurityHeaders();
    
    // Add meta tags for security
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!existingCSP) {
      const cspMeta = document.createElement('meta');
      cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
      cspMeta.setAttribute('content', headers['Content-Security-Policy']);
      document.head.appendChild(cspMeta);
    }

    // Run validation in development
    if (process.env.NODE_ENV === 'development') {
      // Delay validation to allow page to fully load
      const timer = setTimeout(() => {
        runFullPageValidation().catch(error => {
          console.warn('Page validation failed:', error);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Define route groups for better organization
  const publicRoutes = ['/', '/features', '/ai-features', '/pricing', '/help', '/contact', '/blog', '/about', '/privacy', '/terms', '/tutorials', '/accessibility'];
  const authRoutes = ['/login', '/register'];
  const protectedRoutes = ['/dashboard', '/profile', '/saved', '/save', '/collections', '/activity', '/settings', '/search'];

  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isAuthRoute = authRoutes.includes(location.pathname);
  const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

  // Show main navigation on public routes
  const shouldShowMainNav = isPublicRoute;
  
  // Show marketing footer on public routes (not auth or protected routes)
  const shouldShowMarketingFooter = isPublicRoute;
  
  // Show mobile footer navigation (handles its own visibility logic)
  const shouldShowMobileNav = true;

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <SecureErrorBoundary>
            <Helmet titleTemplate="%s | Accio" defaultTitle="Accio - AI-Powered Knowledge Management">
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="X-Content-Type-Options" content="nosniff" />
              <meta name="X-Frame-Options" content="DENY" />
              <meta name="X-XSS-Protection" content="1; mode=block" />
              <meta name="Referrer-Policy" content="strict-origin-when-cross-origin" />
            </Helmet>
            
            {/* Skip link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium z-50 transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                  mainContent.focus();
                  mainContent.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Skip to main content
            </a>
            
            <div className="flex flex-col min-h-screen">
              {shouldShowMainNav && <MainNavigation />}
              
              <main 
                className="flex-1" 
                role="main" 
                id="main-content" 
                tabIndex={-1}
                aria-label="Main content"
              >
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/ai-features" element={<AIFeatures />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  
                  {/* Authentication routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected routes with internal navigation */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/saved" element={
                    <ProtectedRoute>
                      <SavedContent />
                    </ProtectedRoute>
                  } />
                  <Route path="/save" element={
                    <ProtectedRoute>
                      <SaveContent />
                    </ProtectedRoute>
                  } />
                  <Route path="/search" element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  } />
                  <Route path="/collections" element={
                    <ProtectedRoute>
                      <Collections />
                    </ProtectedRoute>
                  } />
                  <Route path="/activity" element={
                    <ProtectedRoute>
                      <Activity />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route - must be last */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              
              {/* Footer sections */}
              {shouldShowMarketingFooter && <MarketingFooter />}
              {shouldShowMobileNav && <FooterNavigation />}
              
              {/* Add bottom padding for mobile nav when needed */}
              {isProtectedRoute && <div className="md:hidden h-20" aria-hidden="true" />}
            </div>
            
            <Toaster />
          </SecureErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

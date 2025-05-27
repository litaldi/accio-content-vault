import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import MainNavigation from '@/components/navigation/MainNavigation';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import FooterNavigation from '@/components/navigation/FooterNavigation';

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
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Collections from '@/pages/Collections';
import Tutorials from '@/pages/Tutorials';
import Activity from '@/pages/Activity';
import Accessibility from '@/pages/Accessibility';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine if we should show the footer based on the route
  const shouldShowFooter = !location.pathname.includes('/dashboard');
  const shouldShowMobileNav = !location.pathname.includes('/login') && 
                             !location.pathname.includes('/register');

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Helmet titleTemplate="%s | Accio" defaultTitle="Accio - AI-Powered Knowledge Management" />
          
          <div className="flex flex-col min-h-screen">
            <MainNavigation />
            
            <main className="flex-1">
              <Routes>
                {/* Existing routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/features" element={<Features />} />
                <Route path="/ai-features" element={<AIFeatures />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* New mega menu routes */}
                <Route path="/collections" element={<Collections />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/accessibility" element={<Accessibility />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/saved" element={
                  <ProtectedRoute>
                    <SaveContent />
                  </ProtectedRoute>
                } />
                <Route path="/save" element={
                  <ProtectedRoute>
                    <SaveContent />
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
                
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {shouldShowFooter && <MarketingFooter />}
            {shouldShowMobileNav && <FooterNavigation />}
          </div>
          
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

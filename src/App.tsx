
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

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine if we should show the footer based on the route
  const shouldShowFooter = !location.pathname.includes('/dashboard') && 
                          !location.pathname.includes('/profile') &&
                          !location.pathname.includes('/saved') &&
                          !location.pathname.includes('/save') &&
                          !location.pathname.includes('/collections') &&
                          !location.pathname.includes('/activity') &&
                          !location.pathname.includes('/settings') &&
                          !location.pathname.includes('/search');
  
  const shouldShowMobileNav = !location.pathname.includes('/login') && 
                             !location.pathname.includes('/register');

  const isAuthenticatedRoute = location.pathname.includes('/dashboard') ||
                              location.pathname.includes('/profile') ||
                              location.pathname.includes('/saved') ||
                              location.pathname.includes('/save') ||
                              location.pathname.includes('/collections') ||
                              location.pathname.includes('/activity') ||
                              location.pathname.includes('/settings') ||
                              location.pathname.includes('/search');

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Helmet titleTemplate="%s | Accio" defaultTitle="Accio - AI-Powered Knowledge Management" />
          
          <div className="flex flex-col min-h-screen">
            {!isAuthenticatedRoute && <MainNavigation />}
            
            <main className="flex-1">
              <Routes>
                {/* Public routes */}
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
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/accessibility" element={<Accessibility />} />
                
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

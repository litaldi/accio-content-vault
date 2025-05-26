
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { RadixProviders } from '@/components/providers/RadixProviders';
import { Toaster } from '@/components/ui/toaster';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorBoundary from '@/components/error/ErrorBoundary';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));
const Register = React.lazy(() => import('@/pages/Register'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const Help = React.lazy(() => import('@/pages/Help'));
const Features = React.lazy(() => import('@/pages/Features'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Collections = React.lazy(() => import('@/pages/Collections'));
const Analytics = React.lazy(() => import('@/pages/Analytics'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const SaveContent = React.lazy(() => import('@/pages/SaveContent'));
const Search = React.lazy(() => import('@/pages/Search'));
const Terms = React.lazy(() => import('@/pages/Terms'));
const Privacy = React.lazy(() => import('@/pages/Privacy'));
const RadixDemo = React.lazy(() => import('@/pages/RadixDemo'));
const Pricing = React.lazy(() => import('@/pages/Pricing'));
const FAQ = React.lazy(() => import('@/pages/FAQ'));
const Sitemap = React.lazy(() => import('@/pages/Sitemap'));
const AccessibilityStatement = React.lazy(() => import('@/pages/AccessibilityStatement'));
const AccessibilityTest = React.lazy(() => import('@/pages/AccessibilityTest'));
const BlogPost = React.lazy(() => import('@/pages/BlogPost'));
const ImprovedSearch = React.lazy(() => import('@/pages/ImprovedSearch'));
const OfflinePage = React.lazy(() => import('@/pages/OfflinePage'));
const Reminders = React.lazy(() => import('@/pages/Reminders'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

// Import styles
import '@/styles/globals.css';
import '@/styles/components.css';
import '@/styles/utilities.css';
import '@/styles/accessibility.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <RadixProviders>
              <Router>
                <ErrorBoundary>
                  <div className="min-h-screen bg-background text-foreground">
                    {/* Skip to main content link for accessibility */}
                    <a href="#main-content" className="skip-link">
                      Skip to main content
                    </a>
                    
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/save-content" element={<SaveContent />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/improved-search" element={<ImprovedSearch />} />
                        <Route path="/reminders" element={<Reminders />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/sitemap" element={<Sitemap />} />
                        <Route path="/accessibility" element={<AccessibilityStatement />} />
                        <Route path="/accessibility-test" element={<AccessibilityTest />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/radix-demo" element={<RadixDemo />} />
                        <Route path="/offline" element={<OfflinePage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                    
                    <Toaster />
                  </div>
                </ErrorBoundary>
              </Router>
            </RadixProviders>
          </AuthProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

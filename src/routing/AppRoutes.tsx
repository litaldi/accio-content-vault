
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Status } from '@/components/design-system/DesignSystem';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Helmet } from 'react-helmet-async';

// === LAZY LOADED COMPONENTS ===
// Public Pages
const EnhancedHome = React.lazy(() => import('@/pages/EnhancedHome'));
const Login = React.lazy(() => import('@/pages/Login'));
const Register = React.lazy(() => import('@/pages/Register'));
const Help = React.lazy(() => import('@/pages/Help'));
const Features = React.lazy(() => import('@/pages/Features'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const About = React.lazy(() => import('@/pages/About'));
const Pricing = React.lazy(() => import('@/pages/Pricing'));

// Protected Pages
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Settings = React.lazy(() => import('@/pages/Settings'));

// === ERROR BOUNDARY FOR ROUTE-LEVEL ERRORS ===
const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Status.Loading message="Loading page..." />}>
      {children}
    </Suspense>
  );
};

/**
 * AppRoutes - Main routing configuration
 * 
 * Route Groups:
 * 1. Public Routes - Accessible to all users
 * 2. Authentication Routes - Login/Register flows  
 * 3. Protected Routes - Require authentication
 * 4. 404 Handler - Catch-all for unknown routes
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* === PUBLIC ROUTES === */}
      <Route 
        path="/" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Accio - AI-Powered Knowledge Engine</title>
              <meta name="description" content="Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform." />
            </Helmet>
            <EnhancedHome />
          </RouteErrorBoundary>
        } 
      />
      
      <Route 
        path="/features" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Features - Accio</title>
              <meta name="description" content="Discover Accio's powerful AI-driven features for knowledge management and organization." />
            </Helmet>
            <Features />
          </RouteErrorBoundary>
        } 
      />
      
      <Route 
        path="/pricing" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Pricing - Accio</title>
              <meta name="description" content="Choose the perfect Accio plan for your knowledge management needs." />
            </Helmet>
            <Pricing />
          </RouteErrorBoundary>
        } 
      />
      
      <Route 
        path="/about" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>About - Accio</title>
              <meta name="description" content="Learn about Accio's mission to revolutionize knowledge management with AI." />
            </Helmet>
            <About />
          </RouteErrorBoundary>
        } 
      />
      
      <Route 
        path="/contact" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Contact - Accio</title>
              <meta name="description" content="Get in touch with the Accio team for support or partnership opportunities." />
            </Helmet>
            <Contact />
          </RouteErrorBoundary>
        } 
      />
      
      <Route 
        path="/help" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Help & Support - Accio</title>
              <meta name="description" content="Find help, tutorials, and support for using Accio effectively." />
            </Helmet>
            <Help />
          </RouteErrorBoundary>
        } 
      />

      {/* === AUTHENTICATION ROUTES === */}
      <Route 
        path="/login" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Sign In - Accio</title>
              <meta name="description" content="Sign in to your Accio account to access your knowledge base." />
            </Helmet>
            <Login />
          </RouteErrorBoundary>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <RouteErrorBoundary>
            <Helmet>
              <title>Sign Up - Accio</title>
              <meta name="description" content="Create your Accio account and start building your knowledge empire." />
            </Helmet>
            <Register />
          </RouteErrorBoundary>
        } 
      />

      {/* === PROTECTED ROUTES === */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <RouteErrorBoundary>
              <Helmet>
                <title>Dashboard - Accio</title>
                <meta name="description" content="Your personal knowledge dashboard - overview of your saved content and insights." />
              </Helmet>
              <Dashboard />
            </RouteErrorBoundary>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <RouteErrorBoundary>
              <Helmet>
                <title>Profile - Accio</title>
                <meta name="description" content="Manage your Accio profile and account settings." />
              </Helmet>
              <Profile />
            </RouteErrorBoundary>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <RouteErrorBoundary>
              <Helmet>
                <title>Settings - Accio</title>
                <meta name="description" content="Configure your Accio preferences and account settings." />
              </Helmet>
              <Settings />
            </RouteErrorBoundary>
          </ProtectedRoute>
        } 
      />

      {/* === 404 CATCH-ALL ROUTE === */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex items-center justify-center">
            <Status.Error 
              title="Page Not Found"
              description="The page you're looking for doesn't exist or has been moved."
              retry={() => window.history.back()}
            />
          </div>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;

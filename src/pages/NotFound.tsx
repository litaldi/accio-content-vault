
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <UnifiedLayout>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Accio to continue organizing your knowledge." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="text-center space-y-8 max-w-md mx-auto px-4">
          {/* 404 Illustration */}
          <div className="space-y-4">
            <div className="text-8xl font-bold text-muted-foreground/20">
              404
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Page Not Found
              </h1>
              <p className="text-lg text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Search className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </div>
            
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <Link 
                to="/login" 
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Sign In
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/register" 
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Sign Up
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/contact" 
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default NotFound;

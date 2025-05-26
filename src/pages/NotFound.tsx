
import React from 'react';
import { Link } from 'react-router-dom';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { EnhancedTypography, EnhancedLayout } from '@/components/ui/enhanced-design-system';
import { Home, ArrowLeft, Search, RefreshCw } from 'lucide-react';

const NotFound = () => {
  return (
    <UnifiedPageLayout
      title="Page Not Found - Accio"
      description="The page you're looking for doesn't exist."
      showNavigation={true}
      showFooter={true}
    >
      <EnhancedLayout.Section>
        <EnhancedLayout.Container className="text-center">
          <div className="max-w-2xl mx-auto">
            {/* Large 404 Visual */}
            <div className="mb-8">
              <div className="text-8xl sm:text-9xl font-bold text-primary/20 mb-4">404</div>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
            </div>
            
            <EnhancedTypography.H2 className="mb-4">
              Oops! Page not found
            </EnhancedTypography.H2>
            
            <EnhancedTypography.Body className="text-lg mb-8">
              The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </EnhancedTypography.Body>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="group" asChild>
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="group" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
              
              <Button variant="ghost" size="lg" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-5 w-5" />
                Refresh
              </Button>
            </div>
            
            {/* Helpful Links */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Popular pages:</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link 
                  to="/features" 
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Features
                </Link>
                <Link 
                  to="/help" 
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Help Center
                </Link>
                <Link 
                  to="/contact" 
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/login" 
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </EnhancedLayout.Container>
      </EnhancedLayout.Section>
    </UnifiedPageLayout>
  );
};

export default NotFound;

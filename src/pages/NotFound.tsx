
import React from 'react';
import { Link } from 'react-router-dom';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <UnifiedPageLayout
      title="Page Not Found - Accio"
      description="The page you're looking for could not be found."
    >
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Error Illustration */}
          <div className="relative">
            <div className="text-9xl font-bold text-primary/20 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-16 w-16 text-primary/40" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Page not found</h1>
            <p className="text-muted-foreground leading-relaxed">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <Card className="border-0 bg-muted/30">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold">What would you like to do?</h2>
              
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go to Homepage
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/help">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Help
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Links */}
          <div className="text-sm text-muted-foreground">
            <p className="mb-3">Or try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/features" className="hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/help" className="hover:text-primary transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UnifiedPageLayout>
  );
};

export default NotFound;

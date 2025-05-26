
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <UnifiedLayout>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Accio's homepage to continue organizing your knowledge." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
        <div className="text-center space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="text-8xl font-bold text-muted-foreground/20">
              404
            </div>
            
            <UnifiedTypography.H1 className="text-3xl">
              Page Not Found
            </UnifiedTypography.H1>
            
            <UnifiedTypography.Body className="text-lg">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </UnifiedTypography.Body>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="group">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/sitemap" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Browse Sitemap
              </Link>
            </Button>
          </div>

          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default NotFound;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to your knowledge library." />
      </Helmet>

      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-4">
          {/* Error Illustration */}
          <div className="relative">
            <div className="text-8xl font-bold text-muted-foreground/20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to organizing your knowledge.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/')} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground mb-4">Quick links:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-primary hover:underline"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/save')}
                className="text-primary hover:underline"
              >
                Save Content
              </button>
              <button 
                onClick={() => navigate('/help')}
                className="text-primary hover:underline"
              >
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default NotFound;

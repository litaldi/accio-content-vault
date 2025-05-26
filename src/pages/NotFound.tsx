
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="max-w-md w-full text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered an incorrect URL.
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">
                  <Search className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
              
              <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center space-y-8">
          {/* Error Code */}
          <div className="space-y-4">
            <h1 className="text-9xl font-bold text-primary/20">404</h1>
            <h2 className="text-3xl font-bold">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          {/* Suggestions Card */}
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                What you can do:
              </CardTitle>
              <CardDescription>
                Here are some helpful options to get you back on track
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go to Homepage
                  </Link>
                </Button>
                
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/features">
                    <Search className="h-4 w-4 mr-2" />
                    Explore Features
                  </Link>
                </Button>
                
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/help">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Help
                  </Link>
                </Button>
                
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/contact">
                    <Search className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.history.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Take Me Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Accio's homepage or explore our features." />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl font-bold text-primary/20 mb-8">404</div>
          
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Page Not Found</CardTitle>
              <CardDescription className="text-lg">
                The page you're looking for doesn't exist or has been moved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Don't worry! Here are some helpful links to get you back on track:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild variant="default" size="lg">
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/features">
                    <Search className="h-4 w-4 mr-2" />
                    Explore Features
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/faq">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Help
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default NotFound;

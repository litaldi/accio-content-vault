
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Accio's homepage or explore our features." />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Visual */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
              Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" />
                Search Site
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Popular Pages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Link 
                  to="/features" 
                  className="text-left p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Features</div>
                  <div className="text-muted-foreground">Explore what Accio can do</div>
                </Link>
                <Link 
                  to="/playground" 
                  className="text-left p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Playground</div>
                  <div className="text-muted-foreground">Try our interactive demo</div>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-left p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Dashboard</div>
                  <div className="text-muted-foreground">Access your workspace</div>
                </Link>
                <Link 
                  to="/contact" 
                  className="text-left p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium">Contact</div>
                  <div className="text-muted-foreground">Get help and support</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NotFound;

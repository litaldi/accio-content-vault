
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Accio's homepage or explore our features." />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/features">
                <Search className="h-4 w-4 mr-2" />
                Explore Features
              </Link>
            </Button>
          </div>

          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link to="/features" className="text-primary hover:underline">Features</Link>
              <Link to="/pricing" className="text-primary hover:underline">Pricing</Link>
              <Link to="/how-it-works" className="text-primary hover:underline">How It Works</Link>
              <Link to="/contact" className="text-primary hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Page Not Found - Accio Knowledge Engine</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to your knowledge collection." />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 text-center">
          {/* 404 Illustration */}
          <div className="space-y-4">
            <div className="mx-auto w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
              <p className="mt-2 text-muted-foreground">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>
          </div>

          {/* Action Card */}
          <Card>
            <CardHeader>
              <CardTitle>What would you like to do?</CardTitle>
              <CardDescription>
                Here are some suggestions to get you back on track
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to homepage
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard">
                  <Search className="h-4 w-4 mr-2" />
                  View dashboard
                </Link>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go back
              </Button>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              If you think this is an error, please{' '}
              <Button variant="link" className="p-0 h-auto text-sm">
                contact support
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

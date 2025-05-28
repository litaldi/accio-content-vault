
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const suggestions = [
    {
      icon: Home,
      title: 'Go Home',
      description: 'Return to our homepage',
      link: '/',
      label: 'Take me home'
    },
    {
      icon: Search,
      title: 'Explore Features',
      description: 'Learn about our AI-powered tools',
      link: '/features',
      label: 'View features'
    },
    {
      icon: HelpCircle,
      title: 'Get Help',
      description: 'Find answers in our FAQ',
      link: '/faq',
      label: 'Browse FAQ'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Page Not Found - Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let us help you find what you need." />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* 404 Illustration */}
          <div className="mb-12">
            <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Search className="h-16 w-16 text-primary/60" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Let's get you back on track.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Go Back Home
              </Link>
            </Button>
          </div>

          {/* Helpful Suggestions */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <suggestion.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                  <CardDescription>{suggestion.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to={suggestion.link}>{suggestion.label}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-16 pt-8 border-t">
            <p className="text-muted-foreground mb-4">
              Still can't find what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faq">Check FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;

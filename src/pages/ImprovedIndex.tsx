
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BookmarkPlus, 
  Search, 
  Tags, 
  BarChart3, 
  Zap, 
  Shield, 
  Smartphone,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';

const ImprovedIndex = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookmarkPlus,
      title: 'Smart Content Saving',
      description: 'Save articles, PDFs, videos, and more with automatic tagging and summarization.',
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description: 'Find your content instantly with AI-powered search across all your saved items.',
    },
    {
      icon: Tags,
      title: 'Intelligent Organization',
      description: 'Auto-categorize content with smart tags and create custom collections.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your learning progress and discover insights about your knowledge base.',
    },
  ];

  const benefits = [
    { icon: Zap, text: 'Lightning-fast search' },
    { icon: Shield, text: 'Secure & private' },
    { icon: Smartphone, text: 'Works everywhere' },
    { icon: Users, text: 'Team collaboration' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accio - Your Personal Knowledge Library</title>
        <meta name="description" content="Save, organize, and discover your digital content with Accio's intelligent knowledge management system." />
        <meta property="og:title" content="Accio - Your Personal Knowledge Library" />
        <meta property="og:description" content="Save, organize, and discover your digital content with Accio's intelligent knowledge management system." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-xl font-bold">Accio</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">
                  Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Star className="mr-1 h-3 w-3" />
            Intelligent Knowledge Management
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Your Personal Knowledge Library
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Save, organize, and discover your digital content with AI-powered tools. 
            Transform information overload into organized knowledge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/register">
                    Start Free Today
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build and maintain your personal knowledge base
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Accio?</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg border">
                <benefit.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed how they manage their digital knowledge.
          </p>
          
          {!user && (
            <Button size="lg" asChild>
              <Link to="/register">
                Create Your Account
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="font-bold">Accio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your intelligent knowledge management companion.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/save" className="hover:text-foreground">Save Content</Link></li>
                <li><Link to="/search" className="hover:text-foreground">Search</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Accio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImprovedIndex;

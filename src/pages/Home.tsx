
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Search, Shield, Zap, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Knowledge',
      description: 'Intelligent content organization and discovery with advanced AI capabilities.'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find anything instantly with natural language search and semantic understanding.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, access controls, and compliance.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for instant access to your knowledge base.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share knowledge seamlessly with your team and maintain version control.'
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Thoughtfully designed interface with accessibility and user experience focus.'
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management Platform</title>
        <meta name="description" content="Transform how you manage and discover knowledge with AI-powered search, intelligent organization, and seamless collaboration." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Accio</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/register')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Remember Everything You Discover Online
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform how you manage and discover knowledge with AI-powered search, 
              intelligent organization, and seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="gap-2">
                <Zap className="h-5 w-5" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/search')}>
                <Search className="h-5 w-5 mr-2" />
                Explore Features
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of users who have transformed their knowledge management workflow.
                </p>
                <Button size="lg" onClick={handleGetStarted}>
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 mt-16 border-t">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Accio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

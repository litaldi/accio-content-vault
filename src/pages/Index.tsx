
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { UnifiedTypography } from '@/components/ui/unified-design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  BookOpen,
  Star,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with intelligent AI assistance"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and stored securely with enterprise-grade protection"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Access your content instantly with our optimized search and retrieval system"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share collections and collaborate seamlessly with your team members"
    }
  ];

  const benefits = [
    "Save time with AI-powered organization",
    "Never lose important content again",
    "Access everything from any device",
    "Collaborate with your team effortlessly"
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Accio - Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform how you save, organize, and access digital content with Accio's intelligent AI-powered knowledge engine. Never lose important information again." />
        <meta name="keywords" content="knowledge management, AI organization, content saving, digital workspace" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="py-12 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8" aria-labelledby="hero-heading">
          <div className="space-y-6">
            <Badge variant="secondary" className="mx-auto">
              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
              AI-Powered Knowledge Engine
            </Badge>
            
            <UnifiedTypography.H1 id="hero-heading">
              Your Digital Knowledge,
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block mt-2">
                Perfectly Organized
              </span>
            </UnifiedTypography.H1>
            
            <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto">
              Transform how you save, organize, and access digital content. 
              Accio uses intelligent AI to help you never lose important information again.
            </UnifiedTypography.Body>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button asChild size="xl" className="group">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="xl" className="group">
                  <Link to="/register" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start Free Today
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="xl">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-12" aria-labelledby="features-heading">
          <div className="text-center space-y-4">
            <UnifiedTypography.H2 id="features-heading">
              Powerful Features for Modern Knowledge Work
            </UnifiedTypography.H2>
            <UnifiedTypography.Body>
              Everything you need to organize, access, and share your digital knowledge
            </UnifiedTypography.Body>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/20 rounded-3xl p-8 lg:p-12" aria-labelledby="benefits-heading">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <UnifiedTypography.H2 id="benefits-heading">
                Why Choose Accio?
              </UnifiedTypography.H2>
              <UnifiedTypography.Body>
                Join thousands of professionals who have transformed their digital workspace with Accio's intelligent organization system.
              </UnifiedTypography.Body>
              
              <ul className="space-y-4" role="list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              {!user && (
                <Button asChild className="group">
                  <Link to="/register" className="flex items-center gap-2">
                    Get Started Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary/60" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="text-center space-y-8 py-12" aria-labelledby="cta-heading">
            <div className="space-y-4">
              <UnifiedTypography.H2 id="cta-heading">
                Ready to Transform Your Digital Workspace?
              </UnifiedTypography.H2>
              <UnifiedTypography.Body>
                Start organizing your knowledge with AI today. No credit card required.
              </UnifiedTypography.Body>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gradient" className="group">
                <Link to="/register" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="xl">
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </UnifiedLayout>
  );
};

export default Index;

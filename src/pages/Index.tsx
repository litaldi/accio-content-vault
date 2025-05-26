
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
  CheckCircle,
  Search,
  Brain,
  Globe,
  Clock
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
      icon: Search,
      title: "Smart Search",
      description: "Find anything instantly with our advanced semantic search capabilities"
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
      icon: Brain,
      title: "Smart Insights",
      description: "Get intelligent recommendations and discover connections in your knowledge"
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Access your knowledge library from anywhere, on any device"
    }
  ];

  const benefits = [
    "Save time with AI-powered organization",
    "Never lose important content again",
    "Access everything from any device",
    "Collaborate with your team effortlessly",
    "Get smart recommendations",
    "Secure enterprise-grade protection"
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "1M+", label: "Items Saved" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <UnifiedLayout>
      <Helmet>
        <title>Accio - Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform how you save, organize, and access digital content with Accio's intelligent AI-powered knowledge engine. Never lose important information again." />
        <meta name="keywords" content="knowledge management, AI organization, content saving, digital workspace" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-8" aria-labelledby="hero-heading">
          <div className="space-y-6">
            <Badge variant="secondary" className="mx-auto px-4 py-2">
              <Star className="h-3 w-3 mr-2" aria-hidden="true" />
              AI-Powered Knowledge Engine
            </Badge>
            
            <UnifiedTypography.H1 id="hero-heading" className="max-w-4xl mx-auto">
              Your Digital Knowledge,
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Perfectly Organized
              </span>
            </UnifiedTypography.H1>
            
            <UnifiedTypography.Body size="lg" className="max-w-3xl mx-auto">
              Transform how you save, organize, and access digital content. 
              Accio uses intelligent AI to help you never lose important information again,
              making your digital workspace more productive than ever.
            </UnifiedTypography.Body>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button asChild size="lg" className="group px-8 py-3">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="group px-8 py-3">
                  <Link to="/register" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Start Free Today
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="px-8 py-3">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Features Section */}
        <section className="space-y-16" aria-labelledby="features-heading">
          <div className="text-center space-y-4">
            <UnifiedTypography.H2 id="features-heading">
              Powerful Features for Modern Knowledge Work
            </UnifiedTypography.H2>
            <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto">
              Everything you need to organize, access, and share your digital knowledge
            </UnifiedTypography.Body>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl p-8 lg:p-16" aria-labelledby="benefits-heading">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  Why Choose Accio?
                </Badge>
                <UnifiedTypography.H2 id="benefits-heading">
                  Transform Your Digital Workspace
                </UnifiedTypography.H2>
                <UnifiedTypography.Body size="lg">
                  Join thousands of professionals who have revolutionized their knowledge management 
                  with Accio's intelligent organization system.
                </UnifiedTypography.Body>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              {!user && (
                <Button asChild className="group w-fit">
                  <Link to="/register" className="flex items-center gap-2">
                    Get Started Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <BookOpen className="h-24 w-24 text-primary/60" aria-hidden="true" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="text-center space-y-8 py-16" aria-labelledby="cta-heading">
            <div className="space-y-4">
              <UnifiedTypography.H2 id="cta-heading">
                Ready to Transform Your Digital Workspace?
              </UnifiedTypography.H2>
              <UnifiedTypography.Body size="lg" className="max-w-2xl mx-auto">
                Start organizing your knowledge with AI today. Join thousands of professionals 
                who trust Accio with their digital content.
              </UnifiedTypography.Body>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group px-8 py-4">
                <Link to="/register" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="px-8 py-4">
                <Link to="/features">Learn More</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </section>
        )}
      </div>
    </UnifiedLayout>
  );
};

export default Index;

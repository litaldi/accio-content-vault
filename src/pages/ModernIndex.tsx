
import React from 'react';
import { Helmet } from 'react-helmet-async';
import UnifiedPageLayout from '@/components/layout/UnifiedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Search, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernIndex = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and connect your knowledge with intelligent tagging and smart relationships."
    },
    {
      icon: Zap,
      title: "Lightning Fast Search",
      description: "Find anything in your knowledge base instantly with semantic search that understands context."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays private with enterprise-grade security and end-to-end encryption."
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Users" },
    { value: "1M+", label: "Items Saved" },
    { value: "99.9%", label: "Uptime" },
    { value: "5+ hrs", label: "Saved Weekly" }
  ];

  return (
    <UnifiedPageLayout
      title="Accio - Your AI Knowledge Management Platform"
      description="Transform scattered information into organized intelligence. Save, organize, and discover insights with AI-powered knowledge management."
    >
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Star className="h-3 w-3 mr-1" />
              Trusted by 50,000+ professionals
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Your AI-powered
              <span className="text-primary block">knowledge engine</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop losing brilliant ideas. Transform scattered information into organized intelligence 
              and reclaim 5+ hours weekly with AI-powered knowledge management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/features">See Features</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to build your knowledge empire
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to amplify your intellectual capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Join thousands of knowledge workers
            </h2>
            <p className="text-xl text-muted-foreground">
              Professionals from leading companies trust Accio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Accio has transformed how I manage research. What used to take hours now takes minutes."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Research Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The AI organization is incredible. It finds connections I never would have discovered."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Product Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a knowledge management tool that actually understands how I think and work."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Emma Thompson</div>
                    <div className="text-sm text-muted-foreground">Consultant</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals who've revolutionized their knowledge management. 
              Start building your knowledge empire today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free forever plan available • No credit card required
            </p>
          </div>
        </div>
      </section>
    </UnifiedPageLayout>
  );
};

export default ModernIndex;

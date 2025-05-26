
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Search, 
  Shield, 
  Zap, 
  FileText, 
  Tag, 
  BarChart3, 
  Share2,
  Clock,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with advanced AI algorithms.",
      badge: "AI-Powered"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find anything instantly with semantic search that understands context and meaning.",
      badge: "Core Feature"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with enterprise-grade encryption and privacy controls.",
      badge: "Security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with instant loading and real-time synchronization.",
      badge: "Performance"
    },
    {
      icon: FileText,
      title: "Universal Content",
      description: "Save and organize any type of content: articles, documents, videos, and more.",
      badge: "Versatile"
    },
    {
      icon: Tag,
      title: "Smart Tagging",
      description: "Automatic tagging system that learns from your preferences and usage patterns.",
      badge: "Automation"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your knowledge growth with detailed analytics and usage insights.",
      badge: "Analytics"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your knowledge with teams or keep it private - you're in control.",
      badge: "Collaboration"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Accio Knowledge Management</title>
        <meta name="description" content="Discover all the powerful features that make Accio the perfect knowledge management platform for professionals." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6">
              <Star className="h-3 w-3 mr-1" />
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need for
              <span className="text-primary block">knowledge management</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the powerful features that make Accio the perfect platform for organizing, 
              discovering, and leveraging your knowledge.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/playground">Try Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{feature.badge}</Badge>
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your knowledge management?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have revolutionized how they organize and discover knowledge.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;

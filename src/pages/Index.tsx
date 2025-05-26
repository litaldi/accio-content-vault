
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProfessionalNavigation from '@/components/navigation/ProfessionalNavigation';
import ImprovedFooter from '@/components/layout/ImprovedFooter';
import { 
  Brain, 
  Search, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  BookOpen,
  BarChart3
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and tag your content with advanced AI that understands context and meaning."
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find anything by describing what you remember, not just exact keywords. Our AI understands intent."
    },
    {
      icon: Zap,
      title: "Instant Capture",
      description: "Save content from anywhere with our browser extension, mobile app, or drag-and-drop interface."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption ensures your knowledge remains private and secure at all times."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share collections and collaborate on knowledge bases with your team seamlessly."
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Gain insights into your learning patterns and optimize your knowledge consumption."
    }
  ];

  const testimonials = [
    {
      quote: "Accio transformed how I manage research. I've saved hours every week and never lose important information anymore.",
      author: "Dr. Sarah Chen",
      role: "Research Scientist",
      rating: 5
    },
    {
      quote: "The AI organization is incredible. It automatically groups related content in ways I never thought of.",
      author: "Marcus Rodriguez",
      role: "Product Manager",
      rating: 5
    },
    {
      quote: "Finally, a knowledge management tool that actually understands what I'm looking for.",
      author: "Emily Johnson",
      role: "Content Strategist", 
      rating: 5
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "2M+", label: "Items Saved" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management</title>
        <meta name="description" content="Transform how you organize and access information with Accio's AI-powered knowledge management platform. Never lose important content again." />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Management" />
        <meta property="og:description" content="Transform how you organize and access information with AI-powered knowledge management." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ProfessionalNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-blue-500/5">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                Powered by Advanced AI
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Your Personal
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                  Knowledge Engine
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform how you organize and access information. Accio uses AI to automatically categorize, 
                tag, and help you rediscover your knowledge effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="btn-primary text-lg px-8 py-4 font-semibold">
                  <Link to="/register">
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Today
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 font-semibold border-border hover:border-primary/20">
                  <Link to="/features">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to make knowledge management effortless and intelligent
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="card-elevated group hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Loved by Professionals</h2>
              <p className="text-xl text-muted-foreground">
                See what our users are saying about their experience
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-elevated">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have revolutionized how they organize and access information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 text-lg px-8 py-4 font-semibold">
                <Link to="/register">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold">
                <Link to="/features">
                  View All Features
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ImprovedFooter />
    </div>
  );
};

export default Index;

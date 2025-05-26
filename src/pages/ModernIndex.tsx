
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernNavigation from '@/components/navigation/ModernNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  TrendingUp,
  Globe,
  Smartphone,
  Eye,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernIndex = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and connect your knowledge with intelligent tagging and smart relationships.",
      highlight: "Save 5+ hours weekly"
    },
    {
      icon: Zap,
      title: "Lightning Fast Search",
      description: "Find anything in your knowledge base instantly with semantic search that understands context.",
      highlight: "Sub-second results"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data stays private with enterprise-grade security and end-to-end encryption.",
      highlight: "SOC 2 compliant"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description: "Access your knowledge seamlessly across all devices with real-time synchronization.",
      highlight: "Works everywhere"
    },
    {
      icon: Globe,
      title: "Universal Capture",
      description: "Save content from any website, document, or file format with our browser extension.",
      highlight: "One-click saving"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share knowledge and collaborate with your team while maintaining granular permissions.",
      highlight: "Built for teams"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Users", icon: Users },
    { value: "1M+", label: "Items Saved", icon: Bookmark },
    { value: "99.9%", label: "Uptime", icon: TrendingUp },
    { value: "5+ hrs", label: "Saved Weekly", icon: Zap }
  ];

  const testimonials = [
    {
      content: "Accio has completely transformed how I manage research. What used to take hours now takes minutes. The AI organization is incredible.",
      author: "Sarah Chen",
      role: "Research Director",
      company: "TechCorp",
      avatar: "SC"
    },
    {
      content: "Finally, a knowledge management tool that actually understands what I'm looking for. The search is phenomenal.",
      author: "Marcus Johnson",
      role: "Product Manager",
      company: "StartupXYZ",
      avatar: "MJ"
    },
    {
      content: "Our team's productivity has increased dramatically since adopting Accio. It's like having a research assistant.",
      author: "Elena Rodriguez",
      role: "Strategy Lead",
      company: "ConsultingFirm",
      avatar: "ER"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accio - Your AI-Powered Knowledge Engine</title>
        <meta name="description" content="Transform scattered information into organized intelligence. Save, organize, and discover insights with AI-powered knowledge management that saves you 5+ hours weekly." />
        <meta name="keywords" content="knowledge management, AI organization, productivity, research, bookmarks, search" />
        <link rel="canonical" href="/" />
      </Helmet>

      <ModernNavigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
          
          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Star className="h-3 w-3 mr-1" />
                Trusted by 50,000+ professionals worldwide
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Your AI-powered
                <span className="block text-primary">knowledge engine</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Stop losing brilliant ideas in scattered bookmarks and notes. 
                <span className="text-foreground font-semibold"> Transform chaos into clarity</span> with AI that organizes, connects, and surfaces insights automatically.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/register" className="flex items-center space-x-2">
                    <span>Start Building Your Knowledge Engine</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-2 hover:bg-accent/50">
                  <Link to="/features" className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>See How It Works</span>
                  </Link>
                </Button>
              </div>

              {/* Quick Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
                {[
                  { icon: CheckCircle, text: "Save 5+ hours weekly", color: "text-green-600" },
                  { icon: Lock, text: "Enterprise-grade security", color: "text-blue-600" },
                  { icon: Zap, text: "Setup in under 2 minutes", color: "text-orange-600" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
                    <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                    <span className="font-medium text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
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
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Everything you need to amplify your intellect
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful features designed to transform how you capture, organize, and access knowledge
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Loved by knowledge workers worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                See how professionals are transforming their productivity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to transform your knowledge workflow?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 50,000+ professionals who've revolutionized their productivity. 
                Start building your knowledge engine today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                  <Link to="/register" className="flex items-center space-x-2">
                    <span>Start Free - No Credit Card Required</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-2">
                  <Link to="/help">Talk to an Expert</Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Free forever plan • Setup in 2 minutes • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModernIndex;

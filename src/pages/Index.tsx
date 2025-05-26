
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ModernNavigation from '@/components/navigation/ModernNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Search, 
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Organization",
      description: "Automatically categorize and connect your knowledge with intelligent tagging and smart relationships."
    },
    {
      icon: Zap,
      title: "Lightning-Fast Search",
      description: "Find anything in your knowledge base instantly with our advanced semantic search technology."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level encryption and privacy-first architecture."
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Users", icon: Users },
    { value: "5+ Hours", label: "Saved Weekly", icon: Clock },
    { value: "99.9%", label: "Uptime", icon: TrendingUp },
    { value: "4.9/5", label: "User Rating", icon: Star }
  ];

  const testimonials = [
    {
      quote: "Accio transformed how I manage information. I've saved 10+ hours weekly and never lose important insights anymore.",
      author: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp"
    },
    {
      quote: "The AI organization is incredible. It finds connections in my knowledge that I never would have discovered myself.",
      author: "David Rodriguez",
      role: "Research Director",
      company: "Innovation Labs"
    },
    {
      quote: "Finally, a knowledge management tool that actually understands how I think and work. Game-changer.",
      author: "Emily Johnson",
      role: "Consultant",
      company: "Strategy Group"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management for Modern Professionals</title>
        <meta name="description" content="Transform scattered information into organized intelligence. Join 50,000+ professionals using Accio's AI-powered knowledge management platform." />
        <meta name="keywords" content="AI knowledge management, productivity tools, information organization, digital brain" />
        <link rel="canonical" href="/" />
      </Helmet>

      <ModernNavigation />

      <main>
        {/* Hero Section */}
        <section className="section-spacing gradient-subtle">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <div className="animate-fade-in-up">
              <Badge className="badge-modern badge-primary element-spacing-sm">
                <Star className="h-4 w-4" />
                Trusted by 50,000+ professionals
              </Badge>
              
              <h1 className="text-hero element-spacing-md">
                Stop Losing Brilliant Ideas.
                <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Start Building Your Knowledge Empire.
                </span>
              </h1>
              
              <p className="text-body-large text-muted-foreground element-spacing-lg max-w-3xl mx-auto">
                Transform scattered information into organized intelligence with AI-powered knowledge management. 
                Reclaim 5+ hours weekly and never lose another brilliant insight.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary" asChild>
                  <Link to="/dashboard">
                    Start Your Free Trial
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" className="btn-secondary" asChild>
                  <Link to="/features">See How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="content-spacing">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="layout-grid layout-grid-4 animate-stagger">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-title text-primary mb-2">{stat.value}</div>
                  <div className="text-caption">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-spacing gradient-primary">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center element-spacing-lg">
              <h2 className="text-title element-spacing-md">
                Powerful Features for Knowledge Excellence
              </h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Every feature is designed to save you time and amplify your intellectual capabilities.
              </p>
            </div>

            <div className="layout-grid layout-grid-3 animate-stagger">
              {features.map((feature, index) => (
                <Card key={index} className="card-modern card-interactive text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-subtitle element-spacing-sm">{feature.title}</h3>
                  <p className="text-body text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-spacing">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center element-spacing-lg">
              <h2 className="text-title element-spacing-md">
                Loved by Knowledge Workers Worldwide
              </h2>
              <p className="text-body-large text-muted-foreground">
                See what professionals are saying about their Accio experience.
              </p>
            </div>

            <div className="layout-grid layout-grid-3 animate-stagger">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-modern">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-body mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-caption">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing gradient-primary">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-title element-spacing-md">
              Ready to Transform Your Knowledge Management?
            </h2>
            <p className="text-body-large text-muted-foreground element-spacing-lg">
              Join thousands of professionals who've revolutionized their productivity with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" asChild>
                <Link to="/dashboard">
                  Start Your Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="btn-secondary" asChild>
                <Link to="/help">Get Expert Help</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

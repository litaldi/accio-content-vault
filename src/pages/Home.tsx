
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Zap, Shield, Users, ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content using advanced machine learning.'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just exact keywords.'
    },
    {
      icon: Zap,
      title: 'Quick Capture',
      description: 'Save content from anywhere with our browser extension and mobile apps.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry security standards.'
    }
  ];

  const benefits = [
    'Automatic content categorization',
    'Natural language search',
    'Cross-platform synchronization',
    'Team collaboration tools',
    'Offline access capability',
    'API integrations'
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Research Director',
      company: 'TechCorp',
      content: 'Accio transformed how our team manages knowledge. We save hours every week.',
      rating: 5
    },
    {
      name: 'David Rodriguez',
      role: 'Content Creator',
      company: 'Creative Studios',
      content: 'The AI organization is incredible. It understands context better than I do sometimes.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Product Manager',
      company: 'StartupXYZ',
      content: 'Finally, a knowledge management tool that actually gets smarter over time.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management Platform</title>
        <meta name="description" content="Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform. Save, organize, and discover content effortlessly." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-600/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered Knowledge Engine
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Transform Information into Intelligence
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Accio helps professionals organize, discover, and leverage their knowledge with AI-powered automation. 
                Never lose important information again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Intelligent Knowledge Management</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of information organization with AI that understands context and learns your preferences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Everything You Need for Knowledge Management</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  From AI-powered organization to enterprise security, Accio provides all the tools 
                  you need to transform scattered information into organized intelligence.
                </p>
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg">
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-8 text-center">
                <Brain className="h-32 w-32 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">AI That Gets Smarter</h3>
                <p className="text-muted-foreground">
                  Our machine learning algorithms continuously improve, adapting to your unique 
                  workflow and preferences to surface the right information at the right time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Trusted by Knowledge Workers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their productivity with Accio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have already discovered the power of AI-driven knowledge organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              No credit card required. Get started in under 2 minutes.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

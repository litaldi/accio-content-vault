
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Search, Zap, Shield, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Organization',
      description: 'Automatically categorize and tag your content with advanced AI'
    },
    {
      icon: Search,
      title: 'Semantic Search',
      description: 'Find content by describing what you remember, not just keywords'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Access your knowledge instantly with our optimized search engine'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance standards'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      content: 'Accio transformed how our team manages knowledge. We find information 10x faster now.',
      rating: 5
    },
    {
      name: 'David Rodriguez',
      role: 'Research Director',
      content: 'The AI categorization is incredible. It understands context better than any tool we\'ve used.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Content Strategist',
      content: 'Finally, a knowledge management tool that actually makes sense. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Accio - AI-Powered Knowledge Management Platform</title>
        <meta name="description" content="Transform scattered information into organized intelligence with Accio's AI-powered knowledge management platform. Get started free today." />
        <meta property="og:title" content="Accio - AI-Powered Knowledge Management" />
        <meta property="og:description" content="Organize, search, and leverage your knowledge like never before with AI." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://accio.app" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5" />
          <div className="relative container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Transform Knowledge Into{' '}
                <span className="text-primary">Intelligence</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Accio's AI-powered platform automatically organizes your scattered information, 
                making it instantly searchable and actionable. Never lose important knowledge again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
              <div className="pt-4 text-sm text-muted-foreground">
                ✨ No credit card required • 🚀 Setup in 2 minutes • 🔒 Enterprise-grade security
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Accio?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for modern professionals who need to manage information efficiently
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

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Trusted by Professionals</h2>
              <p className="text-lg text-muted-foreground">
                See what our users are saying about Accio
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have revolutionized their information management with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/register">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

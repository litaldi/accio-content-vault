
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Zap, Shield, Users, Star, BookOpen, ArrowRight } from 'lucide-react';
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
        <section className="relative section-spacing overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5" />
          <div className="relative container mx-auto px-4 max-w-6xl">
            <div className="text-center space-12">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                Transform Knowledge Into{' '}
                <span className="text-primary">Intelligence</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                Accio's AI-powered platform automatically organizes your scattered information, 
                making it instantly searchable and actionable. Never lose important knowledge again.
              </p>
              
              {/* Enhanced Search Demo */}
              <div className="max-w-md mx-auto mb-12" data-tour="search-demo">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-xl blur-xl" />
                  <div className="relative bg-background/95 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Search className="h-6 w-6" />
                      <span className="text-lg">Try: "productivity tips for remote work"</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <EnhancedButton 
                  size="lg" 
                  emphasis="high"
                  showArrow
                  asChild
                >
                  <Link to="/register">Get Started Free</Link>
                </EnhancedButton>
                <EnhancedButton 
                  variant="secondary" 
                  size="lg"
                  emphasis="medium"
                  asChild
                >
                  <Link to="/features">Explore Features</Link>
                </EnhancedButton>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-3">
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-warning" />
                    <span>Setup in 2 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span>Enterprise-grade security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-spacing bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-6">
              <h2 className="text-3xl font-bold mb-6">Why Choose Accio?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built for modern professionals who need to manage information efficiently
              </p>
            </div>
            
            <div className="grid-features">
              {features.map((feature, index) => (
                <EnhancedCard 
                  key={index} 
                  variant="interactive"
                  padding="lg"
                  spacing="relaxed"
                  className="text-center"
                  data-tour={index === 0 ? "ai-organization" : undefined}
                >
                  <EnhancedCardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <EnhancedCardTitle className="text-xl">{feature.title}</EnhancedCardTitle>
                  </EnhancedCardHeader>
                  <EnhancedCardContent>
                    <EnhancedCardDescription>{feature.description}</EnhancedCardDescription>
                    {index === 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mt-6" data-tour="ai-tags">
                        <Badge variant="secondary" className="text-xs">AI</Badge>
                        <Badge variant="secondary" className="text-xs">Smart</Badge>
                        <Badge variant="secondary" className="text-xs">Auto</Badge>
                      </div>
                    )}
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-spacing">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-6">
              <h2 className="text-3xl font-bold mb-6">Trusted by Professionals</h2>
              <p className="text-lg text-muted-foreground">
                See what our users are saying about Accio
              </p>
            </div>
            
            <div className="grid-features">
              {testimonials.map((testimonial, index) => (
                <EnhancedCard 
                  key={index} 
                  variant="elevated"
                  padding="lg"
                  spacing="relaxed"
                >
                  <EnhancedCardHeader>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <EnhancedCardDescription className="text-base leading-relaxed">
                      "{testimonial.content}"
                    </EnhancedCardDescription>
                  </EnhancedCardHeader>
                  <EnhancedCardContent>
                    <div className="text-sm space-y-1">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions Demo */}
        <section className="section-spacing-sm bg-muted/10">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h3 className="text-2xl font-bold mb-8">Quick Actions</h3>
            <div className="grid-features max-w-3xl mx-auto">
              <EnhancedCard 
                variant="interactive" 
                padding="lg"
                data-tour="save-button"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Save Content</p>
                    <p className="text-sm text-muted-foreground">One-click capture</p>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="interactive" padding="lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Smart Search</p>
                    <p className="text-sm text-muted-foreground">⌘K to search</p>
                  </div>
                </div>
              </EnhancedCard>
              
              <EnhancedCard variant="interactive" padding="lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">AI Organize</p>
                    <p className="text-sm text-muted-foreground">Auto-categorize</p>
                  </div>
                </div>
              </EnhancedCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-4xl text-center space-8">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Knowledge?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have revolutionized their information management with Accio.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <EnhancedButton 
                variant="secondary" 
                size="lg"
                emphasis="high"
                showArrow
                asChild
              >
                <Link to="/register">Start Free Trial</Link>
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size="lg"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/contact">Contact Sales</Link>
              </EnhancedButton>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button for Mobile */}
      <EnhancedButton
        size="fab"
        className="lg:hidden"
        aria-label="Quick capture"
        leftIcon={<BookOpen className="h-6 w-6" />}
      />
    </>
  );
};

export default Home;

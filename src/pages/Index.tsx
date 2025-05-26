
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrganizedNavigation from '@/components/navigation/OrganizedNavigation';
import MarketingHeroSection from '@/components/home/MarketingHeroSection';
import MarketingFooter from '@/components/Footer/MarketingFooter';
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, BarChart3, Settings, Sparkles, Shield, Zap, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const navigate = useNavigate();
  
  // Safely use auth context with fallback
  let user = null;
  
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.warn('AuthProvider not available, page will work in guest mode');
  }
  
  const isLoggedIn = !!user;

  const quickActions = [
    {
      title: "Get Organized Faster",
      description: "Start building your personal knowledge library instantly",
      icon: Search,
      action: () => navigate('/dashboard'),
      color: "bg-blue-500"
    },
    {
      title: "Save Your First Content",
      description: "Capture articles, links, and resources with ease",
      icon: BookOpen,
      action: () => navigate('/save'),
      color: "bg-green-500"
    },
    {
      title: "Track Your Growth",
      description: "See how your knowledge collection grows over time",
      icon: BarChart3,
      action: () => navigate('/analytics'),
      color: "bg-purple-500"
    },
    {
      title: "Customize Your Experience",
      description: "Set up preferences that work for you",
      icon: Settings,
      action: () => navigate('/settings'),
      color: "bg-orange-500"
    }
  ];

  const benefits = [
    {
      title: "Never Lose Important Information",
      description: "Capture anything from the web and access it forever. No more lost bookmarks or forgotten articles.",
      icon: Shield,
      stats: "99.9% uptime guarantee"
    },
    {
      title: "Find Everything Instantly",
      description: "Powerful AI search understands context and finds exactly what you need in seconds.",
      icon: Zap,
      stats: "Sub-second search results"
    },
    {
      title: "Work Smarter, Not Harder",
      description: "Automatic organization and smart tagging saves hours of manual work every week.",
      icon: Users,
      stats: "Average 5 hours saved per week"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at Google",
      content: "Accio transformed how I research and save ideas. I can finally find that article I saved months ago!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "Consultant",
      content: "The AI organization is incredible. It automatically categorizes everything perfectly.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Researcher",
      content: "Best knowledge management tool I've ever used. Simple, powerful, and actually works.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Accio - AI Knowledge Engine | Never Lose Important Information Again</title>
        <meta name="description" content="Transform scattered bookmarks into an AI-powered knowledge engine. Save anything, find everything instantly, achieve 10x productivity with intelligent organization." />
        <meta name="keywords" content="knowledge management, AI, productivity, content organization, search, bookmarks, notes, research, information management" />
        <meta property="og:title" content="Accio - AI Knowledge Engine" />
        <meta property="og:description" content="Never lose important information again. AI-powered knowledge engine for productivity professionals." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accio - AI Knowledge Engine" />
        <meta name="twitter:description" content="Save anything, find everything instantly, achieve 10x productivity with AI organization." />
        <link rel="canonical" href="https://accio.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
      </Helmet>

      {/* Navigation */}
      <OrganizedNavigation />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <MarketingHeroSection />
        
        {/* Quick Access Section for returning users */}
        {isLoggedIn && (
          <section className="py-16 bg-muted/20" aria-labelledby="quick-access-heading">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-12">
                <h2 id="quick-access-heading" className="text-3xl font-bold mb-4">Welcome back to your knowledge engine!</h2>
                <p className="text-xl text-muted-foreground">
                  Quick access to your most-used features
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {quickActions.map((action) => (
                  <EnhancedCard 
                    key={action.title}
                    interactive
                    elevated
                    onClick={action.action}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action.action();
                      }
                    }}
                    aria-label={`${action.title}: ${action.description}`}
                    className="group hover:scale-105 transition-all duration-200"
                  >
                    <EnhancedCardHeader className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-4 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <EnhancedCardTitle className="text-lg">{action.title}</EnhancedCardTitle>
                      <EnhancedCardDescription>{action.description}</EnhancedCardDescription>
                    </EnhancedCardHeader>
                    <EnhancedCardContent>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                        }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </EnhancedCardContent>
                  </EnhancedCard>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Benefits Section */}
        <section className="py-20" id="features-section" aria-labelledby="benefits-heading">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Why knowledge workers choose Accio
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of professionals who have transformed their productivity with intelligent knowledge management.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="text-center space-y-6 p-8 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{benefit.description}</p>
                    <div className="text-sm font-medium text-primary">
                      {benefit.stats}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Everything you need to organize knowledge</h3>
                <div className="space-y-4">
                  {[
                    "One-click saving from any website",
                    "AI-powered automatic categorization", 
                    "Intelligent search with natural language",
                    "Cross-device synchronization",
                    "Secure cloud storage with encryption",
                    "Team collaboration features"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" onClick={() => navigate('/register')} className="mt-6">
                  Start Your Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground mb-4">Professionals trust Accio</div>
                <div className="flex justify-center items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5 rating</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "The best knowledge management tool I've ever used"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Loved by professionals everywhere</h2>
              <p className="text-xl text-muted-foreground">
                See what our users have to say about transforming their productivity
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-background rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        {!isLoggedIn && (
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to build your knowledge engine?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of professionals who never lose important information again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/register')} className="text-lg px-8 py-4">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Free - No Credit Card Required
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/features')} className="text-lg px-8 py-4">
                  Explore All Features
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Free forever plan • Upgrade anytime • Cancel anytime
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <MarketingFooter />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;


import React from 'react';
import { ArrowRight, CheckCircle, Star, Sparkles, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ImprovedCard } from '@/components/ui/improved-card';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing, interactiveStyles, focusStyles } from '@/components/ui/design-system';
import { cn } from '@/lib/utils';

const OptimizedHeroSection: React.FC = () => {
  const socialProof = {
    rating: "4.9",
    reviews: "2,500+",
    users: "10K+"
  };

  const trustIndicators = [
    { icon: Shield, text: "Enterprise Security", color: "text-green-600" },
    { icon: Users, text: `${socialProof.users} Users`, color: "text-blue-600" },
    { icon: TrendingUp, text: "99.9% Uptime", color: "text-purple-600" },
    { icon: Zap, text: "Lightning Fast", color: "text-orange-600" }
  ];

  const keyBenefits = [
    "Save from any website in 1 click",
    "AI organizes everything automatically", 
    "Find anything in seconds, not hours",
    "Works seamlessly across all devices"
  ];

  const testimonials = [
    {
      text: "Accio transformed how I manage information. I find everything instantly now.",
      author: "Sarah Chen",
      role: "Product Manager, Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=60&q=80"
    },
    {
      text: "The AI organization is incredible. Like having a personal research assistant.",
      author: "Michael Torres", 
      role: "Strategy Consultant",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&q=80"
    },
    {
      text: "I've saved 5+ hours per week since switching. Game-changing productivity.",
      author: "Emily Rodriguez",
      role: "Research Director, Microsoft", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=60&q=80"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-70" />
      
      <Spacing.Section size="lg" className="relative z-10">
        <Spacing.Container size="lg">
          <div className="text-center max-w-5xl mx-auto">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 bg-green-50 border border-green-200 text-green-800 shadow-sm">
              <div className="flex items-center">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Typography.Caption className="font-semibold text-green-800">
                Rated {socialProof.rating}/5 by {socialProof.reviews} users
              </Typography.Caption>
            </div>
            
            {/* Main Headline with Enhanced Typography */}
            <Typography.H1 className="mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Stop Losing Your Best Ideas.{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                Start Building Brilliance.
              </span>
            </Typography.H1>
            
            {/* Enhanced Value Proposition */}
            <Typography.Body size="lg" className="mb-8 max-w-4xl mx-auto text-foreground/90">
              Transform scattered bookmarks, tabs, and notes into an{' '}
              <span className="text-primary font-semibold">AI-powered knowledge engine</span>{' '}
              that makes you 10x more productive. Save anything, find everything, achieve more.
            </Typography.Body>

            {/* Key Benefits with Better Visual Hierarchy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-border/50 shadow-sm">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <Typography.Body className="font-medium text-foreground text-left mb-0">
                    {benefit}
                  </Typography.Body>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                asChild 
                size="lg" 
                className={cn("shadow-2xl hover:shadow-3xl text-lg px-8 py-6 h-auto", interactiveStyles, focusStyles)}
              >
                <Link to="/register">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className={cn("border-2 hover:border-primary/50 backdrop-blur-sm text-lg px-8 py-6 h-auto", focusStyles)}
              >
                <Link to="/playground">
                  Try Interactive Demo
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <Typography.Body className="mb-8 font-medium text-foreground/80">
              Trusted by knowledge workers at Google, Microsoft, Netflix, and 500+ other companies
            </Typography.Body>

            {/* Trust Indicators with Better Spacing */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex flex-col items-center gap-3 p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
                  <div className={cn("p-2 rounded-lg bg-background shadow-sm", indicator.color)}>
                    <indicator.icon className="h-5 w-5" />
                  </div>
                  <Typography.Caption className="font-semibold text-center">
                    {indicator.text}
                  </Typography.Caption>
                </div>
              ))}
            </div>

            {/* Enhanced Testimonials */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ImprovedCard key={index} className="p-6 bg-background/90 backdrop-blur-sm border-0 shadow-lg hover" padding="none">
                  <div className="flex items-center mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Typography.Body className="mb-6 text-foreground/90 text-left">
                    "{testimonial.text}"
                  </Typography.Body>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.author} avatar`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <Typography.Body className="font-semibold text-foreground mb-0">
                        {testimonial.author}
                      </Typography.Body>
                      <Typography.Caption>{testimonial.role}</Typography.Caption>
                    </div>
                  </div>
                </ImprovedCard>
              ))}
            </div>
          </div>
        </Spacing.Container>
      </Spacing.Section>
    </section>
  );
};

export default OptimizedHeroSection;


import React from 'react';
import { ArrowRight, Star, Users, TrendingUp, Zap, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const MarketingHeroSection: React.FC = () => {
  const testimonials = [
    {
      text: "Accio has revolutionized how I manage information. I find everything instantly now.",
      author: "Sarah Chen",
      role: "Product Manager, Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=60&q=80"
    },
    {
      text: "The AI organization is incredible. It's like having a personal research assistant.",
      author: "Michael Torres",
      role: "Strategy Consultant",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&q=80"
    },
    {
      text: "I've saved 5+ hours per week since switching to Accio. Game-changing productivity.",
      author: "Emily Rodriguez",
      role: "Research Director, Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=60&q=80"
    }
  ];

  const trustIndicators = [
    { icon: Shield, text: "SOC 2 Compliant" },
    { icon: Users, text: "10K+ Happy Users" },
    { icon: TrendingUp, text: "99.9% Uptime" },
    { icon: Zap, text: "Lightning Fast" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-70" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-green-50 border border-green-200 text-green-800">
            <div className="flex items-center">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">Rated 4.9/5 by 2,500+ users</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-[1.1] tracking-tight">
            Stop Losing Your Best Ideas.{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Start Building Brilliance.
            </span>
          </h1>
          
          {/* Value Proposition */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
            Turn the chaos of bookmarks, tabs, and scattered notes into an{' '}
            <span className="text-primary font-semibold">AI-powered knowledge engine</span>{' '}
            that makes you 10x more productive. Save anything, find everything, achieve more.
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            {[
              "Save from any website in 1 click",
              "AI organizes everything automatically", 
              "Find anything in seconds, not hours",
              "Works across all your devices"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <EnhancedButton 
              asChild 
              size="xl" 
              variant="gradient"
              className="shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Link to="/register">
                Start Your Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
            </EnhancedButton>
            
            <EnhancedButton 
              asChild 
              variant="outline" 
              size="xl"
              className="border-2 hover:border-primary/50 backdrop-blur-sm"
            >
              <Link to="/playground">
                Try Interactive Demo
              </Link>
            </EnhancedButton>
          </div>

          {/* Social Proof Text */}
          <p className="text-muted-foreground mb-8 font-medium">
            Trusted by knowledge workers at Google, Microsoft, Netflix, and 500+ other companies
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-center gap-2 p-3 bg-background/60 backdrop-blur-sm rounded-lg border">
                <indicator.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-background/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingHeroSection;

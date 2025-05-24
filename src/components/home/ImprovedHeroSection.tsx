
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Zap, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ImprovedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const trustIndicators = [
    { icon: Shield, text: "Bank-level security", color: "text-green-500" },
    { icon: Zap, text: "AI-powered", color: "text-blue-500" },
    { icon: Users, text: "10,000+ users", color: "text-purple-500" },
    { icon: Star, text: "Free forever", color: "text-yellow-500" }
  ];

  const stats = [
    { number: '10K+', label: 'Content Items Saved' },
    { number: '98%', label: 'Search Accuracy' },
    { number: '2s', label: 'Average Response Time' }
  ];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32"
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 text-center relative z-10 max-w-6xl">
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-12">
          {trustIndicators.map((indicator, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:bg-background/70 transition-colors"
            >
              <indicator.icon className={`h-4 w-4 ${indicator.color}`} aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">{indicator.text}</span>
            </div>
          ))}
        </div>

        {/* Main headline */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
          AI-Powered Knowledge Management
        </div>
        
        <h1 
          id="hero-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight"
        >
          Your Personal
          <span className="block text-primary">Knowledge Library</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform the internet into your curated knowledge base. Save, organize, and rediscover content with AI-powered intelligence.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {!user ? (
            <>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate('/register')}
                aria-describedby="cta-description"
              >
                Start Building Your Library
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 hover:-translate-y-1 transition-all duration-300"
                onClick={() => navigate('/playground')}
              >
                Try the Demo
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 hover:-translate-y-1 transition-all duration-300"
                onClick={() => navigate('/save')}
              >
                Save Content
              </Button>
            </>
          )}
        </div>

        <div id="cta-description" className="sr-only">
          {!user ? "No credit card required. Start for free." : "Access your personal knowledge library."}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-3xl font-bold text-primary mb-2" aria-label={`${stat.number} ${stat.label}`}>
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImprovedHeroSection;

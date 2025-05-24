
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Zap, Users, Star, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const ImprovedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const trustIndicators = [
    { icon: Shield, text: "SOC 2 Compliant", color: "text-green-600" },
    { icon: Zap, text: "AI-Powered Search", color: "text-blue-600" },
    { icon: Users, text: "25,000+ Active Users", color: "text-purple-600" },
    { icon: Star, text: "4.9/5 Rating", color: "text-yellow-600" }
  ];

  const stats = [
    { number: '25K+', label: 'Active Users', sublabel: 'Growing daily' },
    { number: '99.9%', label: 'Uptime', sublabel: 'Enterprise grade' },
    { number: '<1s', label: 'Search Speed', sublabel: 'Lightning fast' }
  ];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-24 md:py-32"
      aria-labelledby="hero-heading"
      id="hero-section"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 text-center relative z-10 max-w-6xl">
        {/* Product announcement badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
          <Sparkles className="w-4 h-4 mr-2 animate-pulse" aria-hidden="true" />
          <span>Introducing AI-Powered Knowledge Management 2.0</span>
          <Badge variant="secondary" className="ml-2">New</Badge>
        </div>

        {/* Main headline with improved typography */}
        <h1 
          id="hero-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Transform the Internet Into
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent">
            Your Personal Knowledge Library
          </span>
        </h1>
        
        {/* Enhanced value proposition */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Save, organize, and rediscover any content with 
          <span className="font-semibold text-foreground"> AI-powered intelligence</span>. 
          Never lose track of important information again.
        </p>
        
        {/* Trust indicators with improved design */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-12">
          {trustIndicators.map((indicator, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:bg-background/90 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <indicator.icon className={`h-4 w-4 ${indicator.color}`} aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">{indicator.text}</span>
            </div>
          ))}
        </div>
        
        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {!user ? (
            <>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => navigate('/register')}
                aria-describedby="cta-description"
              >
                <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Start Building Your Library
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 hover:-translate-y-1 transition-all duration-300 group border-2"
                onClick={() => navigate('/playground')}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Try Demo
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => navigate('/dashboard')}
              >
                <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 hover:-translate-y-1 transition-all duration-300 group border-2"
                onClick={() => navigate('/save')}
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Save Content
              </Button>
            </>
          )}
        </div>

        <div id="cta-description" className="sr-only">
          {!user ? "No credit card required. Start for free today." : "Access your personal knowledge library and tools."}
        </div>
        
        {/* Enhanced stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border hover:bg-background/70 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2" aria-label={`${stat.number} ${stat.label}`}>
                {stat.number}
              </div>
              <div className="text-lg font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImprovedHeroSection;

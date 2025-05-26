
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Star, CheckCircle } from 'lucide-react';

const MarketingHeroSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <Badge variant="outline" className="mb-8 animate-fade-in">
            <Star className="h-3 w-3 mr-1" />
            AI-Powered Knowledge Engine
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-slide-up leading-tight">
            Transform Knowledge into
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block md:inline">
              {" "}Unstoppable Power
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed">
            The intelligent platform that captures, organizes, and transforms any content 
            into searchable knowledge. Stop losing valuable insights—start building your 
            personal knowledge sanctuary that grows smarter with every addition.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              className="group text-lg px-6 py-6 shadow-lg hover:shadow-xl transition-all" 
              asChild
            >
              <Link to="/register">
                Start Building Knowledge
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group text-lg px-6 py-6 border-2" 
              asChild
            >
              <Link to="/features">
                Explore Features
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span>10,000+ active users</span>
            </div>
          </div>
        </div>

        {/* Feature preview cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Brain, title: "AI Processing", desc: "Smart content analysis" },
            { icon: Search, title: "Semantic Search", desc: "Find by meaning, not keywords" },
            { icon: TrendingUp, title: "Growth Analytics", desc: "Track knowledge progress" }
          ].map((feature, index) => (
            <div key={index} className="bg-card/50 backdrop-blur border rounded-xl p-6 text-center hover:bg-card/80 transition-colors">
              <feature.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Import these icons
const Search = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const TrendingUp = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default MarketingHeroSection;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, Sparkles, ArrowRight, Play, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Spacing.Section size="xl" className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <Spacing.Container className="relative">
        <div className="text-center max-w-5xl mx-auto">
          <Badge variant="outline" className="mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Knowledge Engine
          </Badge>
          
          <Typography.H1 className="mb-8 animate-slide-up">
            Transform Knowledge into
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block sm:inline">
              {" "}Unstoppable Power
            </span>
          </Typography.H1>
          
          <Typography.Lead className="mb-12 max-w-3xl mx-auto animate-slide-up">
            The intelligent platform that captures, organizes, and transforms any content 
            into searchable knowledge. Stop losing valuable insights—start building your 
            personal knowledge sanctuary that grows smarter with every addition.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button 
              size="xl" 
              className="group shadow-lg hover:shadow-xl transition-all" 
              asChild
            >
              <Link to="/register">
                Start Building Knowledge
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="group border-2 hover:bg-primary/5" 
              asChild
            >
              <Link to="/features">
                <Play className="mr-2 h-5 w-5" />
                Explore Features
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
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
              <Typography.H4 className="mb-2">{feature.title}</Typography.H4>
              <Typography.Body size="sm" className="text-muted-foreground">
                {feature.desc}
              </Typography.Body>
            </div>
          ))}
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default HeroSection;

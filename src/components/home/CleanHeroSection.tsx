import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, Sparkles, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CleanHeroSection = () => {
  const trustIndicators = [
    { icon: CheckCircle, text: "No credit card required", color: "text-green-500" },
    { icon: CheckCircle, text: "14-day free trial", color: "text-blue-500" },
    { icon: CheckCircle, text: "10,000+ active users", color: "text-purple-500" }
  ];

  const previewFeatures = [
    { 
      icon: Brain, 
      title: "AI Processing", 
      description: "Smart content analysis and insights" 
    },
    { 
      icon: Sparkles, 
      title: "Quick Capture", 
      description: "Save from anywhere instantly" 
    },
    { 
      icon: ArrowRight, 
      title: "Smart Search", 
      description: "Find by meaning, not keywords" 
    }
  ];

  return (
    <Spacing.Section 
      size="xl" 
      className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      
      <Spacing.Container className="relative">
        <div className="text-center max-w-5xl mx-auto">
          <Badge variant="outline" className="mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground mb-16">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <indicator.icon className={`h-4 w-4 ${indicator.color}`} aria-hidden="true" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>

          {/* Feature preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {previewFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card/50 backdrop-blur border rounded-xl p-6 text-center hover:bg-card/80 transition-colors group"
              >
                <feature.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <Typography.H4 className="mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </Typography.H4>
                <Typography.Body size="sm" className="text-muted-foreground">
                  {feature.description}
                </Typography.Body>
              </div>
            ))}
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default CleanHeroSection;

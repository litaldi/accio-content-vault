
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, Sparkles, ArrowRight, Play, CheckCircle, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const EnhancedHeroSection = () => {
  const { user } = useAuth();

  const trustIndicators = [
    { icon: CheckCircle, text: "Free forever plan available", color: "text-green-500" },
    { icon: Users, text: "Join 10,000+ knowledge workers", color: "text-blue-500" },
    { icon: Zap, text: "AI-powered intelligence", color: "text-purple-500" }
  ];

  const valuePropositions = [
    { 
      icon: Brain, 
      title: "AI That Understands", 
      description: "Smart content analysis that learns your patterns" 
    },
    { 
      icon: Sparkles, 
      title: "Instant Organization", 
      description: "Auto-categorize and connect your knowledge seamlessly" 
    },
    { 
      icon: Zap, 
      title: "Lightning Discovery", 
      description: "Find insights in seconds, not hours" 
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
            The Future of Knowledge Management
          </Badge>
          
          <Typography.H1 className="mb-8 animate-slide-up">
            Stop Losing Brilliant Ideas.
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block sm:inline">
              {" "}Start Building Knowledge Wealth.
            </span>
          </Typography.H1>
          
          <Typography.Lead className="mb-12 max-w-3xl mx-auto animate-slide-up">
            Transform scattered information into your personal knowledge empire. Save anything, 
            find everything, and discover insights you never knew existed. Powered by AI that 
            actually understands how you think and work.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button 
              size="xl" 
              className="group shadow-lg hover:shadow-xl transition-all" 
              asChild
            >
              <Link to={user ? "/dashboard" : "/register"}>
                {user ? "Open Your Knowledge Hub" : "Start Building Knowledge Wealth"}
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
                See How It Works
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

          {/* Value proposition cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {valuePropositions.map((value, index) => (
              <div 
                key={index} 
                className="bg-card/50 backdrop-blur border rounded-xl p-6 text-center hover:bg-card/80 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <Typography.H4 className="mb-2 group-hover:text-primary transition-colors">
                  {value.title}
                </Typography.H4>
                <Typography.Body size="sm" className="text-muted-foreground">
                  {value.description}
                </Typography.Body>
              </div>
            ))}
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default EnhancedHeroSection;

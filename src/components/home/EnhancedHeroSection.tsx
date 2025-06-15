import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, Sparkles, ArrowRight, Play, CheckCircle, Users, Zap, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const EnhancedHeroSection = () => {
  const { user } = useAuth();

  const trustIndicators = [
    { icon: CheckCircle, text: "Free plan forever", color: "text-green-500" },
    { icon: Users, text: "Trusted by 50,000+ professionals", color: "text-blue-500" },
    { icon: Clock, text: "Save 5+ hours weekly", color: "text-purple-500" },
    { icon: Target, text: "Zero learning curve", color: "text-orange-500" }
  ];

  const valuePropositions = [
    { 
      icon: Brain, 
      title: "AI That Actually Understands", 
      description: "Smart analysis that learns your thinking patterns and connects your ideas automatically" 
    },
    { 
      icon: Sparkles, 
      title: "Effortless Organization", 
      description: "Never manually organize again. AI categorizes and tags everything as you save it" 
    },
    { 
      icon: Zap, 
      title: "Find Anything in Seconds", 
      description: "Natural language search that finds exactly what you need, when you need it" 
    }
  ];

  return (
    <Spacing.Section 
      size="xl" 
      className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
      
      <Spacing.Container className="relative">
        <div className="text-center max-w-5xl mx-auto">
          <Badge variant="outline" className="mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
            Transform Knowledge Into Wealth
          </Badge>
          
          <Typography.H1 className="mb-8 animate-slide-up">
            Never Lose Another Brilliant Idea.
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent block sm:inline">
              {" "}Build Your Knowledge Empire.
            </span>
          </Typography.H1>
          
          <Typography.Lead className="mb-12 max-w-3xl mx-auto animate-slide-up">
            Stop letting valuable insights slip away. Capture anything, find everything, and discover 
            connections you never knew existed. Join thousands of professionals who've transformed 
            scattered information into organized intelligence.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button 
              size="xl" 
              className="group shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" 
              asChild
            >
              <Link to={user ? "/dashboard" : "/register"}>
                {user ? "Open Your Knowledge Hub" : "Start Building Wealth"}
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground mb-16">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <indicator.icon className={`h-4 w-4 ${indicator.color}`} aria-hidden="true" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>

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

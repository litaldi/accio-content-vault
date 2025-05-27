
import React from 'react';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const CTASection = () => {
  const { user } = useAuth();

  return (
    <Spacing.Section className="bg-gradient-to-br from-primary/10 to-background">
      <Spacing.Container>
        <div className="text-center max-w-3xl mx-auto">
          <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
          
          <Typography.H2 className="mb-6">
            Your Knowledge Empire Awaits
          </Typography.H2>
          
          <Typography.Lead className="mb-8">
            Stop letting brilliant ideas slip away. Join thousands of professionals who've transformed 
            information chaos into their competitive advantage. Your future self will thank you.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" className="group" asChild>
              <Link to={user ? "/dashboard" : "/register"}>
                <Sparkles className="mr-2 h-5 w-5" />
                {user ? "Continue Your Journey" : "Yes, Build My Empire"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/features">
                Show Me The Magic First
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Start in 30 seconds</span>
            </div>
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default CTASection;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <Spacing.Section>
      <Spacing.Container>
        <div className="text-center max-w-3xl mx-auto">
          <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
          
          <Typography.H2 className="mb-6">
            Ready to Transform Your Knowledge?
          </Typography.H2>
          
          <Typography.Lead className="mb-8">
            Join thousands of professionals who've revolutionized their information management. 
            Start building your knowledge sanctuary today.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" asChild>
              <Link to="/register">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Building Knowledge
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/features">
                Explore Features
              </Link>
            </Button>
          </div>
          
          <Typography.Body size="sm" className="mt-6 text-muted-foreground">
            No credit card required • 14-day free trial • Cancel anytime
          </Typography.Body>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default CTASection;

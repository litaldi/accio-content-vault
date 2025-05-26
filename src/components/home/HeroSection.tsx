
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Brain, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/10 to-background">
      <Spacing.Container>
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Knowledge Engine
          </Badge>
          
          <Typography.H1>
            Transform Knowledge into
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent"> Power</span>
          </Typography.H1>
          
          <Typography.Lead>
            The intelligent platform that captures, organizes, and transforms any content 
            into searchable knowledge. Stop losing valuable insights—start building your 
            personal knowledge sanctuary.
          </Typography.Lead>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="xl" 
              className="group" 
              asChild
              aria-label="Start building your knowledge base"
            >
              <Link to="/register">
                Start Building Knowledge
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="group" 
              asChild
              aria-label="Explore Accio features"
            >
              <Link to="/features">
                <Play className="mr-2 h-5 w-5" />
                Explore Features
              </Link>
            </Button>
          </div>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default HeroSection;

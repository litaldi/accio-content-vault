
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const FinalCTASection: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Spacing.Section sectionSize="lg" className="bg-gradient-to-br from-primary/10 to-background">
      <Spacing.Container>
        <div className="text-center py-16">
          <Brain className="h-10 w-10 mx-auto mb-6 text-primary animate-pulse" />
          <Typography.H2 className="mb-4">
            Ready to Supercharge Your Knowledge?
          </Typography.H2>
          <Typography.Lead className="max-w-3xl mx-auto mb-8">
            Join Accio today and unlock the full potential of your knowledge. 
            Start organizing, discovering, and sharing information like never before.
          </Typography.Lead>
          <Button 
            size="xl" 
            className="group"
            asChild
            aria-label={user ? "Go to your dashboard" : "Create your free account"}
          >
            <Link to={user ? "/dashboard" : "/register"}>
              {user ? "Go to Dashboard" : "Get Started Now"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default FinalCTASection;

import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import { Typography, Spacing } from '@/components/ui/design-system';

const FinalCTASection: React.FC = () => {
  return (
    <Spacing.Section size="lg" className="bg-gradient-to-br from-primary/10 to-background">
      <Spacing.Container>
        <div className="text-center py-16">
          <Rocket className="h-10 w-10 mx-auto mb-6 text-primary animate-pulse" />
          <Typography.H2 className="mb-4">
            Ready to Supercharge Your Knowledge?
          </Typography.H2>
          <Typography.Lead className="max-w-3xl mx-auto mb-8">
            Join Accio today and unlock the full potential of your knowledge. 
            Start organizing, discovering, and sharing information like never before.
          </Typography.Lead>
          <Button size="xl" className="group">
            Get Started Now
          </Button>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default FinalCTASection;

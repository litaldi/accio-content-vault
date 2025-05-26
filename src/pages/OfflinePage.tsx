
import React from 'react';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const OfflinePage: React.FC = () => {
  return (
    <Spacing.Section className="bg-background min-h-screen flex items-center justify-center">
      <Spacing.Container className="text-center">
        <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <Typography.H1 className="mb-4">You're Offline</Typography.H1>
        <Typography.Lead className="text-muted-foreground mb-8">
          Please check your internet connection and try again.
        </Typography.Lead>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default OfflinePage;

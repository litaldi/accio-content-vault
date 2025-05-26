import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Confetti } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <Spacing.Section className="bg-background min-h-screen flex items-center justify-center">
      <Spacing.Container className="text-center">
        <Confetti className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-confetti" />
        <Typography.H1 className="text-9xl font-bold mb-8">404</Typography.H1>
        <Typography.H2 className="text-3xl font-semibold mb-4">Page Not Found</Typography.H2>
        <Typography.Lead className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </Typography.Lead>
        <Button asChild size="lg" variant="outline">
          <Link to="/">Go Home</Link>
        </Button>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default NotFound;



import React from 'react';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Button } from '@/components/ui/button';
import { Brain, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfflinePage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Spacing.Section className="bg-background min-h-screen flex items-center justify-center">
      <Spacing.Container className="text-center">
        <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <Typography.H1 className="mb-4">You're Offline</Typography.H1>
        <Typography.Lead className="text-muted-foreground mb-8">
          Please check your internet connection and try again.
        </Typography.Lead>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRefresh}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            aria-label="Refresh page to try again"
          >
            Try Again
          </Button>
          <Button 
            variant="outline"
            asChild
            leftIcon={<Home className="h-4 w-4" />}
          >
            <Link to="/" aria-label="Go back to homepage">
              Go Home
            </Link>
          </Button>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default OfflinePage;

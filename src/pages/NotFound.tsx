
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typography, Spacing } from '@/components/ui/design-system';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <Spacing.Section className="bg-background min-h-screen flex items-center justify-center">
      <Spacing.Container className="text-center">
        <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <Typography.H1 className="text-9xl font-bold mb-8">404</Typography.H1>
        <Typography.H2 className="text-3xl font-semibold mb-4">Page Not Found</Typography.H2>
        <Typography.Lead className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </Typography.Lead>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            leftIcon={<Home className="h-4 w-4" />}
            aria-label="Go back to homepage"
          >
            <Link to="/">
              Go Home
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            aria-label="Go back to previous page"
          >
            Go Back
          </Button>
        </div>
      </Spacing.Container>
    </Spacing.Section>
  );
};

export default NotFound;


import React from 'react';
import { Typography } from '@/components/ui/design-system';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-8">
      <div className="container mx-auto px-4 text-center">
        <Typography.Caption className="text-muted-foreground">
          © 2024 Accio. All rights reserved.
        </Typography.Caption>
      </div>
    </footer>
  );
};

export default AppFooter;

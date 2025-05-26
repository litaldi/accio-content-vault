
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SkipToContent: React.FC = () => {
  const skipToMainContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      onClick={skipToMainContent}
      className={cn(
        "fixed top-4 left-4 z-[60] opacity-0 -translate-y-full",
        "focus:opacity-100 focus:translate-y-0 transition-all duration-200",
        "bg-primary text-primary-foreground shadow-lg",
        "text-sm px-4 py-2 font-medium"
      )}
      onFocus={() => console.log('Skip to content focused')}
      aria-label="Skip to main content"
    >
      Skip to Content
    </Button>
  );
};

export default SkipToContent;

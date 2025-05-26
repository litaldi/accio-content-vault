
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipToContentProps {
  targetId?: string;
  className?: string;
}

export const SkipToContent: React.FC<SkipToContentProps> = ({ 
  targetId = 'main-content',
  className 
}) => {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      className={cn(
        "absolute left-4 top-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium",
        "transform -translate-y-16 focus:translate-y-0 transition-transform duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      Skip to main content
    </a>
  );
};

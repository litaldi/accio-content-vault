
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'accent';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'md',
  background = 'default'
}) => {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };

  const backgroundClasses = {
    default: '',
    muted: 'bg-muted/20',
    accent: 'bg-accent/5'
  };

  return (
    <section 
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
};

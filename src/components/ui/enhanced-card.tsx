
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'interactive' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  spacing?: 'compact' | 'normal' | 'relaxed';
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  spacing = 'normal',
  ...props
}) => {
  return (
    <Card
      className={cn(
        'transition-all duration-200',
        variant === 'interactive' && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        variant === 'elevated' && 'shadow-lg border-0',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export const EnhancedCardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <CardHeader className={className}>
    {children}
  </CardHeader>
);

export const EnhancedCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <CardContent className={className}>
    {children}
  </CardContent>
);

export const EnhancedCardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <CardTitle className={className}>
    {children}
  </CardTitle>
);

export const EnhancedCardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <CardDescription className={className}>
    {children}
  </CardDescription>
);

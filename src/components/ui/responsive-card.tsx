
import React from 'react';
import { Card, type CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps extends CardProps {
  children: React.ReactNode;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

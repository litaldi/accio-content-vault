
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OptimizedCardProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  interactive?: boolean;
  hover?: boolean;
}

export const OptimizedCard: React.FC<OptimizedCardProps> = ({
  children,
  className,
  elevated = false,
  interactive = false,
  hover = false,
  ...props
}) => {
  return (
    <Card
      className={cn(
        'transition-all duration-200',
        elevated && 'shadow-lg',
        interactive && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        hover && 'hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export default OptimizedCard;

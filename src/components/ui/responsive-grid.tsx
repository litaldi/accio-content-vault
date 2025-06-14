
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getGridClasses = (cols: ResponsiveGridProps['cols']) => {
  const classes = [];
  
  if (cols?.default) classes.push(`grid-cols-${cols.default}`);
  if (cols?.sm) classes.push(`sm:grid-cols-${cols.sm}`);
  if (cols?.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols?.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  if (cols?.xl) classes.push(`xl:grid-cols-${cols.xl}`);
  
  return classes.join(' ');
};

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8'
};

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { default: 1 },
  gap = 'md',
  className
}) => {
  return (
    <div className={cn(
      'grid',
      getGridClasses(cols),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

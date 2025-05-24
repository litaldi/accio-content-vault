
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const getGridCols = (cols: ResponsiveGridProps['cols']) => {
  const classes = [];
  
  if (cols?.default) classes.push(`grid-cols-${cols.default}`);
  if (cols?.sm) classes.push(`sm:grid-cols-${cols.sm}`);
  if (cols?.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols?.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  if (cols?.xl) classes.push(`xl:grid-cols-${cols.xl}`);
  
  return classes.join(' ');
};

const gapClasses = {
  sm: 'gap-2 sm:gap-3',
  md: 'gap-3 sm:gap-4 md:gap-6',
  lg: 'gap-4 sm:gap-6 md:gap-8',
  xl: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12'
};

/**
 * Responsive grid component that adapts to different screen sizes
 * with fluid column layouts and consistent spacing
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md'
}) => {
  return (
    <div className={cn(
      'grid w-full',
      getGridCols(cols),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;

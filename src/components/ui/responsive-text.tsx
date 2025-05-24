
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const textVariants = {
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight',
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl font-semibold',
  h5: 'text-sm sm:text-base md:text-lg font-medium',
  h6: 'text-xs sm:text-sm md:text-base font-medium',
  body: 'text-sm sm:text-base leading-relaxed',
  caption: 'text-xs sm:text-sm text-muted-foreground',
  label: 'text-xs sm:text-sm font-medium'
};

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  caption: 'span',
  label: 'label'
} as const;

/**
 * Responsive text component that scales appropriately across screen sizes
 * while maintaining proper semantic HTML structure and accessibility
 */
export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  className = '',
  as
}) => {
  const Component = (as || defaultElements[variant]) as keyof JSX.IntrinsicElements;
  
  return React.createElement(
    Component,
    {
      className: cn(textVariants[variant], className)
    },
    children
  );
};

export default ResponsiveText;

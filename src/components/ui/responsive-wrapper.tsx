
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  center?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2 sm:px-6 sm:py-3',
  md: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8',
  lg: 'px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12',
  xl: 'px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16',
  '2xl': 'px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20'
};

/**
 * A flexible responsive wrapper component that provides consistent
 * spacing, max-widths, and centering across all screen sizes
 */
export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md',
  center = true,
  as: Component = 'div'
}) => {
  return (
    <Component 
      className={cn(
        'w-full',
        center && 'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveWrapper;

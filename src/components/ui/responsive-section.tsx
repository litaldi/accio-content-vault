
import React from 'react';
import { cn } from '@/lib/utils';
import { ResponsiveLayout } from './responsive-layout';

interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'default' | 'muted' | 'accent' | 'primary';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  id?: string;
  as?: keyof JSX.IntrinsicElements;
}

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  accent: 'bg-accent/20',
  primary: 'bg-primary/5'
};

/**
 * Enhanced responsive section component that wraps content with
 * proper spacing, backgrounds, and responsive behavior
 */
export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  background = 'default',
  spacing = 'lg',
  maxWidth = 'xl',
  id,
  as: Component = 'section'
}) => {
  return (
    <Component 
      id={id}
      className={cn(
        'w-full relative',
        backgroundClasses[background],
        className
      )}
    >
      <ResponsiveLayout 
        maxWidth={maxWidth}
        verticalSpacing={spacing}
        className={containerClassName}
      >
        {children}
      </ResponsiveLayout>
    </Component>
  );
};

export default ResponsiveSection;

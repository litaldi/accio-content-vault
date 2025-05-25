
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = {
  // Page Headings
  H1: ({ children, className, as: Component = 'h1' }: TypographyProps) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <Component
        className={cn(
          'scroll-m-20 font-extrabold tracking-tight',
          isMobile 
            ? 'text-3xl sm:text-4xl' 
            : 'text-4xl lg:text-5xl xl:text-6xl',
          'mb-6 lg:mb-8',
          className
        )}
      >
        {children}
      </Component>
    );
  },

  H2: ({ children, className, as: Component = 'h2' }: TypographyProps) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <Component
        className={cn(
          'scroll-m-20 font-bold tracking-tight',
          isMobile 
            ? 'text-2xl sm:text-3xl' 
            : 'text-3xl lg:text-4xl',
          'mb-4 lg:mb-6',
          className
        )}
      >
        {children}
      </Component>
    );
  },

  H3: ({ children, className, as: Component = 'h3' }: TypographyProps) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <Component
        className={cn(
          'scroll-m-20 font-semibold tracking-tight',
          isMobile 
            ? 'text-xl sm:text-2xl' 
            : 'text-2xl lg:text-3xl',
          'mb-3 lg:mb-4',
          className
        )}
      >
        {children}
      </Component>
    );
  },

  H4: ({ children, className, as: Component = 'h4' }: TypographyProps) => (
    <Component
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight mb-3',
        className
      )}
    >
      {children}
    </Component>
  ),

  // Body Text
  Lead: ({ children, className, as: Component = 'p' }: TypographyProps) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <Component
        className={cn(
          'font-medium leading-relaxed text-muted-foreground',
          isMobile ? 'text-lg' : 'text-xl lg:text-2xl',
          'mb-6',
          className
        )}
      >
        {children}
      </Component>
    );
  },

  Body: ({ children, className, as: Component = 'p' }: TypographyProps) => (
    <Component
      className={cn(
        'leading-7 text-foreground mb-4',
        '[&:not(:first-child)]:mt-6',
        className
      )}
    >
      {children}
    </Component>
  ),

  Small: ({ children, className, as: Component = 'p' }: TypographyProps) => (
    <Component
      className={cn(
        'text-sm text-muted-foreground leading-relaxed',
        className
      )}
    >
      {children}
    </Component>
  ),

  // Special Elements
  Code: ({ children, className, as: Component = 'code' }: TypographyProps) => (
    <Component
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </Component>
  ),

  Quote: ({ children, className, as: Component = 'blockquote' }: TypographyProps) => (
    <Component
      className={cn(
        'mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground',
        className
      )}
    >
      {children}
    </Component>
  ),
};

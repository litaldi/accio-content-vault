
import React from 'react';
import { cn } from '@/lib/utils';

// Typography Components
export const Typography = {
  H1: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1
        ref={ref}
        className={cn(
          "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight",
          className
        )}
        {...props}
      />
    )
  ),
  
  H2: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h2
        ref={ref}
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
          className
        )}
        {...props}
      />
    )
  ),
  
  H3: React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h3
        ref={ref}
        className={cn(
          "text-2xl sm:text-3xl font-bold leading-tight",
          className
        )}
        {...props}
      />
    )
  ),
  
  Body: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & {
    size?: 'sm' | 'md' | 'lg'
  }>(({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg sm:text-xl'
    };
    
    return (
      <p
        ref={ref}
        className={cn(
          'leading-relaxed mb-4',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }),
  
  Caption: React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p
        ref={ref}
        className={cn(
          "text-sm text-muted-foreground",
          className
        )}
        {...props}
      />
    )
  )
};

// Spacing Components
export const Spacing = {
  Section: React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & {
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(({ className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-20 lg:py-24',
      xl: 'py-24 lg:py-32'
    };
    
    return (
      <section
        ref={ref}
        className={cn(
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }),
  
  Container: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(({ className, size = 'lg', ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-4xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-8xl'
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  })
};

// Interactive Styles
export const interactiveStyles = "transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0";
export const focusStyles = "focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none";


import React from 'react';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Typography System
export const Typography = {
  H1: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props}>
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  ),
  H4: ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  ),
  P: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props}>
      {children}
    </p>
  ),
  Body: ({ children, className, size, ...props }: HTMLAttributes<HTMLParagraphElement> & { size?: 'xs' | 'sm' | 'base' | 'lg' }) => {
    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm', 
      base: 'text-base',
      lg: 'text-lg'
    };
    
    return (
      <p className={cn("leading-7", size ? sizeClasses[size] : 'text-base', className)} {...props}>
        {children}
      </p>
    );
  },
  Lead: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
  Large: ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  ),
  Small: ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => (
    <small className={cn("text-sm font-medium leading-none", className)} {...props}>
      {children}
    </small>
  ),
  Muted: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
  Caption: ({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
};

// Spacing System
export const Spacing = {
  Container: ({ children, className, size = 'default', ...props }: HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'default' | 'lg' | 'xl' | 'full' }) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      default: 'max-w-7xl',
      lg: 'max-w-7xl',
      xl: 'max-w-none',
      full: 'max-w-none'
    };
    
    return (
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)} {...props}>
        {children}
      </div>
    );
  },
  Section: ({ children, className, size = 'md', ...props }: HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
    const sizeClasses = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24'
    };
    
    return (
      <section className={cn(sizeClasses[size], className)} {...props}>
        {children}
      </section>
    );
  },
  Stack: ({ children, className, gap = 'md', ...props }: HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg' }) => {
    const gapClasses = {
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6'
    };
    
    return (
      <div className={cn('flex flex-col', gapClasses[gap], className)} {...props}>
        {children}
      </div>
    );
  },
};

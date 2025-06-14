
import React from 'react';
import { cn } from '@/lib/utils';

// Unified Design System - Single Source of Truth
export const UnifiedDesign = {
  // Typography
  Typography: {
    H1: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h1 className={cn('text-4xl md:text-6xl font-bold tracking-tight text-foreground', className)} {...props}>
        {children}
      </h1>
    ),
    H2: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h2 className={cn('text-3xl md:text-4xl font-semibold tracking-tight text-foreground', className)} {...props}>
        {children}
      </h2>
    ),
    H3: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h3 className={cn('text-2xl md:text-3xl font-semibold text-foreground', className)} {...props}>
        {children}
      </h3>
    ),
    Lead: ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
      <p className={cn('text-xl leading-7 text-muted-foreground', className)} {...props}>
        {children}
      </p>
    ),
    Body: ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
      <p className={cn('leading-7 text-muted-foreground', className)} {...props}>
        {children}
      </p>
    )
  },

  // Layout
  Layout: {
    Section: ({ children, className, ...props }: React.HTMLProps<HTMLElement>) => (
      <section className={cn('py-12 sm:py-16 lg:py-20', className)} {...props}>
        {children}
      </section>
    ),
    Container: ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props}>
        {children}
      </div>
    ),
    Grid: ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
      <div className={cn('grid gap-6 md:gap-8', className)} {...props}>
        {children}
      </div>
    )
  },

  // Components
  Card: ({ children, className, hover = false, ...props }: React.HTMLProps<HTMLDivElement> & { hover?: boolean }) => (
    <div 
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
        hover && 'hover:shadow-md hover:-translate-y-0.5',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
};

export default UnifiedDesign;

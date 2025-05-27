
import React from 'react';
import { cn } from '@/lib/utils';

// Design System Foundation
export const DesignTokens = {
  // Typography Scale
  typography: {
    h1: 'text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight',
    h2: 'text-3xl lg:text-4xl font-bold tracking-tight',
    h3: 'text-2xl lg:text-3xl font-semibold tracking-tight',
    h4: 'text-xl lg:text-2xl font-semibold',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
    lead: 'text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed',
    body: 'text-base leading-relaxed',
    bodySmall: 'text-sm leading-relaxed',
    caption: 'text-xs text-muted-foreground',
    code: 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded'
  },
  
  // Spacing Scale
  spacing: {
    section: 'py-16 lg:py-24',
    container: 'px-4 sm:px-6 lg:px-8',
    element: 'space-y-6',
    tight: 'space-y-3',
    loose: 'space-y-8'
  },
  
  // Color Intentions
  colors: {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-destructive text-destructive-foreground',
    info: 'bg-blue-500 text-white'
  },
  
  // Interactive States
  interactions: {
    button: 'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    hover: 'hover:scale-[1.02] hover:shadow-lg transition-all duration-200',
    card: 'border border-border bg-card text-card-foreground rounded-xl shadow-sm hover:shadow-md transition-all duration-200'
  }
};

// Typography Components
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn(DesignTokens.typography.h1, 'mb-6', className)} {...props}>
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn(DesignTokens.typography.h2, 'mb-4', className)} {...props}>
      {children}
    </h2>
  ),
  
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn(DesignTokens.typography.h3, 'mb-3', className)} {...props}>
      {children}
    </h3>
  ),
  
  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn(DesignTokens.typography.lead, 'mb-6', className)} {...props}>
      {children}
    </p>
  ),
  
  Body: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn(DesignTokens.typography.body, 'mb-4', className)} {...props}>
      {children}
    </p>
  ),
  
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn(DesignTokens.typography.caption, className)} {...props}>
      {children}
    </p>
  )
};

// Layout Components
export const Layout = {
  Section: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <section className={cn(DesignTokens.spacing.section, className)} {...props}>
      {children}
    </section>
  ),
  
  Container: ({ children, className, maxWidth = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { maxWidth?: 'sm' | 'default' | 'lg' | 'xl' | 'full' }) => {
    const maxWidthClasses = {
      sm: 'max-w-3xl',
      default: 'max-w-7xl',
      lg: 'max-w-7xl',
      xl: 'max-w-none',
      full: 'w-full'
    };
    
    return (
      <div className={cn('mx-auto', DesignTokens.spacing.container, maxWidthClasses[maxWidth], className)} {...props}>
        {children}
      </div>
    );
  },
  
  Grid: ({ children, className, cols = 'responsive', gap = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { cols?: 'responsive' | '2' | '3' | '4'; gap?: 'sm' | 'default' | 'lg' }) => {
    const colClasses = {
      responsive: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };
    
    const gapClasses = {
      sm: 'gap-4',
      default: 'gap-6',
      lg: 'gap-8'
    };
    
    return (
      <div className={cn('grid', colClasses[cols], gapClasses[gap], className)} {...props}>
        {children}
      </div>
    );
  }
};

// Card Component with improved design
export const Card = ({ children, className, interactive = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) => (
  <div 
    className={cn(
      DesignTokens.interactions.card,
      interactive && DesignTokens.interactions.hover,
      'p-6',
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

export default DesignTokens;


import React from 'react';
import { cn } from '@/lib/utils';

// Clean Design System - Lemonade Inspired
export const CleanDesignTokens = {
  // Single Dominant Color System
  colors: {
    primary: 'hsl(250 84% 60%)', // Purple as the dominant color
    primaryForeground: 'hsl(0 0% 100%)',
    // Neutral palette
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 3.9%)',
    muted: 'hsl(240 4.8% 95.9%)',
    mutedForeground: 'hsl(240 3.8% 46.1%)',
    border: 'hsl(240 5.9% 90%)',
    // Minimal accent colors
    success: 'hsl(142 76% 36%)',
    error: 'hsl(0 84% 60%)',
    warning: 'hsl(38 92% 50%)',
  },
  
  // Clean Typography
  typography: {
    heading: 'font-semibold tracking-tight text-foreground',
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
    h2: 'text-2xl md:text-3xl font-semibold tracking-tight',
    h3: 'text-xl md:text-2xl font-semibold tracking-tight',
    h4: 'text-lg md:text-xl font-medium',
    body: 'text-base leading-relaxed text-foreground',
    bodyLarge: 'text-lg leading-relaxed text-foreground',
    bodySmall: 'text-sm leading-relaxed text-muted-foreground',
    caption: 'text-xs text-muted-foreground',
  },
  
  // Spacious Layout
  spacing: {
    section: 'py-16 md:py-20 lg:py-24',
    container: 'max-w-7xl mx-auto px-6 lg:px-8',
    grid: 'grid gap-8 md:gap-12',
    stack: 'space-y-6',
    stackTight: 'space-y-4',
    stackLoose: 'space-y-8',
  },
  
  // Rounded, Friendly Elements
  roundness: {
    button: 'rounded-lg',
    card: 'rounded-xl',
    input: 'rounded-lg',
    avatar: 'rounded-full',
  },
  
  // Minimal Shadows
  elevation: {
    card: 'shadow-sm border border-border/50',
    button: 'shadow-sm hover:shadow-md',
    floating: 'shadow-lg border border-border/20',
  },
  
  // Clean Interactions
  interactions: {
    button: 'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
    card: 'transition-all duration-200 hover:shadow-md hover:border-primary/20',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  }
};

// Clean Typography Components
export const CleanTypography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn(CleanDesignTokens.typography.h1, 'mb-6', className)} {...props}>
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn(CleanDesignTokens.typography.h2, 'mb-4', className)} {...props}>
      {children}
    </h2>
  ),
  
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn(CleanDesignTokens.typography.h3, 'mb-3', className)} {...props}>
      {children}
    </h3>
  ),
  
  Body: ({ children, className, large, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { large?: boolean }) => (
    <p className={cn(
      large ? CleanDesignTokens.typography.bodyLarge : CleanDesignTokens.typography.body, 
      'mb-4', 
      className
    )} {...props}>
      {children}
    </p>
  ),
  
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn(CleanDesignTokens.typography.caption, className)} {...props}>
      {children}
    </p>
  ),
};

// Clean Layout Components
export const CleanLayout = {
  Section: ({ 
    children, 
    className, 
    ...props 
  }: React.HTMLAttributes<HTMLElement>) => (
    <section className={cn(CleanDesignTokens.spacing.section, className)} {...props}>
      {children}
    </section>
  ),
  
  Container: ({ 
    children, 
    className, 
    ...props 
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn(CleanDesignTokens.spacing.container, className)} {...props}>
      {children}
    </div>
  ),
  
  Grid: ({ 
    children, 
    className, 
    cols = 'auto',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { cols?: 'auto' | '2' | '3' | '4' }) => {
    const gridCols = {
      auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };
    
    return (
      <div className={cn(CleanDesignTokens.spacing.grid, gridCols[cols], className)} {...props}>
        {children}
      </div>
    );
  },
  
  Stack: ({ 
    children, 
    className, 
    spacing = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { spacing?: 'tight' | 'default' | 'loose' }) => {
    const spacingClass = {
      tight: CleanDesignTokens.spacing.stackTight,
      default: CleanDesignTokens.spacing.stack,
      loose: CleanDesignTokens.spacing.stackLoose
    };
    
    return (
      <div className={cn('flex flex-col', spacingClass[spacing], className)} {...props}>
        {children}
      </div>
    );
  }
};

// Clean Card Component
export const CleanCard = ({ 
  children, 
  className, 
  interactive = false, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) => (
  <div 
    className={cn(
      'bg-background p-6',
      CleanDesignTokens.roundness.card,
      CleanDesignTokens.elevation.card,
      interactive && CleanDesignTokens.interactions.card,
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

export default CleanDesignTokens;

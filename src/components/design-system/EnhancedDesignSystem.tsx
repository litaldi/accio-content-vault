
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced Design Tokens
export const DesignTokens = {
  // Typography Scale with improved hierarchy
  typography: {
    // Display text for hero sections
    display: 'text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.9]',
    // Page headings
    h1: 'text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight',
    h2: 'text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight leading-tight',
    h3: 'text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tight leading-snug',
    h4: 'text-lg lg:text-xl font-semibold tracking-tight leading-snug',
    h5: 'text-base lg:text-lg font-semibold leading-normal',
    h6: 'text-sm lg:text-base font-semibold leading-normal',
    // Body text
    lead: 'text-lg lg:text-xl text-muted-foreground font-medium leading-relaxed',
    body: 'text-base leading-relaxed',
    bodySmall: 'text-sm leading-relaxed',
    caption: 'text-xs text-muted-foreground leading-normal',
    // Interactive elements
    buttonLarge: 'text-base lg:text-lg font-semibold',
    buttonDefault: 'text-sm font-medium',
    buttonSmall: 'text-xs font-medium',
  },
  
  // Enhanced Spacing Scale
  spacing: {
    // Section spacing
    sectionPadding: 'py-12 lg:py-16 xl:py-20',
    sectionPaddingLarge: 'py-16 lg:py-20 xl:py-24',
    // Container spacing
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    containerMaxWidth: 'max-w-7xl mx-auto',
    // Element spacing
    stackTight: 'space-y-2',
    stackDefault: 'space-y-4',
    stackLoose: 'space-y-6',
    stackExtraLoose: 'space-y-8',
    // Grid gaps
    gridTight: 'gap-4',
    gridDefault: 'gap-6',
    gridLoose: 'gap-8',
  },
  
  // Enhanced Color Intentions
  colors: {
    // Status colors with better semantic meaning
    success: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    error: 'text-red-600 bg-red-50 border-red-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
    // Interactive states
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  },
  
  // Enhanced Interactive States
  interactions: {
    // Focus states for accessibility
    focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    // Hover effects
    hoverScale: 'hover:scale-[1.02] transition-transform duration-200',
    hoverLift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200',
    // Press effects
    activeScale: 'active:scale-[0.98] transition-transform duration-100',
    // Card interactions
    cardHover: 'hover:shadow-lg hover:border-primary/20 transition-all duration-200',
  },
  
  // Component sizing for better touch targets
  sizing: {
    touchTarget: 'min-h-[44px] min-w-[44px]', // WCAG AA minimum
    buttonSmall: 'h-8 px-3 text-xs',
    buttonDefault: 'h-10 px-4 py-2 text-sm',
    buttonLarge: 'h-12 px-6 py-3 text-base',
    buttonXLarge: 'h-14 px-8 py-4 text-lg',
    inputDefault: 'h-10 px-3 py-2',
    inputLarge: 'h-12 px-4 py-3',
  }
};

// Enhanced Typography Components with better accessibility
export const Typography = {
  Display: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn(DesignTokens.typography.display, 'mb-6 lg:mb-8', className)} {...props}>
      {children}
    </h1>
  ),
  
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn(DesignTokens.typography.h1, 'mb-4 lg:mb-6', className)} {...props}>
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn(DesignTokens.typography.h2, 'mb-3 lg:mb-4', className)} {...props}>
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
  ),
};

// Enhanced Layout Components
export const Layout = {
  Section: ({ 
    children, 
    className, 
    size = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLElement> & { size?: 'default' | 'large' }) => {
    const sizeClass = size === 'large' 
      ? DesignTokens.spacing.sectionPaddingLarge 
      : DesignTokens.spacing.sectionPadding;
    
    return (
      <section className={cn(sizeClass, className)} {...props}>
        {children}
      </section>
    );
  },
  
  Container: ({ 
    children, 
    className, 
    ...props 
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn(
        DesignTokens.spacing.containerMaxWidth,
        DesignTokens.spacing.containerPadding,
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Grid: ({ 
    children, 
    className, 
    cols = 'responsive',
    gap = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { 
    cols?: 'responsive' | '2' | '3' | '4'; 
    gap?: 'tight' | 'default' | 'loose' 
  }) => {
    const colClasses = {
      responsive: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };
    
    const gapClasses = {
      tight: DesignTokens.spacing.gridTight,
      default: DesignTokens.spacing.gridDefault,
      loose: DesignTokens.spacing.gridLoose
    };
    
    return (
      <div 
        className={cn('grid', colClasses[cols], gapClasses[gap], className)} 
        {...props}
      >
        {children}
      </div>
    );
  },
  
  Stack: ({ 
    children, 
    className, 
    spacing = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { 
    spacing?: 'tight' | 'default' | 'loose' | 'extraLoose' 
  }) => {
    const spacingClasses = {
      tight: DesignTokens.spacing.stackTight,
      default: DesignTokens.spacing.stackDefault,
      loose: DesignTokens.spacing.stackLoose,
      extraLoose: DesignTokens.spacing.stackExtraLoose
    };
    
    return (
      <div className={cn('flex flex-col', spacingClasses[spacing], className)} {...props}>
        {children}
      </div>
    );
  }
};

export default DesignTokens;

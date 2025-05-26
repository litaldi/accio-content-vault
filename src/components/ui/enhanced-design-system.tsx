
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced Typography System with better visual hierarchy
export const EnhancedTypography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
        "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent",
        "mb-6",
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={cn(
        "text-3xl sm:text-4xl font-bold leading-tight tracking-tight",
        "text-foreground mb-4",
        className
      )} 
      {...props}
    >
      {children}
    </h2>
  ),
  
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn(
        "text-2xl sm:text-3xl font-semibold leading-tight",
        "text-foreground mb-3",
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  ),
  
  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "text-lg sm:text-xl leading-relaxed text-muted-foreground",
        "max-w-3xl mb-8",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Body: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "text-base leading-relaxed text-muted-foreground mb-4",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
};

// Enhanced Container System with better spacing
export const EnhancedLayout = {
  Section: ({ children, className, variant = 'default', ...props }: React.HTMLAttributes<HTMLElement> & { variant?: 'default' | 'accent' | 'primary' }) => (
    <section 
      className={cn(
        "py-16 lg:py-24",
        variant === 'accent' && "bg-muted/30",
        variant === 'primary' && "bg-gradient-to-br from-primary/5 via-background to-background",
        className
      )} 
      {...props}
    >
      {children}
    </section>
  ),
  
  Container: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'default' | 'lg' | 'full' }) => (
    <div 
      className={cn(
        "container mx-auto px-6 lg:px-8",
        size === 'sm' && "max-w-4xl",
        size === 'default' && "max-w-6xl",
        size === 'lg' && "max-w-7xl",
        size === 'full' && "max-w-none",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Grid: ({ children, className, cols = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { cols?: 'default' | 'two' | 'three' | 'four' | 'auto' }) => (
    <div 
      className={cn(
        "grid gap-8",
        cols === 'default' && "grid-cols-1",
        cols === 'two' && "grid-cols-1 md:grid-cols-2",
        cols === 'three' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        cols === 'four' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        cols === 'auto' && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
};

// Enhanced Card Variants with modern shadows and borders
export const EnhancedCard = {
  Default: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn(
        "bg-card text-card-foreground rounded-xl border border-border/50",
        "shadow-sm hover:shadow-md transition-all duration-300",
        "p-6",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Interactive: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn(
        "bg-card text-card-foreground rounded-xl border border-border/50",
        "shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
        "transition-all duration-300 cursor-pointer group",
        "p-6",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Feature: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn(
        "bg-gradient-to-br from-card to-card/80 text-card-foreground",
        "rounded-xl border border-border/50 backdrop-blur-sm",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "p-8",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
};

// Enhanced Button System with better visual feedback
export const EnhancedButton = {
  Primary: ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "px-8 py-3 rounded-lg font-semibold text-sm",
        "bg-primary text-primary-foreground",
        "shadow-lg hover:shadow-xl hover:scale-105",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        className
      )} 
      {...props}
    >
      {children}
    </button>
  ),
  
  Secondary: ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "px-8 py-3 rounded-lg font-semibold text-sm",
        "bg-secondary text-secondary-foreground border border-border",
        "shadow-sm hover:shadow-md hover:bg-secondary/80",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        className
      )} 
      {...props}
    >
      {children}
    </button>
  ),
  
  Ghost: ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "px-6 py-2 rounded-lg font-medium text-sm",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-accent/50 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className
      )} 
      {...props}
    >
      {children}
    </button>
  ),
};

// Enhanced Spacing Utilities
export const spacing = {
  section: "py-16 lg:py-24",
  sectionSm: "py-12 lg:py-16",
  sectionLg: "py-20 lg:py-32",
  container: "px-6 lg:px-8",
  grid: "gap-8",
  gridSm: "gap-4",
  gridLg: "gap-12",
};

// Enhanced Focus Styles
export const focusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Enhanced Animation Classes
export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scaleIn: "animate-scale-in",
  hoverLift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
  hoverScale: "hover:scale-105 transition-transform duration-200",
  hoverGlow: "hover:shadow-lg hover:shadow-primary/20 transition-all duration-300",
};

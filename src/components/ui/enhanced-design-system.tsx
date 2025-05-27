
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced Typography System with better hierarchy and accessibility
export const Typography = {
  Hero: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight",
        "text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
        "text-balance",
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
        "text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight",
        "text-balance",
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
        "text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight",
        "text-balance",
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  ),
  
  H4: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className={cn(
        "text-lg sm:text-xl font-semibold leading-tight",
        className
      )} 
      {...props}
    >
      {children}
    </h4>
  ),
  
  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "text-lg sm:text-xl lg:text-2xl leading-relaxed text-muted-foreground max-w-4xl",
        "text-pretty",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Body: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLParagraphElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <p 
      className={cn(
        "leading-relaxed text-muted-foreground",
        "text-pretty",
        size === 'sm' && "text-sm",
        size === 'default' && "text-base",
        size === 'lg' && "text-lg",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span 
      className={cn(
        "text-sm text-muted-foreground/80 leading-relaxed",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  ),
};

// Enhanced Layout System with better responsive behavior
export const Layout = {
  Section: ({ children, className, size = 'default', background = 'default', ...props }: 
    React.HTMLAttributes<HTMLElement> & { 
      size?: 'sm' | 'default' | 'lg' | 'xl'
      background?: 'default' | 'muted' | 'accent'
    }) => (
    <section 
      className={cn(
        "relative",
        size === 'sm' && "py-12 sm:py-16",
        size === 'default' && "py-16 sm:py-20 lg:py-24",
        size === 'lg' && "py-20 sm:py-24 lg:py-32",
        size === 'xl' && "py-24 sm:py-32 lg:py-40",
        background === 'muted' && "bg-muted/30",
        background === 'accent' && "bg-gradient-to-b from-background to-muted/20",
        className
      )} 
      {...props}
    >
      {children}
    </section>
  ),
  
  Container: ({ children, className, size = 'default', ...props }: 
    React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'default' | 'lg' | 'xl' | 'full' }) => (
    <div 
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        size === 'sm' && "max-w-3xl",
        size === 'default' && "max-w-6xl",
        size === 'lg' && "max-w-7xl",
        size === 'xl' && "max-w-none",
        size === 'full' && "max-w-full px-0",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Grid: ({ children, className, cols = 'responsive', gap = 'default', ...props }: 
    React.HTMLAttributes<HTMLDivElement> & { 
      cols?: 'responsive' | '1' | '2' | '3' | '4' | '6'
      gap?: 'sm' | 'default' | 'lg'
    }) => (
    <div 
      className={cn(
        "grid",
        cols === 'responsive' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        cols === '1' && "grid-cols-1",
        cols === '2' && "grid-cols-1 md:grid-cols-2",
        cols === '3' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        cols === '4' && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        cols === '6' && "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        gap === 'sm' && "gap-4",
        gap === 'default' && "gap-6 lg:gap-8",
        gap === 'lg' && "gap-8 lg:gap-12",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
};

// Enhanced Interactive Components with better feedback
export const Interactive = {
  Card: ({ children, className, variant = 'default', interactive = false, ...props }: 
    React.HTMLAttributes<HTMLDivElement> & { 
      variant?: 'default' | 'elevated' | 'glass'
      interactive?: boolean
    }) => (
    <div 
      className={cn(
        "rounded-xl border transition-all duration-300",
        variant === 'default' && "bg-card border-border shadow-sm",
        variant === 'elevated' && "bg-card border-border shadow-lg",
        variant === 'glass' && "bg-card/80 backdrop-blur-sm border-border/50 shadow-xl",
        interactive && "hover:shadow-xl hover:scale-[1.02] hover:border-primary/20 cursor-pointer group",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Badge: ({ children, className, variant = 'default', ...props }: 
    React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'success' | 'warning' | 'info' }) => (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
        variant === 'default' && "bg-muted text-muted-foreground",
        variant === 'success' && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        variant === 'warning' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        variant === 'info' && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  ),
};

// Enhanced Animation System
export const animations = {
  // Entrance animations
  fadeIn: "animate-in fade-in duration-500",
  slideUp: "animate-in slide-in-from-bottom-4 duration-500",
  slideDown: "animate-in slide-in-from-top-4 duration-500",
  slideLeft: "animate-in slide-in-from-right-4 duration-500",
  slideRight: "animate-in slide-in-from-left-4 duration-500",
  scaleIn: "animate-in zoom-in-95 duration-300",
  
  // Hover effects
  hoverLift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
  hoverScale: "hover:scale-105 transition-transform duration-200",
  hoverGlow: "hover:shadow-lg hover:shadow-primary/25 transition-all duration-300",
  
  // Stagger effects
  stagger: "animate-in fade-in slide-in-from-bottom-4 duration-700",
};

// Focus and accessibility utilities
export const accessibility = {
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  skipLink: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md",
  visuallyHidden: "sr-only",
};

// Responsive utilities
export const responsive = {
  hideOnMobile: "hidden sm:block",
  hideOnDesktop: "block sm:hidden",
  mobileGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  touchTarget: "min-h-[44px] min-w-[44px]",
  responsiveText: "text-sm sm:text-base lg:text-lg",
  responsivePadding: "px-4 sm:px-6 lg:px-8",
};

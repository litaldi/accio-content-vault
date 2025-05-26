
import React from 'react';
import { cn } from '@/lib/utils';

// Enhanced Typography System with better accessibility
export const UnifiedTypography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
        "text-balance", // Better text wrapping
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
        "text-2xl sm:text-3xl font-semibold leading-tight tracking-tight",
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
        "text-xl sm:text-2xl font-semibold leading-tight",
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
        "text-lg sm:text-xl leading-relaxed text-muted-foreground",
        "text-pretty", // Better text flow
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
        "text-sm text-muted-foreground leading-relaxed",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  ),
};

// Enhanced Spacing System with better responsive behavior
export const UnifiedSpacing = {
  Section: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLElement> & { size?: 'sm' | 'default' | 'lg' | 'xl' }) => (
    <section 
      className={cn(
        size === 'sm' && "py-8 sm:py-12",
        size === 'default' && "py-12 sm:py-16 lg:py-20",
        size === 'lg' && "py-16 sm:py-20 lg:py-32",
        size === 'xl' && "py-20 sm:py-32 lg:py-40",
        className
      )} 
      {...props}
    >
      {children}
    </section>
  ),
  
  Container: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'default' | 'lg' | 'xl' | 'full' }) => (
    <div 
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        size === 'sm' && "max-w-2xl",
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
};

// Enhanced Focus and Interactive Styles with better accessibility
export const unifiedFocusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const unifiedInteractiveStyles = "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:scale-[1.02]";

// Enhanced Card Variants with better visual hierarchy
export const unifiedCardVariants = {
  default: "bg-card text-card-foreground border border-border rounded-xl shadow-sm",
  elevated: "bg-card text-card-foreground border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300",
  interactive: "bg-card text-card-foreground border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer group",
  glass: "bg-card/80 backdrop-blur-sm text-card-foreground border border-border/50 rounded-xl shadow-lg",
};

// Button Variants with enhanced accessibility
export const unifiedButtonVariants = {
  primary: cn(
    "bg-primary text-primary-foreground hover:bg-primary/90",
    "shadow-md hover:shadow-lg",
    "font-medium rounded-lg transition-all duration-200",
    unifiedFocusStyles
  ),
  secondary: cn(
    "bg-secondary text-secondary-foreground hover:bg-secondary/80", 
    "border border-border hover:border-primary/20",
    "font-medium rounded-lg transition-all duration-200",
    unifiedFocusStyles
  ),
  outline: cn(
    "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
    "font-medium rounded-lg transition-all duration-200",
    unifiedFocusStyles
  ),
  ghost: cn(
    "hover:bg-accent hover:text-accent-foreground",
    "font-medium rounded-lg transition-all duration-200",
    unifiedFocusStyles
  ),
  gradient: cn(
    "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
    "text-primary-foreground shadow-lg hover:shadow-xl",
    "font-medium rounded-lg transition-all duration-200",
    unifiedFocusStyles
  )
};

// Unified Animation Classes
export const unifiedAnimations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scaleIn: "animate-scale-in",
  slideInRight: "animate-slide-in-right",
  bounce: "animate-bounce",
  pulse: "animate-pulse",
  // Hover animations
  hoverLift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
  hoverScale: "hover:scale-105 transition-transform duration-200",
  hoverGlow: "hover:shadow-lg hover:shadow-primary/20 transition-all duration-300",
};

// RTL Support utilities
export const rtlSupport = {
  flexReverse: "rtl:flex-row-reverse",
  textAlign: "ltr:text-left rtl:text-right",
  marginLeft: "ltr:ml-auto rtl:mr-auto",
  marginRight: "ltr:mr-auto rtl:ml-auto",
  paddingLeft: "ltr:pl-4 rtl:pr-4",
  paddingRight: "ltr:pr-4 rtl:pl-4",
};

// Responsive breakpoint utilities
export const responsiveUtils = {
  hideOnMobile: "hidden sm:block",
  hideOnDesktop: "block sm:hidden", 
  mobileOnly: "sm:hidden",
  tabletUp: "hidden md:block",
  desktopUp: "hidden lg:block",
  mobileGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  responsiveText: "text-sm sm:text-base lg:text-lg",
  responsivePadding: "px-4 sm:px-6 lg:px-8",
};

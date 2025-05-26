
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

// Typography System with proper hierarchy
export const UnifiedTypography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <h1 
        className={cn(
          "scroll-m-20 font-extrabold tracking-tight text-balance",
          isMobile ? "text-3xl sm:text-4xl" : "text-4xl lg:text-5xl xl:text-6xl",
          "mb-6 lg:mb-8 leading-tight",
          className
        )} 
        {...props}
      >
        {children}
      </h1>
    );
  },

  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <h2 
        className={cn(
          "scroll-m-20 font-bold tracking-tight text-balance",
          isMobile ? "text-2xl sm:text-3xl" : "text-3xl lg:text-4xl",
          "mb-4 lg:mb-6 leading-tight",
          className
        )} 
        {...props}
      >
        {children}
      </h2>
    );
  },

  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <h3 
        className={cn(
          "scroll-m-20 font-semibold tracking-tight text-balance",
          isMobile ? "text-xl sm:text-2xl" : "text-2xl lg:text-3xl",
          "mb-3 lg:mb-4 leading-tight",
          className
        )} 
        {...props}
      >
        {children}
      </h3>
    );
  },

  Body: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLParagraphElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <p 
      className={cn(
        "leading-relaxed text-pretty",
        size === 'sm' && "text-sm",
        size === 'default' && "text-base",
        size === 'lg' && "text-lg sm:text-xl",
        "mb-4 text-muted-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),

  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <p 
        className={cn(
          "font-medium leading-relaxed text-muted-foreground text-pretty",
          isMobile ? "text-lg" : "text-xl lg:text-2xl",
          "mb-6",
          className
        )} 
        {...props}
      >
        {children}
      </p>
    );
  }
};

// Unified Spacing System
export const UnifiedSpacing = {
  Section: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <section 
      className={cn(
        size === 'sm' && "py-12",
        size === 'default' && "py-16 lg:py-20",
        size === 'lg' && "py-20 lg:py-32",
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
        "container mx-auto px-4 sm:px-6 lg:px-8",
        size === 'sm' && "max-w-4xl",
        size === 'default' && "max-w-6xl",
        size === 'lg' && "max-w-7xl",
        size === 'full' && "max-w-full",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
};

// Unified Button Styles
export const unifiedButtonStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
};

// Focus Styles
export const unifiedFocusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

// Card Styles
export const unifiedCardStyles = {
  default: "bg-card text-card-foreground border border-border rounded-lg shadow-sm",
  elevated: "bg-card text-card-foreground border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
  interactive: "bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
};

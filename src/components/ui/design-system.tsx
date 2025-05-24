
import React from 'react';
import { cn } from '@/lib/utils';

// Typography System
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight", className)} {...props}>
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight", className)} {...props}>
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl md:text-3xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  ),
  H4: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("text-xl font-semibold", className)} {...props}>
      {children}
    </h4>
  ),
  Body: ({ children, className, size = "default", ...props }: React.HTMLAttributes<HTMLParagraphElement> & { size?: "sm" | "default" | "lg" }) => {
    const sizeClasses = {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg"
    };
    return (
      <p className={cn("leading-relaxed text-muted-foreground", sizeClasses[size], className)} {...props}>
        {children}
      </p>
    );
  },
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </span>
  )
};

// Spacing System
export const Spacing = {
  Section: ({ children, className, size = "default" }: { children: React.ReactNode; className?: string; size?: "sm" | "default" | "lg" }) => {
    const sizeClasses = {
      sm: "py-12",
      default: "py-16 lg:py-20",
      lg: "py-20 lg:py-32"
    };
    return (
      <section className={cn(sizeClasses[size], className)}>
        {children}
      </section>
    );
  },
  Container: ({ children, className, size = "default" }: { children: React.ReactNode; className?: string; size?: "sm" | "default" | "lg" | "xl" }) => {
    const sizeClasses = {
      sm: "max-w-4xl",
      default: "max-w-6xl",
      lg: "max-w-7xl",
      xl: "max-w-8xl"
    };
    return (
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
        {children}
      </div>
    );
  }
};

// Enhanced Focus States
export const focusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md";

// Interactive States
export const interactiveStyles = "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

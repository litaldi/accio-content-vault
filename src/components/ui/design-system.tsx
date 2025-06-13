
import React from 'react';
import { cn } from '@/lib/utils';

// Typography System
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={cn("scroll-m-20 text-3xl font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h2>
  ),
  
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h3>
  ),
  
  H4: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} 
      {...props}
    >
      {children}
    </h4>
  ),
  
  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn("text-xl text-muted-foreground", className)} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Body: ({ 
    children, 
    className, 
    size = "base",
    ...props 
  }: React.HTMLAttributes<HTMLParagraphElement> & { size?: "sm" | "base" | "lg" }) => (
    <p 
      className={cn(
        "leading-7",
        size === "sm" && "text-sm",
        size === "base" && "text-base",
        size === "lg" && "text-lg",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),

  Muted: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn("text-sm text-muted-foreground", className)} 
      {...props}
    >
      {children}
    </p>
  )
};

// Spacing System
export const Spacing = {
  Container: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn("container mx-auto px-4 max-w-7xl", className)} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Section: ({ 
    children, 
    className, 
    size = "lg",
    ...props 
  }: React.HTMLAttributes<HTMLElement> & { size?: "sm" | "md" | "lg" | "xl" }) => (
    <section 
      className={cn(
        size === "sm" && "py-8",
        size === "md" && "py-12",
        size === "lg" && "py-16",
        size === "xl" && "py-24",
        className
      )} 
      {...props}
    >
      {children}
    </section>
  ),
  
  Stack: ({ 
    children, 
    className, 
    gap = "4",
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { gap?: "2" | "4" | "6" | "8" }) => (
    <div 
      className={cn(
        "flex flex-col",
        gap === "2" && "gap-2",
        gap === "4" && "gap-4",
        gap === "6" && "gap-6",
        gap === "8" && "gap-8",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
};

// Grid System
export const Grid = {
  Container: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div 
      className={cn("grid gap-6", className)} 
      {...props}
    >
      {children}
    </div>
  ),
  
  Responsive: ({ 
    children, 
    className, 
    cols = { sm: 1, md: 2, lg: 3 },
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { 
    cols?: { sm?: number; md?: number; lg?: number; xl?: number } 
  }) => (
    <div 
      className={cn(
        "grid gap-6",
        cols.sm && `grid-cols-${cols.sm}`,
        cols.md && `md:grid-cols-${cols.md}`,
        cols.lg && `lg:grid-cols-${cols.lg}`,
        cols.xl && `xl:grid-cols-${cols.xl}`,
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
};

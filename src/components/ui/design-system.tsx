
import React from 'react';
import { cn } from '@/lib/utils';

// Typography Components
export const Typography = {
  H1: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
      {children}
    </h1>
  ),
  
  H2: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0", className)} {...props}>
      {children}
    </h2>
  ),
  
  H3: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  ),
  
  H4: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  ),
  
  Lead: ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
  
  Body: ({ 
    className, 
    children, 
    size = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLParagraphElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <p className={cn(
      "leading-7",
      size === 'sm' && "text-sm",
      size === 'lg' && "text-lg",
      "[&:not(:first-child)]:mt-6",
      className
    )} {...props}>
      {children}
    </p>
  ),
  
  Muted: ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  ),
};

// Spacing Components
export const Spacing = {
  Container: ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("container mx-auto px-4", className)} {...props}>
      {children}
    </div>
  ),
  
  Section: ({ 
    className, 
    children, 
    size = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLElement> & { size?: 'sm' | 'default' | 'lg' | 'xl' }) => (
    <section className={cn(
      size === 'sm' && "py-8",
      size === 'default' && "py-16",
      size === 'lg' && "py-24",
      size === 'xl' && "py-32",
      className
    )} {...props}>
      {children}
    </section>
  ),
  
  Stack: ({ 
    className, 
    children, 
    gap = '4',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { gap?: '2' | '4' | '6' | '8' }) => (
    <div className={cn(
      "flex flex-col",
      gap === '2' && "gap-2",
      gap === '4' && "gap-4", 
      gap === '6' && "gap-6",
      gap === '8' && "gap-8",
      className
    )} {...props}>
      {children}
    </div>
  ),
};

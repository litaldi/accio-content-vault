
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';

// Enhanced Typography System with responsive design
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <h1 
        className={cn(
          'scroll-m-20 font-bold tracking-tight',
          isMobile ? 'text-3xl sm:text-4xl' : 'text-4xl lg:text-5xl xl:text-6xl',
          'mb-6 lg:mb-8 text-balance',
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
          'scroll-m-20 font-semibold tracking-tight',
          isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl lg:text-4xl',
          'mb-4 lg:mb-6 text-balance',
          className
        )} 
        {...props}
      >
        {children}
      </h2>
    );
  },

  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn(
        'scroll-m-20 text-xl sm:text-2xl font-semibold tracking-tight',
        'mb-3 lg:mb-4 text-balance',
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  ),

  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
    const { isMobile } = useResponsiveDesign();
    return (
      <p 
        className={cn(
          'font-medium leading-relaxed text-muted-foreground text-pretty',
          isMobile ? 'text-lg' : 'text-xl lg:text-2xl',
          'mb-6 lg:mb-8',
          className
        )} 
        {...props}
      >
        {children}
      </p>
    );
  },

  Body: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        'leading-relaxed text-foreground text-pretty',
        'mb-4',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),

  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        'text-sm text-muted-foreground leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
};

// Enhanced Layout System
export const Layout = {
  Container: ({ 
    children, 
    className, 
    size = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & { 
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'full' 
  }) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      default: 'max-w-6xl',
      lg: 'max-w-7xl',
      xl: 'max-w-screen-xl',
      full: 'max-w-none'
    };

    return (
      <div 
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )} 
        {...props}
      >
        {children}
      </div>
    );
  },

  Section: ({ 
    children, 
    className, 
    spacing = 'default',
    background = 'transparent',
    ...props 
  }: React.HTMLAttributes<HTMLElement> & { 
    spacing?: 'sm' | 'default' | 'lg' | 'xl';
    background?: 'transparent' | 'muted' | 'accent' | 'primary';
  }) => {
    const spacingClasses = {
      sm: 'py-8 sm:py-12',
      default: 'py-12 sm:py-16 lg:py-20',
      lg: 'py-16 sm:py-20 lg:py-32',
      xl: 'py-20 sm:py-32 lg:py-40'
    };

    const backgroundClasses = {
      transparent: '',
      muted: 'bg-muted/30',
      accent: 'bg-accent/10',
      primary: 'bg-primary/5'
    };

    return (
      <section 
        className={cn(
          spacingClasses[spacing],
          backgroundClasses[background],
          className
        )} 
        {...props}
      >
        {children}
      </section>
    );
  },

  Grid: ({ 
    children, 
    className, 
    columns = 'auto',
    gap = 'default',
    ...props 
  }: React.HTMLAttributes<HTMLDivElement> & {
    columns?: 'auto' | 1 | 2 | 3 | 4;
    gap?: 'sm' | 'default' | 'lg';
  }) => {
    const columnClasses = {
      auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };

    const gapClasses = {
      sm: 'gap-4',
      default: 'gap-6 lg:gap-8',
      lg: 'gap-8 lg:gap-12'
    };

    return (
      <div 
        className={cn(
          'grid',
          columnClasses[columns],
          gapClasses[gap],
          className
        )} 
        {...props}
      >
        {children}
      </div>
    );
  }
};

// Enhanced Card Components
export const Card = {
  Root: ({ children, className, hover = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) => (
    <div 
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  ),

  Header: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  ),

  Content: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  ),

  Footer: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
};

// Status and Feedback Components
export const Status = {
  Loading: ({ message = 'Loading...' }: { message?: string }) => (
    <div className="flex items-center justify-center gap-3 p-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <Typography.Caption>{message}</Typography.Caption>
    </div>
  ),

  Empty: ({ 
    title, 
    description, 
    action 
  }: { 
    title: string; 
    description: string; 
    action?: React.ReactNode 
  }) => (
    <div className="text-center py-12">
      <Typography.H3 className="mb-2">{title}</Typography.H3>
      <Typography.Body className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </Typography.Body>
      {action}
    </div>
  ),

  Error: ({ 
    title = 'Something went wrong', 
    description = 'Please try again later.',
    retry 
  }: { 
    title?: string; 
    description?: string; 
    retry?: () => void 
  }) => (
    <div className="text-center py-12">
      <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-destructive text-xl">!</span>
      </div>
      <Typography.H3 className="mb-2">{title}</Typography.H3>
      <Typography.Body className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </Typography.Body>
      {retry && (
        <button 
          onClick={retry}
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
};

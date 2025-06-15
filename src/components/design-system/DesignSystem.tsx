
import React from 'react';
import { cn } from '@/lib/utils';

// Typography Components
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn('hero-text heading-gradient', className)} {...props}>
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn('heading-1', className)} {...props}>
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn('heading-2', className)} {...props}>
      {children}
    </h3>
  ),
  H4: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn('heading-3', className)} {...props}>
      {children}
    </h4>
  ),
  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('lead-text', className)} {...props}>
      {children}
    </p>
  ),
  Body: ({
    children,
    className,
    size = 'base',
    ...props
  }: React.HTMLAttributes<HTMLParagraphElement> & { size?: 'sm' | 'base' | 'lg' }) => (
    <p
      className={cn(
        'body-text',
        size === 'sm' && 'text-sm',
        size === 'lg' && 'text-lg',
        className
      )}
      {...props}
    >
      {children}
    </p>
  ),
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={cn('caption-text', className)} {...props}>
      {children}
    </span>
  )
};

// Key: Here we use unique names for custom props
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  sectionSize?: 'sm' | 'md' | 'lg' | 'xl';
  sectionBackground?: 'default' | 'muted' | 'primary';
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'default';
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  gridColumns?: string | number;
  gridGap?: string;
}

export const Layout = {
  Section: ({
    children,
    className,
    sectionSize = 'md',
    sectionBackground = 'default',
    ...props
  }: SectionProps) => {
    return (
      <section
        className={cn(
          'section-spacing',
          sectionSize === 'sm' && 'section-spacing-sm',
          sectionSize === 'md' && 'section-spacing-md',
          sectionSize === 'lg' && 'section-spacing-lg',
          sectionSize === 'xl' && 'section-spacing-xl',
          sectionBackground === 'muted' && 'bg-muted/20',
          sectionBackground === 'primary' && 'bg-gradient-to-br from-primary/5 to-background',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
  Container: ({
    children,
    className,
    containerSize = 'default',
    ...props
  }: ContainerProps) => {
    return (
      <div
        className={cn(
          'container-spacing',
          containerSize === 'sm' && 'container-spacing-sm',
          containerSize === 'md' && 'container-spacing-md',
          containerSize === 'lg' && 'container-spacing-lg',
          containerSize === 'xl' && 'container-spacing-xl',
          containerSize === '2xl' && 'container-spacing-2xl',
          containerSize === 'full' && 'container-spacing-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
  Grid: ({
    children,
    className,
    gridColumns = 1,
    gridGap = 'md',
    ...props
  }: GridProps) => {
    return (
      <div
        className={cn(
          'grid',
          gridColumns === 1 && 'grid-cols-1',
          gridColumns === 2 && 'grid-cols-1 md:grid-cols-2',
          gridColumns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          gridColumns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          gridGap === 'sm' && 'gap-4',
          gridGap === 'md' && 'gap-6',
          gridGap === 'lg' && 'gap-8',
          gridGap === 'default' && 'gap-6',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
};

export const Card = {
  Root: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('clean-card', className)} {...props}>
      {children}
    </div>
  ),
  Content: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
};

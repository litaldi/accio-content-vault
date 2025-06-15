import React from 'react';
import { cn } from '@/lib/utils';

// Typography Components
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className={cn('hero-text heading-gradient', className)} {...props}>
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className={cn('heading-1', className)} {...props}>
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className={cn('heading-2', className)} {...props}>
      {children}
    </h3>
  ),
  H4: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className={cn('heading-3', className)} {...props}>
      {children}
    </h4>
  ),
  Lead: ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className={cn('lead-text', className)} {...props}>
      {children}
    </p>
  ),
  Body: ({
    children,
    className,
    size = 'base',
    ...props
  }: React.HTMLProps<HTMLParagraphElement> & { size?: string }) => (
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
  Caption: ({ children, className, ...props }: React.HTMLProps<HTMLSpanElement>) => (
    <span className={cn('caption-text', className)} {...props}>
      {children}
    </span>
  )
};

/**
 * Section Props: accepts spacing (spacing) and background string keywords.
 * These are not forwarded to the DOM.
 */
type SectionSpacing = string;
type SectionBackground = string;

interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'spacing' | 'background'> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
}

/**
 * Container Props: accepts size string keywords, not forwarded to DOM.
 */
type ContainerSize = string;
interface ContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  size?: ContainerSize;
}

/**
 * Grid Props: accepts columns and gap as string/number, not forwarded to DOM.
 */
type GridGap = string;
type GridColumns = string | number;
interface GridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'columns' | 'gap'> {
  columns?: GridColumns;
  gap?: GridGap;
}

export const Layout = {
  Section: ({
    children,
    className,
    spacing = 'md',
    background = 'default',
    ...domProps
  }: SectionProps) => {
    // Remove 'spacing' & 'background' from DOM props:
    const restProps = { ...domProps };
    // (We already used destructuring to remove them; this is just explicit.)
    return (
      <section
        className={cn(
          'section-spacing',
          spacing === 'sm' && 'section-spacing-sm',
          spacing === 'md' && 'section-spacing-md',
          spacing === 'lg' && 'section-spacing-lg',
          spacing === 'xl' && 'section-spacing-xl',
          background === 'muted' && 'bg-muted/20',
          background === 'primary' && 'bg-gradient-to-br from-primary/5 to-background',
          className
        )}
        {...restProps}
      >
        {children}
      </section>
    );
  },
  Container: ({
    children,
    className,
    size = 'default',
    ...domProps
  }: ContainerProps) => {
    const restProps = { ...domProps };
    return (
      <div
        className={cn(
          'container-spacing',
          size === 'sm' && 'container-spacing-sm',
          size === 'md' && 'container-spacing-md',
          size === 'lg' && 'container-spacing-lg',
          size === 'xl' && 'container-spacing-xl',
          size === '2xl' && 'container-spacing-2xl',
          size === 'full' && 'container-spacing-full',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  },
  Grid: ({
    children,
    className,
    columns = 1,
    gap = 'md',
    ...domProps
  }: GridProps) => {
    const restProps = { ...domProps };
    return (
      <div
        className={cn(
          'grid',
          columns === 1 && 'grid-cols-1',
          columns === 2 && 'grid-cols-1 md:grid-cols-2',
          columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          gap === 'sm' && 'gap-4',
          gap === 'md' && 'gap-6',
          gap === 'lg' && 'gap-8',
          gap === 'default' && 'gap-6',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
};

// Card Components
export const Card = {
  Root: ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
    <div className={cn('clean-card', className)} {...props}>
      {children}
    </div>
  ),
  Content: ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
};

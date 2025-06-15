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
 * Section Props: accepts size and background as string | union.
 * These are not forwarded to the DOM.
 */
interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'size' | 'background'> {
  size?: string;
  background?: string;
}

/**
 * Container Props: accepts size string keywords, not forwarded to DOM.
 */
interface ContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  size?: string;
}

/**
 * Stack Props: accepts gap as string/union, not forwarded to DOM.
 */
interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'> {
  gap?: string;
}

export const Spacing = {
  Section: ({
    children,
    className,
    size = 'md',
    background = 'default',
    ...domProps
  }: SectionProps) => {
    // Remove 'size' & 'background' from DOM props:
    const restProps = { ...domProps };
    return (
      <section
        className={cn(
          'section-spacing',
          size === 'sm' && 'section-spacing-sm',
          size === 'md' && 'section-spacing-md',
          size === 'lg' && 'section-spacing-lg',
          size === 'xl' && 'section-spacing-xl',
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
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  },
  Stack: ({
    children,
    className,
    gap = 'md',
    ...domProps
  }: StackProps) => {
    const restProps = { ...domProps };
    return (
      <div
        className={cn(
          'flex flex-col',
          gap === 'sm' && 'gap-2',
          gap === 'md' && 'gap-4',
          gap === 'lg' && 'gap-6',
          gap === 'default' && 'gap-4',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
};

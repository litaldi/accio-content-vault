
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
  }: React.HTMLProps<HTMLParagraphElement> & { size?: 'sm' | 'base' | 'lg' }) => (
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

// Updated all custom prop types to allow `string`
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  sectionSize?: 'sm' | 'md' | 'lg' | 'xl';
  sectionBackground?: 'default' | 'muted' | 'primary';
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'default';
}

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  stackGap?: 'sm' | 'md' | 'lg' | 'default';
}

export const Spacing = {
  Section: ({
    children,
    className,
    sectionSize = 'md',
    sectionBackground = 'default',
    ...domProps
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
        {...domProps}
      >
        {children}
      </section>
    );
  },
  Container: ({
    children,
    className,
    containerSize = 'default',
    ...domProps
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
        {...domProps}
      >
        {children}
      </div>
    );
  },
  Stack: ({
    children,
    className,
    stackGap = 'md',
    ...domProps
  }: StackProps) => {
    return (
      <div
        className={cn(
          'flex flex-col',
          stackGap === 'sm' && 'gap-2',
          stackGap === 'md' && 'gap-4',
          stackGap === 'lg' && 'gap-6',
          stackGap === 'default' && 'gap-4',
          className
        )}
        {...domProps}
      >
        {children}
      </div>
    );
  }
};

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

// Spacing Components

type SectionSize = 'sm' | 'md' | 'lg' | 'xl';
type SectionBackground = 'default' | 'muted' | 'primary';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  background?: SectionBackground;
}

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'default';
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

type StackGap = 'sm' | 'md' | 'lg';
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
}

export const Spacing = {
  Section: ({
    children,
    className,
    size = 'md',
    background = 'default',
    ...props
  }: SectionProps) => (
    <section
      className={cn(
        'section-spacing',
        size === 'sm' && 'section-spacing-sm',
        size === 'lg' && 'section-spacing-lg',
        size === 'xl' && 'section-spacing-xl',
        background === 'muted' && 'bg-muted/20',
        background === 'primary' && 'bg-gradient-to-br from-primary/5 to-background',
        className
      )}
      {...props}
    >
      {children}
    </section>
  ),
  Container: ({
    children,
    className,
    size = 'default',
    ...props
  }: ContainerProps) => (
    <div
      className={cn(
        'container-spacing',
        size === 'sm' && 'container-spacing-sm',
        size === 'lg' && 'container-spacing-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  ),
  Stack: ({
    children,
    className,
    gap = 'md',
    ...props
  }: StackProps) => (
    <div
      className={cn(
        'flex flex-col',
        gap === 'sm' && 'gap-2',
        gap === 'md' && 'gap-4',
        gap === 'lg' && 'gap-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
};

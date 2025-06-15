import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Users, Clock, Shield } from 'lucide-react';

// Enterprise Typography
export const EnterpriseTypography = {
  Hero: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className={cn('hero-text heading-gradient', className)} {...props}>
      {children}
    </h1>
  ),
  H1: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className={cn('heading-1', className)} {...props}>
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className={cn('heading-2', className)} {...props}>
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className={cn('heading-3', className)} {...props}>
      {children}
    </h3>
  ),
  Lead: ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className={cn('lead-text', className)} {...props}>
      {children}
    </p>
  ),
  Body: ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className={cn('body-text', className)} {...props}>
      {children}
    </p>
  )
};

// Enterprise Spacing

type SectionSize = 'sm' | 'md' | 'lg' | 'xl';
type SectionBackground = 'default' | 'muted' | 'primary';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  background?: SectionBackground;
}
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default';
}

export const EnterpriseSpacing = {
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
    <div className={cn(
      'container-spacing',
      size === 'sm' && 'container-spacing-sm',
      size === 'lg' && 'container-spacing-lg',
      className
    )} {...props}>
      {children}
    </div>
  )
};

// Trust Signals Component
export const TrustSignals: React.FC<{ className?: string }> = ({ className }) => {
  const indicators = [
    { icon: CheckCircle, text: "SOC 2 Certified", color: "text-green-500" },
    { icon: Users, text: "50,000+ Users", color: "text-blue-500" },
    { icon: Clock, text: "99.99% Uptime", color: "text-purple-500" },
    { icon: Shield, text: "Enterprise Ready", color: "text-orange-500" }
  ];

  return (
    <div className={cn('flex flex-wrap items-center gap-8 text-sm text-muted-foreground', className)}>
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center gap-2">
          <indicator.icon className={`h-4 w-4 ${indicator.color}`} />
          <span>{indicator.text}</span>
        </div>
      ))}
    </div>
  );
};

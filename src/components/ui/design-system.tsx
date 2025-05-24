
import { cn } from '@/lib/utils';

// Typography System
export const Typography = {
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight", className)} {...props}>
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl sm:text-4xl font-bold leading-tight", className)} {...props}>
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl font-semibold leading-tight", className)} {...props}>
      {children}
    </h3>
  ),
  Body: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLParagraphElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <p className={cn(
      "leading-relaxed text-muted-foreground",
      size === 'sm' && "text-sm",
      size === 'default' && "text-base",
      size === 'lg' && "text-lg sm:text-xl",
      className
    )} {...props}>
      {children}
    </p>
  ),
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </span>
  ),
};

// Spacing System
export const Spacing = {
  Section: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <section className={cn(
      size === 'sm' && "py-12",
      size === 'default' && "py-16 lg:py-20",
      size === 'lg' && "py-20 lg:py-32",
      className
    )} {...props}>
      {children}
    </section>
  ),
  Container: ({ children, className, size = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'default' | 'lg' }) => (
    <div className={cn(
      "container mx-auto px-4 sm:px-6 lg:px-8",
      size === 'sm' && "max-w-4xl",
      size === 'default' && "max-w-6xl",
      size === 'lg' && "max-w-7xl",
      className
    )} {...props}>
      {children}
    </div>
  ),
};

// Focus and Interactive Styles
export const focusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const interactiveStyles = "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

// Card Variants
export const cardVariants = {
  default: "bg-card text-card-foreground border border-border rounded-lg shadow-sm",
  elevated: "bg-card text-card-foreground border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow",
  interactive: "bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
};

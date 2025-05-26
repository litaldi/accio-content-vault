
import React from 'react';
import { cn } from '@/lib/utils';

export interface OptimizedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  elevated?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

const OptimizedCard = React.forwardRef<HTMLDivElement, OptimizedCardProps>(
  ({ className, hover = false, elevated = false, interactive = false, padding = 'default', children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8'
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-sm",
          elevated && "shadow-md hover:shadow-lg",
          (hover || interactive) && [
            "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          ],
          interactive && "hover:border-primary/20",
          paddingClasses[padding],
          className
        )}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? "button" : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

OptimizedCard.displayName = "OptimizedCard";

const OptimizedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

OptimizedCardHeader.displayName = "OptimizedCardHeader";

const OptimizedCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { size?: 'sm' | 'default' | 'lg' }
>(({ className, size = 'default', ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      size === 'sm' && "text-lg",
      size === 'default' && "text-xl",
      size === 'lg' && "text-2xl",
      className
    )}
    {...props}
  />
));

OptimizedCardTitle.displayName = "OptimizedCardTitle";

const OptimizedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

OptimizedCardDescription.displayName = "OptimizedCardDescription";

const OptimizedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { padding?: 'none' | 'sm' | 'default' | 'lg' }
>(({ className, padding = 'default', ...props }, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6 pt-0',
    lg: 'p-8 pt-0'
  };

  return (
    <div
      ref={ref}
      className={cn(paddingClasses[padding], className)}
      {...props}
    />
  );
});

OptimizedCardContent.displayName = "OptimizedCardContent";

const OptimizedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

OptimizedCardFooter.displayName = "OptimizedCardFooter";

export { 
  OptimizedCard, 
  OptimizedCardHeader, 
  OptimizedCardTitle, 
  OptimizedCardDescription, 
  OptimizedCardContent, 
  OptimizedCardFooter 
};

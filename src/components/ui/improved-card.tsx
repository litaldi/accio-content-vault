
import * as React from "react";
import { cn } from "@/lib/utils";
import { cardVariants } from "./design-system";

export interface ImprovedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  elevated?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

const ImprovedCard = React.forwardRef<HTMLDivElement, ImprovedCardProps>(
  ({ className, hover = false, elevated = false, interactive = false, padding = 'default', children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8'
    };

    const variant = interactive ? 'interactive' : hover ? 'interactive' : elevated ? 'elevated' : 'default';

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ImprovedCard.displayName = "ImprovedCard";

// Card content components
const ImprovedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

ImprovedCardHeader.displayName = "ImprovedCardHeader";

const ImprovedCardTitle = React.forwardRef<
  HTMLParagraphElement,
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

ImprovedCardTitle.displayName = "ImprovedCardTitle";

const ImprovedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

ImprovedCardDescription.displayName = "ImprovedCardDescription";

const ImprovedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { padding?: 'none' | 'sm' | 'default' | 'lg' | 'md' | 'xl' }
>(({ className, padding = 'default', ...props }, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    md: 'p-5',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div
      ref={ref}
      className={cn(paddingClasses[padding], className)}
      {...props}
    />
  );
});

ImprovedCardContent.displayName = "ImprovedCardContent";

const ImprovedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

ImprovedCardFooter.displayName = "ImprovedCardFooter";

export { 
  ImprovedCard, 
  ImprovedCardHeader, 
  ImprovedCardTitle, 
  ImprovedCardDescription, 
  ImprovedCardContent, 
  ImprovedCardFooter 
};

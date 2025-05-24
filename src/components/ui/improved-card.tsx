
import * as React from "react";
import { cn } from "@/lib/utils";
import { cardVariants } from "./design-system";

export interface ImprovedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  elevated?: boolean;
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

const ImprovedCard = React.forwardRef<HTMLDivElement, ImprovedCardProps>(
  ({ className, hover = false, elevated = false, padding = 'default', children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8'
    };

    const variant = hover ? 'interactive' : elevated ? 'elevated' : 'default';

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

export { ImprovedCard };


import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "elevated" | "outline" | "glass";
  hover?: boolean;
  loading?: boolean;
  status?: "default" | "success" | "warning" | "error";
  badge?: string;
  children: React.ReactNode;
}

const cardVariants = {
  default: "border bg-card text-card-foreground shadow-sm",
  interactive: "border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1",
  elevated: "border bg-card text-card-foreground shadow-lg",
  outline: "border-2 bg-card text-card-foreground",
  glass: "border bg-card/80 backdrop-blur-sm text-card-foreground shadow-lg"
};

const statusVariants = {
  default: "",
  success: "border-l-4 border-l-green-500",
  warning: "border-l-4 border-l-yellow-500",
  error: "border-l-4 border-l-red-500"
};

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = false,
    loading = false,
    status = "default",
    badge,
    children,
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          cardVariants[variant],
          statusVariants[status],
          hover && "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
          loading && "animate-pulse",
          className
        )}
        {...props}
      >
        {badge && (
          <div className="absolute -top-2 -right-2 z-10">
            <Badge variant="secondary" className="shadow-sm">
              {badge}
            </Badge>
          </div>
        )}
        {children}
      </Card>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

// Enhanced card sections with better spacing and typography
const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("space-y-2 pb-4", className)}
    {...props}
  />
));

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <CardTitle
    ref={ref}
    className={cn("text-xl font-bold leading-tight tracking-tight", className)}
    {...props}
  />
));

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent
    ref={ref}
    className={cn("pt-0 space-y-4", className)}
    {...props}
  />
));

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("pt-4 gap-2", className)}
    {...props}
  />
));

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
  EnhancedCardFooter
};

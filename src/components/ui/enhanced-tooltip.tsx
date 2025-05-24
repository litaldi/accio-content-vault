
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: "default" | "info" | "warning" | "error" | "success";
    size?: "sm" | "md" | "lg";
  }
>(({ className, sideOffset = 4, variant = "default", size = "md", ...props }, ref) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-600 text-white",
    error: "bg-red-600 text-white",
    success: "bg-green-600 text-white"
  };
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-lg border shadow-lg animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Enhanced tooltip wrapper for easier use
interface EnhancedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "info" | "warning" | "error" | "success";
  size?: "sm" | "md" | "lg";
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
  className?: string;
}

const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
  content,
  children,
  variant = "default",
  size = "md",
  side = "top",
  delayDuration = 300,
  className
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          variant={variant} 
          size={size} 
          side={side}
          className={className}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider,
  EnhancedTooltip
};


import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const EnhancedTooltipProvider = TooltipPrimitive.Provider;

const EnhancedTooltipTrigger = TooltipPrimitive.Trigger;

const EnhancedTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow width={11} height={5} className="fill-primary" />
  </TooltipPrimitive.Content>
));
EnhancedTooltipContent.displayName = "EnhancedTooltipContent";

// Enhanced Tooltip component with better accessibility support
const EnhancedTooltip = ({
  children,
  content,
  delayDuration = 300,
  showArrow = true,
  side = "top",
  className,
  disableHoverableContent = false,
  asChild = false,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  showArrow?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  disableHoverableContent?: boolean;
  asChild?: boolean;
}) => {
  return (
    <EnhancedTooltipProvider delayDuration={delayDuration} disableHoverableContent={disableHoverableContent}>
      <TooltipPrimitive.Root>
        <EnhancedTooltipTrigger asChild={asChild}>{children}</EnhancedTooltipTrigger>
        <EnhancedTooltipContent
          side={side}
          className={className}
          aria-label={typeof content === "string" ? content : undefined}
        >
          {content}
          {showArrow && <TooltipPrimitive.Arrow className="fill-primary" />}
        </EnhancedTooltipContent>
      </TooltipPrimitive.Root>
    </EnhancedTooltipProvider>
  );
};

export { EnhancedTooltip, EnhancedTooltipContent, EnhancedTooltipProvider, EnhancedTooltipTrigger };

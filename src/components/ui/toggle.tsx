
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        pill: 
          "rounded-full border border-transparent",
        soft:
          "bg-muted/40 hover:bg-muted data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Create accessible ID for potential label association
function useUniqueId(prefix: string = 'toggle'): string {
  const [id] = React.useState(() => `${prefix}-${Math.random().toString(36).substring(2, 9)}`);
  return id;
}

interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
  VariantProps<typeof toggleVariants> {
  /** Optional icon to display when toggle is on */
  iconOn?: React.ReactNode;
  /** Optional icon to display when toggle is off */
  iconOff?: React.ReactNode;
  /** Text to display when toggle is on - for screen readers */
  ariaLabelOn?: string;
  /** Text to display when toggle is off - for screen readers */
  ariaLabelOff?: string;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ 
  className, 
  variant, 
  size, 
  iconOn, 
  iconOff, 
  ariaLabelOn, 
  ariaLabelOff,
  ...props 
}, ref) => {
  const id = useUniqueId();
  const [pressed, setPressed] = React.useState(!!props.defaultPressed);

  // Track the pressed state to update ARIA attributes
  React.useEffect(() => {
    if (props.pressed !== undefined) {
      setPressed(props.pressed);
    }
  }, [props.pressed]);

  // Handle internal state changes
  const handlePressedChange = (isPressed: boolean) => {
    setPressed(isPressed);
    props.onPressedChange?.(isPressed);
  };

  // Compute aria-label based on state
  const getAriaLabel = () => {
    if (props["aria-label"]) return props["aria-label"];
    return pressed ? ariaLabelOn : ariaLabelOff;
  };

  return (
    <TogglePrimitive.Root
      ref={ref}
      id={props.id || id}
      className={cn(toggleVariants({ variant, size, className }))}
      aria-label={getAriaLabel()}
      {...props}
      onPressedChange={handlePressedChange}
    >
      {/* Show appropriate icon based on state */}
      {iconOn && iconOff ? (
        <>
          {pressed ? (
            <span className="transition-opacity">{iconOn}</span>
          ) : (
            <span className="transition-opacity">{iconOff}</span>
          )}
          {/* Visually hidden text for screen readers */}
          {(ariaLabelOn || ariaLabelOff) && (
            <span className="sr-only">
              {pressed ? ariaLabelOn : ariaLabelOff}
            </span>
          )}
        </>
      ) : (
        props.children
      )}
    </TogglePrimitive.Root>
  );
});

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

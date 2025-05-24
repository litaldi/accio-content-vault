
import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";

export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "floating" | "underline";
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    type, 
    label, 
    description, 
    error, 
    success, 
    leftIcon, 
    rightIcon, 
    variant = "default",
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    const baseClasses = cn(
      "flex w-full rounded-lg border bg-background text-sm transition-all duration-200",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "group-hover:border-primary/50",
      {
        "border-destructive focus-visible:ring-destructive": error,
        "border-green-500 focus-visible:ring-green-500": success,
        "border-input": !error && !success,
      }
    );
    
    const variantClasses = {
      default: "h-12 px-4 py-3",
      floating: "h-14 px-4 pt-6 pb-2",
      underline: "h-12 px-0 border-0 border-b-2 rounded-none bg-transparent"
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="space-y-2 group">
        {label && variant !== "floating" && (
          <label 
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              baseClasses,
              variantClasses[variant],
              leftIcon && "pl-10",
              (rightIcon || isPassword || error || success) && "pr-10",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            {...props}
          />
          
          {/* Floating label */}
          {label && variant === "floating" && (
            <label 
              htmlFor={props.id}
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none",
                "text-muted-foreground",
                (isFocused || hasValue) ? "top-2 text-xs" : "top-1/2 -translate-y-1/2 text-sm"
              )}
            >
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
          
          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {success && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            
            {error && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            
            {rightIcon && !error && !success && !isPassword && rightIcon}
          </div>
        </div>
        
        {/* Description and error messages */}
        <div className="space-y-1">
          {description && !error && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          
          {error && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

export { EnhancedInput };

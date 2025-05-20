
import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { sanitizeInput } from "@/lib/security"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  containerClassName?: string
  sanitize?: boolean
}

const EnhancedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, description, error, leadingIcon, trailingIcon, containerClassName, sanitize = true, value, onChange, ...props }, ref) => {
    const inputId = id || React.useId()
    const descriptionId = description ? `${inputId}-description` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    
    // Add value sanitization for security
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        // If sanitize is true and it's a text-based input, sanitize the value
        if (sanitize && (type === 'text' || type === 'search' || type === 'url' || type === 'email' || type === undefined)) {
          const sanitizedValue = sanitizeInput(e.target.value);
          // Create a new event with the sanitized value
          const newEvent = {
            ...e,
            target: {
              ...e.target,
              value: sanitizedValue
            }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(newEvent);
        } else {
          onChange(e);
        }
      }
    };
    
    return (
      <div className={cn("form-control", containerClassName)}>
        {label && (
          <Label 
            htmlFor={inputId} 
            className="form-label"
          >
            {label}
          </Label>
        )}
        
        <div className="relative">
          {leadingIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true">
              {leadingIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 md:text-sm aria-[invalid='true']:border-destructive aria-[invalid='true']:ring-destructive",
              leadingIcon && "pl-10",
              trailingIcon && "pr-10",
              className
            )}
            ref={ref}
            aria-describedby={descriptionId || errorId}
            aria-invalid={error ? true : undefined}
            value={value}
            onChange={handleChange}
            {...props}
          />
          
          {trailingIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden={typeof trailingIcon === 'string'}>
              {trailingIcon}
            </div>
          )}
        </div>
        
        {description && !error && (
          <p id={descriptionId} className="form-description">
            {description}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="form-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }

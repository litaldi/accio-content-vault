
import React from 'react';
import { Check, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  className
}) => {
  return (
    <nav 
      aria-label="Progress" 
      className={cn("flex items-center justify-center", className)}
    >
      <ol className="flex items-center space-x-2">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="flex items-center">
            <div className="relative flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                  step.completed
                    ? "border-green-500 bg-green-500 text-white"
                    : step.current
                    ? "border-primary bg-primary text-white"
                    : "border-muted-foreground bg-background text-muted-foreground"
                )}
                aria-current={step.current ? 'step' : undefined}
              >
                {step.completed ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : step.current ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Circle className="h-4 w-4" aria-hidden="true" />
                )}
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">
                {step.title}
              </span>
            </div>
            {stepIdx < steps.length - 1 && (
              <div 
                className="ml-4 h-0.5 w-8 bg-muted-foreground/20" 
                aria-hidden="true" 
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

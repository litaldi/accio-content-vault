
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  current?: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  onStepClick?: (stepId: string) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  orientation = 'horizontal',
  variant = 'default',
  className,
  onStepClick
}) => {
  const currentStepIndex = steps.findIndex(step => step.current);
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = ((completedSteps) / steps.length) * 100;

  if (variant === 'compact') {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground">
            {completedSteps} of {steps.length} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (orientation === 'vertical') {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick}
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  step.completed && "bg-primary border-primary text-primary-foreground",
                  step.current && !step.completed && "border-primary bg-primary/10 text-primary",
                  !step.completed && !step.current && "border-muted-foreground/30 bg-background text-muted-foreground",
                  onStepClick && "hover:scale-110 cursor-pointer"
                )}
              >
                {step.completed ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-muted-foreground/20 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <h4 className={cn(
                "font-medium text-sm",
                step.current && "text-primary",
                step.completed && "text-foreground",
                !step.completed && !step.current && "text-muted-foreground"
              )}>
                {step.title}
              </h4>
              {step.description && variant === 'detailed' && (
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {variant === 'detailed' && (
        <div className="text-center space-y-2">
          <h3 className="font-semibold">Getting Started</h3>
          <p className="text-sm text-muted-foreground">
            Complete these steps to set up your account
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={!onStepClick}
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  step.completed && "bg-primary border-primary text-primary-foreground",
                  step.current && !step.completed && "border-primary bg-primary/10 text-primary",
                  !step.completed && !step.current && "border-muted-foreground/30 bg-background text-muted-foreground",
                  onStepClick && "hover:scale-110 cursor-pointer"
                )}
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>
              <div className="text-center max-w-24">
                <p className={cn(
                  "text-xs font-medium",
                  step.current && "text-primary",
                  step.completed && "text-foreground",
                  !step.completed && !step.current && "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                {step.description && variant === 'detailed' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

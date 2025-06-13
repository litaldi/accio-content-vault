
import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
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
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2 transition-colors">
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : step.current ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <span className={cn(
              "text-xs text-center max-w-[80px]",
              step.completed ? "text-green-600" : 
              step.current ? "text-primary font-medium" : 
              "text-muted-foreground"
            )}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-2 transition-colors",
              step.completed ? "bg-green-500" : "bg-muted"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

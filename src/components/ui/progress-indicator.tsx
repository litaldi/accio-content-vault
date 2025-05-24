
import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = ""
}) => {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Processing your content...</h3>
        <p className="text-sm text-muted-foreground">
          Sit back while we work our magic ✨
        </p>
      </div>
      
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center relative z-10 min-w-0 flex-1">
              {/* Step circle */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                ${isCompleted ? 'bg-primary text-primary-foreground shadow-lg' : ''}
                ${isCurrent ? 'bg-primary text-primary-foreground shadow-lg animate-pulse' : ''}
                ${isUpcoming ? 'bg-muted text-muted-foreground' : ''}
              `}>
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : isCurrent ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              
              {/* Step label */}
              <div className="text-center px-2">
                <p className={`
                  text-sm font-medium transition-colors duration-300
                  ${isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step}
                </p>
                {isCurrent && (
                  <p className="text-xs text-primary mt-1 animate-pulse">
                    In progress...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;

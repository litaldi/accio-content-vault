
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EyeIcon, Type } from 'lucide-react';

/**
 * AccessibilityButton component that provides accessibility controls for the application.
 */
export const AccessibilityButton = () => {
  const { 
    preferences,
    increaseTextSize, 
    decreaseTextSize, 
    toggleHighContrast
  } = useAccessibility();

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={increaseTextSize}
              aria-label="Increase font size"
            >
              <Type className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adjust text size (Current: {Math.round(preferences.fontSize)}%)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleHighContrast}
              aria-label={preferences.highContrast ? "Reset contrast" : "Increase contrast"}
              className={preferences.highContrast ? "bg-accent" : ""}
            >
              <EyeIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{preferences.highContrast ? "Reset contrast" : "Increase contrast"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

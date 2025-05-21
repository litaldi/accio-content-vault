
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EyeIcon, Type, ZoomIn } from 'lucide-react';

/**
 * AccessibilityButton component that provides accessibility controls for the application.
 */
export const AccessibilityButton = () => {
  const { 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize, 
    currentFontSize, 
    increaseContrast, 
    resetContrast,
    highContrast
  } = useAccessibility();

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={increaseFontSize}
              aria-label="Increase font size"
            >
              <Type className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Increase font size</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adjust text size (Current: {Math.round(currentFontSize * 100)}%)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost"
              size="icon"
              onClick={highContrast ? resetContrast : increaseContrast}
              aria-label={highContrast ? "Reset contrast" : "Increase contrast"}
              className={highContrast ? "bg-accent" : ""}
            >
              <EyeIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">
                {highContrast ? "Reset contrast" : "Increase contrast"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{highContrast ? "Reset contrast" : "Increase contrast"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

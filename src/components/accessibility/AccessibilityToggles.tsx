
import React, { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AccessibilityTogglesProps {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
}

export function AccessibilityToggles({
  isHighContrast,
  isReducedMotion,
  toggleHighContrast,
  toggleReducedMotion
}: AccessibilityTogglesProps) {
  const { t } = useTranslation();
  
  // Handlers for keyboard interactions
  const handleHighContrastKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleHighContrast();
    }
  };
  
  const handleReducedMotionKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleReducedMotion();
    }
  };
  
  const handleHelpKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open('https://www.w3.org/WAI/people-use-web/user-stories/', '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div 
      className="grid grid-cols-1 gap-2" 
      role="group" 
      aria-label={t('common.accessibility.toggleOptions', 'Accessibility Toggle Options')}
    >
      <Button
        variant={isHighContrast ? "default" : "outline"}
        className="justify-start h-10 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={toggleHighContrast}
        onKeyDown={handleHighContrastKeyDown}
        aria-pressed={isHighContrast}
        role="switch"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2 h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2v20M2 12h20"></path>
        </svg>
        {t('common.accessibility.highContrast', 'High contrast mode')}
      </Button>
      
      <Button
        variant={isReducedMotion ? "default" : "outline"}
        className="justify-start h-10 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={toggleReducedMotion}
        onKeyDown={handleReducedMotionKeyDown}
        aria-pressed={isReducedMotion}
        role="switch"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
          <path d="M4 12h16"></path>
        </svg>
        {t('common.accessibility.reducedMotion', 'Reduced motion')}
      </Button>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="justify-start h-10 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => window.open('https://www.w3.org/WAI/people-use-web/user-stories/', '_blank', 'noopener,noreferrer')}
              onKeyDown={handleHelpKeyDown}
            >
              <Keyboard className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('common.accessibility.keyboardHelp', 'Keyboard navigation help')}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="max-w-xs">Learn more about web accessibility and how to navigate with a keyboard.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="justify-start h-10 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => window.open('/accessibility-statement', '_blank', 'noopener,noreferrer')}
            >
              <HelpCircle className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('common.accessibility.statement', 'Accessibility statement')}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="max-w-xs">View our accessibility statement and commitment to inclusive design.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}


import React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  
  return (
    <div className="grid grid-cols-1 gap-2">
      <Button
        variant={isHighContrast ? "default" : "outline"}
        className="justify-start h-10 px-3 rounded-md"
        onClick={toggleHighContrast}
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
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2v20M2 12h20"></path>
        </svg>
        {t('common.accessibility.highContrast', 'High contrast mode')}
      </Button>
      
      <Button
        variant={isReducedMotion ? "default" : "outline"}
        className="justify-start h-10 px-3 rounded-md"
        onClick={toggleReducedMotion}
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
        >
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
          <path d="M4 12h16"></path>
        </svg>
        {t('common.accessibility.reducedMotion', 'Reduced motion')}
      </Button>
      
      <Button
        variant="ghost"
        className="justify-start h-10 px-3 rounded-md"
        onClick={() => window.open('https://www.w3.org/WAI/people-use-web/user-stories/', '_blank')}
      >
        <Keyboard className="mr-2 h-4 w-4" />
        {t('common.accessibility.keyboardHelp', 'Keyboard navigation help')}
      </Button>
    </div>
  );
}

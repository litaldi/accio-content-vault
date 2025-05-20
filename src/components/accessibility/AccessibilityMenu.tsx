
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SkipLink } from './SkipLink';
import { FontSizeControl } from './FontSizeControl';
import { AccessibilityToggles } from './AccessibilityToggles';
import { useAccessibilitySettings } from '@/hooks/useAccessibilitySettings';

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    fontSize,
    isHighContrast,
    isReducedMotion,
    changeFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetSettings
  } = useAccessibilitySettings();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SkipLink targetId="main-content" className="mb-2" />
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full shadow-lg bg-background/90 backdrop-blur-sm hover:bg-primary/10"
            aria-label={t('common.accessibility.menu', 'Accessibility options')}
          >
            <Eye className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-4 rounded-xl shadow-lg bg-background/95 backdrop-blur-sm border-border/50"
          side="top"
          align="end"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t('common.accessibility.title', 'Accessibility')}</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={() => setOpen(false)}
              aria-label={t('common.close', 'Close')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Font Size Control */}
            <FontSizeControl 
              fontSize={fontSize}
              changeFontSize={changeFontSize}
            />
            
            {/* Toggles for contrast and motion */}
            <AccessibilityToggles 
              isHighContrast={isHighContrast}
              isReducedMotion={isReducedMotion}
              toggleHighContrast={toggleHighContrast}
              toggleReducedMotion={toggleReducedMotion}
            />
            
            {/* Reset Button */}
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={resetSettings}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('common.accessibility.resetSettings', 'Reset all settings')}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

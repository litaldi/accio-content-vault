
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Keyboard, 
  RotateCcw,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { SkipLink } from './SkipLink';

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [fontSize, setFontSize] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [open, setOpen] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    // Get stored preferences
    const storedFontSize = localStorage.getItem('accessibility-font-size');
    const storedHighContrast = localStorage.getItem('highContrast') === 'true';
    const storedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    
    if (storedFontSize) setFontSize(parseInt(storedFontSize));
    setIsHighContrast(storedHighContrast);
    setIsReducedMotion(storedReducedMotion);

    // Apply stored settings
    document.documentElement.style.fontSize = `${storedFontSize || 100}%`;
    if (storedHighContrast) document.documentElement.classList.add('high-contrast');
    if (storedReducedMotion) document.documentElement.classList.add('reduce-animations');
  }, []);

  // Apply font size changes
  const changeFontSize = (value: number) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}%`;
    localStorage.setItem('accessibility-font-size', value.toString());
  };

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    document.documentElement.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', newValue ? 'true' : 'false');
  };

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    document.documentElement.classList.toggle('reduce-animations');
    localStorage.setItem('reducedMotion', newValue ? 'true' : 'false');
  };

  // Reset all accessibility settings
  const resetSettings = () => {
    // Reset font size
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('accessibility-font-size', '100');
    
    // Reset high contrast
    setIsHighContrast(false);
    document.documentElement.classList.remove('high-contrast');
    localStorage.setItem('highContrast', 'false');
    
    // Reset reduced motion
    setIsReducedMotion(false);
    document.documentElement.classList.remove('reduce-animations');
    localStorage.setItem('reducedMotion', 'false');
  };

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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {t('common.accessibility.fontSize', 'Font Size')}
                </label>
                <span className="text-xs text-muted-foreground">{fontSize}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => changeFontSize(Math.max(70, fontSize - 10))}
                  aria-label={t('common.accessibility.decreaseFontSize', 'Decrease font size')}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Slider
                  value={[fontSize]}
                  min={70}
                  max={150}
                  step={10}
                  onValueChange={(value) => changeFontSize(value[0])}
                  aria-label={t('common.accessibility.adjustFontSize', 'Adjust font size')}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                  onClick={() => changeFontSize(Math.min(150, fontSize + 10))}
                  aria-label={t('common.accessibility.increaseFontSize', 'Increase font size')}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Toggles for contrast and motion */}
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


import React, { useState, useRef, useEffect } from 'react';
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const {
    fontSize,
    isHighContrast,
    isReducedMotion,
    changeFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetSettings
  } = useAccessibilitySettings();

  // Handle escape key when menu is open
  useEffect(() => {
    if (!open) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Focus management when menu opens/closes
  useEffect(() => {
    if (open) {
      // Focus the close button when menu opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      // Focus the trigger button when menu closes
      triggerRef.current?.focus();
    }
  }, [open]);

  // Handle close button click
  const handleClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Handle reset button click
  const handleReset = () => {
    resetSettings();
    // Announce to screen readers that settings have been reset
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'assertive');
    announcement.textContent = t('common.accessibility.settingsReset', 'Settings have been reset to defaults');
    document.body.appendChild(announcement);
    
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SkipLink targetId="main-content" className="mb-2" />
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            ref={triggerRef}
            variant="outline" 
            size="icon" 
            className="rounded-full shadow-lg bg-background/90 backdrop-blur-sm hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={t('common.accessibility.menu', 'Accessibility options')}
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <Eye className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          ref={contentRef}
          className="w-80 p-4 rounded-xl shadow-lg bg-background/95 backdrop-blur-sm border-border/50"
          side="top"
          align="end"
          role="dialog"
          aria-label={t('common.accessibility.title', 'Accessibility Options')}
          onEscapeKeyDown={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
          onInteractOutside={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium" id="accessibility-dialog-title">
              {t('common.accessibility.title', 'Accessibility')}
            </h2>
            <Button 
              ref={closeButtonRef}
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              onClick={handleClose}
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
              ref={resetButtonRef}
              variant="outline"
              className="w-full mt-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={handleReset}
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

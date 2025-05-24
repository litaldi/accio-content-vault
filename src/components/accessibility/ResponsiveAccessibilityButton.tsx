
import React, { useState, useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
import AccessibilityPanel from './AccessibilityPanel';
import { announceToScreenReader } from '@/utils/accessibility';
import { cn } from '@/lib/utils';
import { accessibilityIcon } from 'lucide-react';

const ResponsiveAccessibilityButton: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { preferences } = useAccessibility();
  const { isMobile, isTablet } = useResponsiveLayout();

  // Announce when accessibility features are active
  useEffect(() => {
    const activeFeatures = [];
    if (preferences.highContrast) activeFeatures.push('high contrast');
    if (preferences.reducedMotion) activeFeatures.push('reduced motion');
    if (preferences.keyboardNavigation) activeFeatures.push('enhanced keyboard navigation');
    if (preferences.grayscaleMode) activeFeatures.push('grayscale mode');
    
    if (activeFeatures.length > 0) {
      announceToScreenReader(`Accessibility features active: ${activeFeatures.join(', ')}`);
    }
  }, [preferences]);

  const handleButtonClick = () => {
    setIsPanelOpen(true);
    announceToScreenReader('Accessibility panel opened');
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    announceToScreenReader('Accessibility panel closed');
  };

  // Skip to main content functionality
  const skipToMainContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
      announceToScreenReader('Skipped to main content');
    }
  };

  return (
    <>
      {/* Skip to Content Link - appears on focus */}
      <Button
        onClick={skipToMainContent}
        className={cn(
          "fixed top-4 left-4 z-[60] opacity-0 -translate-y-full",
          "focus:opacity-100 focus:translate-y-0 transition-all duration-200",
          "bg-primary text-primary-foreground shadow-lg",
          "text-sm px-4 py-2"
        )}
        onFocus={() => announceToScreenReader('Press Enter to skip to main content')}
      >
        Skip to Content
      </Button>

      {/* Main Accessibility Button */}
      <Button
        onClick={handleButtonClick}
        className={cn(
          "fixed z-50 shadow-lg transition-all duration-200",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "border-2 border-primary-foreground/20",
          "focus-visible:ring-4 focus-visible:ring-primary/50",
          // Position based on screen size
          isMobile 
            ? "bottom-4 right-4 h-14 w-14 rounded-full p-0" 
            : "bottom-6 right-6 h-12 w-12 rounded-full p-0",
          // Touch-friendly sizing
          isMobile && "touch-manipulation",
          // Enhanced visibility when accessibility features are active
          (preferences.highContrast || preferences.keyboardNavigation) && 
          "ring-2 ring-yellow-400 ring-offset-2"
        )}
        aria-label="Open accessibility settings"
        aria-describedby="accessibility-button-description"
        aria-expanded={isPanelOpen}
        aria-haspopup="dialog"
      >
        {/* Universal Accessibility Symbol */}
        <svg
          className={cn(
            "fill-current",
            isMobile ? "h-6 w-6" : "h-5 w-5"
          )}
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path d="M12 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m9 7h-6v2h6v-2m-9 3.5c-1.25 0-2.5-.5-3.5-1.5L7 13.5c1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5L16.5 12c-1 1-2.25 1.5-3.5 1.5m-4.5-2h2v7h-2v-7m5 0h2v7h-2v-7z"/>
        </svg>
        
        {/* Screen reader description */}
        <span id="accessibility-button-description" className="sr-only">
          Opens accessibility panel with options for font size, contrast, motion preferences, and more
        </span>
      </Button>

      {/* Accessibility Panel */}
      <AccessibilityPanel 
        isOpen={isPanelOpen} 
        onClose={handlePanelClose}
      />

      {/* Visual indicator when accessibility features are active */}
      {(preferences.highContrast || preferences.reducedMotion || preferences.keyboardNavigation || preferences.grayscaleMode) && (
        <div 
          className={cn(
            "fixed z-40 pointer-events-none",
            "bg-green-500 text-white text-xs px-2 py-1 rounded-full",
            "shadow-md transition-all duration-200",
            isMobile 
              ? "bottom-20 right-4" 
              : "bottom-20 right-6"
          )}
          role="status"
          aria-live="polite"
        >
          A11Y Active
        </div>
      )}
    </>
  );
};

export default ResponsiveAccessibilityButton;


import React, { useState, useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';
import EnhancedAccessibilityPanel from './EnhancedAccessibilityPanel';
import { announceToScreenReader } from '@/utils/accessibility';
import { cn } from '@/lib/utils';
import { Accessibility } from 'lucide-react';

const EnhancedAccessibilityButton: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { preferences, announceToUser } = useAccessibility();
  const { isMobile, isTablet } = useResponsiveLayout();

  // Count active accessibility features
  const activeFeatures = Object.entries(preferences).filter(([key, value]) => 
    value !== false && value !== 'medium' && value !== 'normal' && value !== 'light'
  ).length;

  const handleButtonClick = () => {
    setIsPanelOpen(true);
    announceToUser('Accessibility panel opened');
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    announceToUser('Accessibility panel closed');
  };

  // Skip to main content functionality
  const skipToMainContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: preferences.reducedMotion ? 'auto' : 'smooth' });
      announceToUser('Skipped to main content');
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
          "text-sm px-4 py-2 font-medium",
          preferences.reducedMotion && "transition-none"
        )}
        onFocus={() => announceToUser('Press Enter to skip to main content')}
        aria-label="Skip to main content"
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
          activeFeatures > 0 && "ring-2 ring-yellow-400 ring-offset-2",
          // Respect reduced motion preference
          preferences.reducedMotion && "transition-none",
          // High contrast mode adjustments
          preferences.highContrast && "border-yellow-400 border-4"
        )}
        aria-label={`Open accessibility settings. ${activeFeatures} features currently active.`}
        aria-describedby="accessibility-button-description"
        aria-expanded={isPanelOpen}
        aria-haspopup="dialog"
      >
        {/* Accessibility icon with notification dot */}
        <div className="relative">
          <Accessibility
            className={cn(
              "fill-current",
              isMobile ? "h-6 w-6" : "h-5 w-5"
            )}
            role="img"
            aria-hidden="true"
          />
          
          {/* Active features indicator */}
          {activeFeatures > 0 && (
            <div 
              className={cn(
                "absolute -top-1 -right-1 bg-yellow-400 text-black",
                "rounded-full text-xs font-bold leading-none",
                "min-w-[18px] h-[18px] flex items-center justify-center",
                "border-2 border-primary-foreground"
              )}
              aria-hidden="true"
            >
              {activeFeatures}
            </div>
          )}
        </div>
        
        {/* Screen reader description */}
        <span id="accessibility-button-description" className="sr-only">
          Opens accessibility panel with options for font size, contrast, motion preferences, 
          line spacing, link highlighting, screen reader support, and more. 
          All settings are saved automatically.
        </span>
      </Button>

      {/* Accessibility Panel */}
      <EnhancedAccessibilityPanel 
        isOpen={isPanelOpen} 
        onClose={handlePanelClose}
      />

      {/* Floating status indicator for active features */}
      {activeFeatures > 0 && (
        <div 
          className={cn(
            "fixed z-40 pointer-events-none",
            "bg-green-500 text-white text-xs px-2 py-1 rounded-full",
            "shadow-md transition-all duration-200",
            isMobile 
              ? "bottom-20 right-4" 
              : "bottom-20 right-6",
            preferences.reducedMotion && "transition-none"
          )}
          role="status"
          aria-live="polite"
          aria-label={`${activeFeatures} accessibility features active`}
        >
          {activeFeatures} A11y feature{activeFeatures !== 1 ? 's' : ''} active
        </div>
      )}
    </>
  );
};

export default EnhancedAccessibilityButton;

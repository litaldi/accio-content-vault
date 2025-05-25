
import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from '@/components/ui/button';
import { useResponsiveDesign } from '@/hooks/use-responsive-design';
import EnhancedAccessibilityPanel from './EnhancedAccessibilityPanel';
import { announceToScreenReader } from '@/utils/accessibility';
import { cn } from '@/lib/utils';
import { Accessibility } from 'lucide-react';

const RepositionedAccessibilityButton: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { preferences, announceToUser } = useAccessibility();
  const { isMobile, isTablet } = useResponsiveDesign();

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

  return (
    <>
      {/* Repositioned Accessibility Button - Top Right, next to theme toggle */}
      <Button
        onClick={handleButtonClick}
        size="icon"
        variant="ghost"
        className={cn(
          "relative transition-all duration-200 hover:bg-accent",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Enhanced visibility when accessibility features are active
          activeFeatures > 0 && "ring-2 ring-primary/50 bg-accent/50",
          // Respect reduced motion preference
          preferences.reducedMotion && "transition-none",
          // High contrast mode adjustments
          preferences.highContrast && "border border-primary"
        )}
        aria-label={`Open accessibility settings. ${activeFeatures} features currently active.`}
        aria-describedby="accessibility-button-description"
        aria-expanded={isPanelOpen}
        aria-haspopup="dialog"
      >
        {/* Accessibility icon with notification indicator */}
        <div className="relative">
          <Accessibility
            className="h-4 w-4"
            role="img"
            aria-hidden="true"
          />
          
          {/* Active features indicator */}
          {activeFeatures > 0 && (
            <div 
              className={cn(
                "absolute -top-1 -right-1 bg-primary text-primary-foreground",
                "rounded-full text-xs font-bold leading-none",
                "min-w-[16px] h-[16px] flex items-center justify-center",
                "border border-background"
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
    </>
  );
};

export default RepositionedAccessibilityButton;

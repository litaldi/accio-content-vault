import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, X, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TourStep } from '@/hooks/useGuidedTour';

interface GuidedTourOverlayProps {
  isVisible: boolean;
  currentStep: number;
  totalSteps: number;
  stepData: TourStep;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export const GuidedTourOverlay: React.FC<GuidedTourOverlayProps> = ({
  isVisible,
  currentStep,
  totalSteps,
  stepData,
  progress,
  onNext,
  onPrev,
  onSkip,
  onComplete
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !stepData) return;

    const targetElement = document.querySelector(stepData.target);
    if (!targetElement || !tooltipRef.current) return;

    const rect = targetElement.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    
    // Position tooltip based on placement
    const spacing = 16;
    let top = 0;
    let left = 0;

    switch (stepData.placement || 'bottom') {
      case 'top':
        top = rect.top - tooltip.offsetHeight - spacing;
        left = rect.left + (rect.width - tooltip.offsetWidth) / 2;
        break;
      case 'bottom':
        top = rect.bottom + spacing;
        left = rect.left + (rect.width - tooltip.offsetWidth) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - tooltip.offsetHeight) / 2;
        left = rect.left - tooltip.offsetWidth - spacing;
        break;
      case 'right':
        top = rect.top + (rect.height - tooltip.offsetHeight) / 2;
        left = rect.right + spacing;
        break;
    }

    // Keep tooltip in viewport
    top = Math.max(16, Math.min(top, window.innerHeight - tooltip.offsetHeight - 16));
    left = Math.max(16, Math.min(left, window.innerWidth - tooltip.offsetWidth - 16));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // Highlight target element
    targetElement.classList.add('tour-highlight');
    
    return () => {
      targetElement.classList.remove('tour-highlight');
    };
  }, [isVisible, stepData, currentStep]);

  if (!isVisible || !stepData) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300"
        onClick={onSkip}
      />
      
      {/* Tooltip */}
      <Card 
        ref={tooltipRef}
        className="fixed z-[101] w-80 shadow-2xl border-primary/20 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{stepData.title}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{stepData.content}</p>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onPrev}
              disabled={currentStep === 0}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button 
              size="sm"
              onClick={currentStep === totalSteps - 1 ? onComplete : onNext}
              className="flex items-center gap-1"
            >
              {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

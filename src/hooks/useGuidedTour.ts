
import { useState, useEffect } from 'react';

export interface TourStep {
  id: string;
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  showNext?: boolean;
  showPrev?: boolean;
  action?: () => void;
}

interface UseTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

export const useGuidedTour = ({ steps, onComplete, onSkip }: UseTourProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const start = () => {
    setIsActive(true);
    setCurrentStep(0);
    setIsVisible(true);
  };

  const stop = () => {
    setIsActive(false);
    setIsVisible(false);
    setCurrentStep(0);
  };

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      steps[currentStep]?.action?.();
    } else {
      complete();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    stop();
    onSkip?.();
  };

  const complete = () => {
    stop();
    onComplete?.();
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        skip();
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isActive]);

  return {
    isActive,
    isVisible,
    currentStep,
    currentStepData: steps[currentStep],
    totalSteps: steps.length,
    start,
    stop,
    next,
    prev,
    skip,
    complete,
    goToStep,
    progress: ((currentStep + 1) / steps.length) * 100
  };
};

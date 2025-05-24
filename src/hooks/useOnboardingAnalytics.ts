
import { useEffect } from 'react';

interface OnboardingEvent {
  event: 'onboarding_started' | 'onboarding_step_completed' | 'onboarding_completed' | 'onboarding_skipped' | 'onboarding_dropped';
  step?: number;
  stepId?: string;
  preferences?: any;
  timestamp: string;
}

export const useOnboardingAnalytics = () => {
  const trackEvent = (event: OnboardingEvent) => {
    // Store in localStorage for now - in production, send to analytics service
    try {
      const events = JSON.parse(localStorage.getItem('onboarding-analytics') || '[]');
      events.push(event);
      localStorage.setItem('onboarding-analytics', JSON.stringify(events));
      
      // In production, you would send this to your analytics service:
      // analytics.track(event.event, event);
      console.log('Onboarding Analytics:', event);
    } catch (error) {
      console.warn('Failed to track onboarding event:', error);
    }
  };

  const trackOnboardingStarted = () => {
    trackEvent({
      event: 'onboarding_started',
      timestamp: new Date().toISOString()
    });
  };

  const trackStepCompleted = (step: number, stepId: string) => {
    trackEvent({
      event: 'onboarding_step_completed',
      step,
      stepId,
      timestamp: new Date().toISOString()
    });
  };

  const trackOnboardingCompleted = (preferences?: any) => {
    trackEvent({
      event: 'onboarding_completed',
      preferences,
      timestamp: new Date().toISOString()
    });
  };

  const trackOnboardingSkipped = (step?: number) => {
    trackEvent({
      event: 'onboarding_skipped',
      step,
      timestamp: new Date().toISOString()
    });
  };

  const trackOnboardingDropped = (step: number, stepId: string) => {
    trackEvent({
      event: 'onboarding_dropped',
      step,
      stepId,
      timestamp: new Date().toISOString()
    });
  };

  const getAnalytics = () => {
    try {
      return JSON.parse(localStorage.getItem('onboarding-analytics') || '[]');
    } catch {
      return [];
    }
  };

  return {
    trackOnboardingStarted,
    trackStepCompleted,
    trackOnboardingCompleted,
    trackOnboardingSkipped,
    trackOnboardingDropped,
    getAnalytics
  };
};

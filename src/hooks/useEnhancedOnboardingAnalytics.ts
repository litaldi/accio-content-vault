import { useEffect } from 'react';

interface OnboardingEvent {
  event: 'onboarding_started' | 'onboarding_step_completed' | 'onboarding_completed' | 'onboarding_skipped' | 'onboarding_dropped';
  step?: number;
  stepId?: string;
  preferences?: any;
  timestamp: string;
  timeSpent?: number;
  dropOffPoint?: string;
  userAgent?: string;
  screenResolution?: string;
}

export const useEnhancedOnboardingAnalytics = () => {
  const trackEvent = (event: OnboardingEvent) => {
    // Enhance event with additional context
    const enhancedEvent = {
      ...event,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage for now - in production, send to analytics service
    try {
      const events = JSON.parse(localStorage.getItem('enhanced-onboarding-analytics') || '[]');
      events.push(enhancedEvent);
      
      // Keep only last 100 events to prevent localStorage bloat
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('enhanced-onboarding-analytics', JSON.stringify(events));
      
      // In production, you would send this to your analytics service:
      // analytics.track(event.event, enhancedEvent);
      console.log('Enhanced Onboarding Analytics:', enhancedEvent);
    } catch (error) {
      console.warn('Failed to track enhanced onboarding event:', error);
    }
  };

  const trackOnboardingStarted = () => {
    trackEvent({
      event: 'onboarding_started',
      timestamp: new Date().toISOString()
    });
  };

  const trackStepCompleted = (step: number, stepId: string, timeSpent?: number) => {
    trackEvent({
      event: 'onboarding_step_completed',
      step,
      stepId,
      timeSpent,
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

  const trackOnboardingSkipped = (step?: number, dropOffPoint?: string) => {
    trackEvent({
      event: 'onboarding_skipped',
      step,
      dropOffPoint,
      timestamp: new Date().toISOString()
    });
  };

  const trackOnboardingDropped = (step: number, stepId: string, timeSpent?: number) => {
    trackEvent({
      event: 'onboarding_dropped',
      step,
      stepId,
      timeSpent,
      timestamp: new Date().toISOString()
    });
  };

  const getAnalytics = () => {
    try {
      return JSON.parse(localStorage.getItem('enhanced-onboarding-analytics') || '[]');
    } catch {
      return [];
    }
  };

  const getAnalyticsSummary = () => {
    const events = getAnalytics();
    const summary = {
      totalSessions: events.filter(e => e.event === 'onboarding_started').length,
      completedSessions: events.filter(e => e.event === 'onboarding_completed').length,
      skippedSessions: events.filter(e => e.event === 'onboarding_skipped').length,
      averageTimeSpent: 0,
      dropOffPoints: {} as Record<string, number>,
      popularPreferences: {} as Record<string, any>
    };

    // Calculate completion rate
    if (summary.totalSessions > 0) {
      summary.completedSessions = Math.round((summary.completedSessions / summary.totalSessions) * 100);
    }

    // Find common drop-off points
    events.filter(e => e.event === 'onboarding_dropped' || e.event === 'onboarding_skipped').forEach(event => {
      const point = event.dropOffPoint || event.stepId || `step_${event.step}`;
      summary.dropOffPoints[point] = (summary.dropOffPoints[point] || 0) + 1;
    });

    // Analyze preferences
    events.filter(e => e.event === 'onboarding_completed' && e.preferences).forEach(event => {
      Object.keys(event.preferences || {}).forEach(key => {
        const value = event.preferences[key];
        if (!summary.popularPreferences[key]) {
          summary.popularPreferences[key] = {};
        }
        if (Array.isArray(value)) {
          value.forEach(item => {
            summary.popularPreferences[key][item] = (summary.popularPreferences[key][item] || 0) + 1;
          });
        } else {
          summary.popularPreferences[key][value] = (summary.popularPreferences[key][value] || 0) + 1;
        }
      });
    });

    return summary;
  };

  return {
    trackOnboardingStarted,
    trackStepCompleted,
    trackOnboardingCompleted,
    trackOnboardingSkipped,
    trackOnboardingDropped,
    getAnalytics,
    getAnalyticsSummary
  };
};

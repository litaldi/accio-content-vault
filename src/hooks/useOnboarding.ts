
import { useState, useEffect } from 'react';

interface UserPreferences {
  role: string;
  primaryGoal: string;
  contentTypes: string[];
}

interface OnboardingState {
  completed: boolean;
  skipped: boolean;
  preferences?: UserPreferences;
  lastShown?: string;
}

const ONBOARDING_STORAGE_KEY = 'accio-onboarding';

export const useOnboarding = () => {
  const [state, setState] = useState<OnboardingState>({
    completed: false,
    skipped: false
  });

  // Load onboarding state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (stored) {
        const parsedState = JSON.parse(stored);
        setState(parsedState);
      }
    } catch (error) {
      console.warn('Failed to load onboarding state:', error);
    }
  }, []);

  // Save state to localStorage
  const saveState = (newState: OnboardingState) => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(newState));
      setState(newState);
    } catch (error) {
      console.warn('Failed to save onboarding state:', error);
    }
  };

  const completeOnboarding = (preferences?: UserPreferences) => {
    const newState: OnboardingState = {
      completed: true,
      skipped: false,
      preferences,
      lastShown: new Date().toISOString()
    };
    saveState(newState);
  };

  const skipOnboarding = () => {
    const newState: OnboardingState = {
      completed: false,
      skipped: true,
      lastShown: new Date().toISOString()
    };
    saveState(newState);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    setState({
      completed: false,
      skipped: false
    });
  };

  const shouldShowOnboarding = (): boolean => {
    // Don't show if completed or skipped
    if (state.completed || state.skipped) {
      return false;
    }

    // Show for new users
    return true;
  };

  return {
    ...state,
    shouldShowOnboarding: shouldShowOnboarding(),
    completeOnboarding,
    skipOnboarding,
    resetOnboarding
  };
};

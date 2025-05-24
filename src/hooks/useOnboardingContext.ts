
import { useContext } from 'react';
import { OnboardingContext } from '@/contexts/OnboardingContext';

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
};

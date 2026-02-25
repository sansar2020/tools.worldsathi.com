import { useState, useEffect, useCallback } from 'react';

const ONBOARDING_KEY = 'onboarding_completed';

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    try {
      const completed = localStorage.getItem(ONBOARDING_KEY);
      if (!completed) {
        setShouldShowOnboarding(true);
      }
    } catch (error) {
      console.warn('Failed to check onboarding status:', error);
    }
  }, []);

  const markOnboardingComplete = useCallback(() => {
    try {
      localStorage.setItem(ONBOARDING_KEY, 'true');
      setShouldShowOnboarding(false);
    } catch (error) {
      console.warn('Failed to mark onboarding complete:', error);
    }
  }, []);

  const skipOnboarding = useCallback(() => {
    markOnboardingComplete();
  }, [markOnboardingComplete]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  return {
    shouldShowOnboarding,
    currentStep,
    nextStep,
    previousStep,
    skipOnboarding,
    markOnboardingComplete,
  };
}

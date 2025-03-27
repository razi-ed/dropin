import { useState } from 'react';
import { type OnboardingPhase, type OnboardingCluster, useOnboardingStore } from '../../store/onboardingStore';
import { 
  StepManager, 
  OnboardingStats
} from '../../components/OnboardingFlow';

export function Edit() {
  const { reset } = useOnboardingStore();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all onboarding data? This action cannot be undone.')) {
      reset();
    }
  };

  return (
    <div>
      <header className="mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Manage Onboarding Data
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Add, edit, and manage your onboarding steps and export/import data.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OnboardingStats />
        
        <StepManager />
        
        <div className="my-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Reset Onboarding Data
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                This will permanently delete all onboarding steps and reset your progress. This action cannot be undone.
              </p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Reset all data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

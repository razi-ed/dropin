import { createFileRoute } from '@tanstack/react-router'
import { OnboardingFlow } from '../components/OnboardingFlow'
export const Route = createFileRoute('/onboarding-flow')({
  component: OnboardingFlowPage,
})

function OnboardingFlowPage() {
  return (
    <div>
      <header className="mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Onboarding Flow Visualization
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Complete visualization of your onboarding steps and their relationships.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="h-[700px]">
              <OnboardingFlow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
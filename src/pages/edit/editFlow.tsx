import { 
  OnboardingFlow
} from '../../components/OnboardingFlow';

export function EditFlow() {

  return (
    <div>
      <header className="mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Manage Onboarding Flow
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Here you reposition the steps and create connections between them.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OnboardingFlow isEditable/>
      </div>
    </div>
  );
}

import { useOnboardingStore } from '../../store/onboardingStore';
import { 
  OnboardingFlow, 
  OnboardingStats,
  TaskList
} from '../../components/OnboardingFlow';

export function Home() { 
  // Get all steps
  const steps = useOnboardingStore((state) => state.steps);

  return (
    <div>
      <header className="mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Engineering Onboarding
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Visualize and track your onboarding progress with tasks organized by phase and cluster.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OnboardingStats />
        
        {/* In Progress Tasks */}
        <TaskList 
          title="In Progress"
          steps={steps}
          status="inprogress"
        />
        
        {/* Completed Tasks */}
        <TaskList 
          title="Completed"
          steps={steps}
          status="completed"
        />
        
        
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Onboarding Flow</h2>
            <p className="mt-1 text-sm text-gray-500">
              Visual representation of your onboarding journey. Drag to rearrange, connect nodes to show dependencies.
            </p>
            <div className="mt-4">
              <OnboardingFlow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
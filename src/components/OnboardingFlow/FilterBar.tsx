import type { OnboardingPhase, OnboardingCluster } from '../../store/onboardingStore';

const phases: OnboardingPhase[] = ['day1', 'day7', 'day21'];
const clusters: OnboardingCluster[] = [
  'Development environment',
  'Company Architecture',
  'Tool Access',
  'CI/CD workflow',
  'Team Processes',
];

interface FilterBarProps {
  selectedPhase: OnboardingPhase | undefined;
  setSelectedPhase: (phase: OnboardingPhase | undefined) => void;
  selectedCluster: OnboardingCluster | undefined;
  setSelectedCluster: (cluster: OnboardingCluster | undefined) => void;
}

export function FilterBar({
  selectedPhase,
  setSelectedPhase,
  selectedCluster,
  setSelectedCluster,
}: FilterBarProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Filter Onboarding Flow
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phase-filter" className="block text-sm font-medium leading-6 text-gray-900">
              Phase
            </label>
            <select
              id="phase-filter"
              value={selectedPhase || ''}
              onChange={(e) => setSelectedPhase(e.target.value ? e.target.value as OnboardingPhase : undefined)}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Phases</option>
              {phases.map((phase) => (
                <option key={phase} value={phase}>
                  {phase}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="cluster-filter" className="block text-sm font-medium leading-6 text-gray-900">
              Cluster
            </label>
            <select
              id="cluster-filter"
              value={selectedCluster || ''}
              onChange={(e) => setSelectedCluster(e.target.value ? e.target.value as OnboardingCluster : undefined)}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Clusters</option>
              {clusters.map((cluster) => (
                <option key={cluster} value={cluster}>
                  {cluster}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {(selectedPhase || selectedCluster) && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSelectedPhase(undefined);
                setSelectedCluster(undefined);
              }}
              className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 
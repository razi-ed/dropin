import { useOnboardingStore } from '../../store/onboardingStore';

export function OnboardingStats() {
  const steps = useOnboardingStore((state) => state.steps);
  
  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.status === 'completed').length;
  const inProgressSteps = steps.filter((step) => step.status === 'inprogress').length;
  const todoSteps = steps.filter((step) => step.status === 'todo').length;
  
  const completionPercentage = totalSteps > 0 
    ? Math.round((completedSteps / totalSteps) * 100) 
    : 0;
  
  const stats = [
    { name: 'Total Steps', value: totalSteps },
    { name: 'Completed', value: completedSteps },
    { name: 'In Progress', value: inProgressSteps },
    { name: 'To Do', value: todoSteps },
    { name: 'Completion', value: `${completionPercentage}%` },
  ];

  return (
    <div className="bg-white shadow sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Onboarding Progress
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow ring-1 ring-gray-200 sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        
        <div className="mt-6">
          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${completionPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
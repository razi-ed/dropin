// src/components/OnboardingFlow/TaskCard.tsx
import { type Step } from '../../store/onboardingStore';

interface TaskCardProps {
  step: Step;
  onClick: (step: Step) => void;
}

export function TaskCard({ step, onClick }: TaskCardProps) {
  // Define status-specific styling
  const getCardStyles = () => {
    switch (step.status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'inprogress':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getTitleStyles = () => {
    switch (step.status) {
      case 'completed':
        return 'text-green-700';
      case 'inprogress':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  const getStatusBadgeStyles = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inprogress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={() => onClick(step)}
      className={`flex-shrink-0 w-72 rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow cursor-pointer ${getCardStyles()}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className={`font-medium truncate ${getTitleStyles()}`}>{step.title}</h3>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeStyles()}`}>
            {step.phase}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{step.description}</p>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <span className="font-medium">{step.cluster}</span>
        </div>
      </div>
    </div>
  );
}
import { Handle, type NodeProps, Position } from 'reactflow';
import { type OnboardingNode as OnboardingNodeType, type Step, useOnboardingStore } from '../../store/onboardingStore';

interface OnboardingNodeProps extends NodeProps<{ step: Step }> {}

export function OnboardingNode({ data }: OnboardingNodeProps) {
  const { step } = data;
  const updateStepStatus = useOnboardingStore((state) => state.updateStepStatus);
  
  const handleMarkComplete = () => {
    updateStepStatus(step.id, step.status === 'completed' ? 'todo' : 'completed');
  };
  
  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'inprogress':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'todo':
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getBadgeColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inprogress':
        return 'bg-blue-100 text-blue-800';
      case 'todo':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getButtonStyles = () => {
    return step.status === 'completed'
      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
  };
  
  return (
    <div className={`p-4 rounded-lg shadow-md border ${getStatusColor()} min-w-[250px]`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getBadgeColor()}`}>
            {step.status}
          </span>
        </div>
        
        <p className="text-sm">{step.description}</p>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-medium">Phase:</span> {step.phase}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-medium">Cluster:</span> {step.cluster}
        </div>
        
        {step.content.type === 'document' && (
          <a
            href={step.content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm underline mt-1"
          >
            View Document
          </a>
        )}
        
        {step.content.type === 'checklist' && (
          <div className="mt-2">
            <h4 className="text-sm font-medium mb-1">Checklist:</h4>
            <ul className="text-sm">
              {step.content.items.map((item) => (
                <li key={item.id} className="flex items-center gap-2 my-1">
                  <input 
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {/* Would handle checklist item toggle here */}}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          onClick={handleMarkComplete}
          className={`mt-2 w-full rounded-md ${getButtonStyles()} px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {step.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
} 
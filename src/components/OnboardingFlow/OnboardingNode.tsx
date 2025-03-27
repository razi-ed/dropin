import { Handle, type NodeProps, Position } from 'reactflow';
import { type Step } from '../../store/onboardingStore';
import { TaskCard } from './TaskCard';

  interface OnboardingNodeProps extends NodeProps<{ step: Step, onClick: (step: Step) => void }> {}

export function OnboardingNode({ data }: OnboardingNodeProps) {
  const { step } = data;
  
  const handleCardClick = (clickedStep: Step) => {
    if (data.onClick) {
      data.onClick(clickedStep);
    }
  };
  
  return (
    <div>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <TaskCard step={step} onClick={handleCardClick} />
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
} 
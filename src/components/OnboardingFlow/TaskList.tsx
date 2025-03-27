import { useState, useMemo } from 'react';
import { type Step } from '../../store/onboardingStore';
import { TaskCard } from './TaskCard';
import { TaskDrawer } from './TaskDrawer';

interface TaskListProps {
  title: string;
  steps: Step[];
  status: 'completed' | 'inprogress' | 'todo';
}

export function TaskList({ title, steps, status }: TaskListProps) {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Filter steps by status
  const filteredSteps = useMemo(() => {
    return steps.filter(step => step.status === status);
  }, [steps, status]);
  
  const handleCardClick = (step: Step) => {
    setSelectedStep(step);
    setIsDrawerOpen(true);
  };
  
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedStep(null), 300); // Clear after animation
  };
  
  if (filteredSteps.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      
      {/* Horizontally scrollable container */}
      <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
        {filteredSteps.map((step) => (
          <TaskCard
            key={step.id}
            step={step}
            onClick={handleCardClick}
          />
        ))}
      </div>
      
      <TaskDrawer
        step={selectedStep}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
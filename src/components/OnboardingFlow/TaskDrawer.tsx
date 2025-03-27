import { useEffect } from 'react';
import { type Step, useOnboardingStore } from '../../store/onboardingStore';

interface TaskDrawerProps {
  step: Step | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDrawer({ step, isOpen, onClose }: TaskDrawerProps) {
  const updateStepStatus = useOnboardingStore((state) => state.updateStepStatus);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleMarkComplete = () => {
    if (step) {
      updateStepStatus(step.id, 'completed');
      onClose();
    }
  };

  const handleMarkInProgress = () => {
    if (step) {
      updateStepStatus(step.id, 'inprogress');
      onClose();
    }
  };

  const handleMarkTodo = () => {
    if (step) {
      updateStepStatus(step.id, 'todo');
      onClose();
    }
  };

  if (!step) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
              <button 
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 px-4 py-5 sm:px-6 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {step.phase}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium">Cluster:</span> {step.cluster}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium">Status:</span> {step.status}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{step.description}</p>
              </div>

              {step.content.type === 'document' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Documentation</h3>
                  <a
                    href={step.content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-blue-600 hover:underline"
                  >
                    View Document →
                  </a>
                </div>
              )}

              {step.content.type === 'checklist' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Checklist</h3>
                  <ul className="mt-2 space-y-2">
                    {step.content.items.map((item) => (
                      <li key={item.id} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          readOnly
                          className="h-4 w-4 text-indigo-600 rounded mt-1"
                        />
                        <span className="ml-2 text-sm text-gray-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-3">
              {step.status !== 'todo' && (
                <button
                  type="button"
                  onClick={handleMarkTodo}
                  className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Mark as Todo
                </button>
              )}
              
              {step.status !== 'inprogress' && (
                <button
                  type="button"
                  onClick={handleMarkInProgress}
                  className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50"
                >
                  Mark as In Progress
                </button>
              )}
              
              {step.status !== 'completed' && (
                <button
                  type="button"
                  onClick={handleMarkComplete}
                  className="flex-1 rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
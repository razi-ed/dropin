// src/components/OnboardingFlow/InProgressCards.tsx
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useOnboardingStore, type Step } from '../../store/onboardingStore';

export function InProgressCards() {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Get all steps first
  const allSteps = useOnboardingStore((state) => state.steps);
  
  // Then filter them with useMemo to prevent recreating the array on each render
  const inProgressSteps = useMemo(() => {
    return allSteps.filter(step => step.status === 'inprogress');
  }, [allSteps]);
  
  const updateStepStatus = useOnboardingStore((state) => state.updateStepStatus);

  // Handle body scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Add styles to prevent scrolling but maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling and position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Scroll back to the saved position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Clean up by ensuring all styles are removed
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleCardClick = useCallback((step: Step) => {
    setSelectedStep(step);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedStep(null), 300); // Clear after animation
  }, []);

  const handleMarkComplete = useCallback(() => {
    if (selectedStep) {
      updateStepStatus(selectedStep.id, 'completed');
      handleCloseDrawer();
    }
  }, [selectedStep, updateStepStatus, handleCloseDrawer]);

  const handleMarkTodo = useCallback(() => {
    if (selectedStep) {
      updateStepStatus(selectedStep.id, 'todo');
      handleCloseDrawer();
    }
  }, [selectedStep, updateStepStatus, handleCloseDrawer]);

  // If no in-progress steps, don't render anything
  if (inProgressSteps.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">In Progress</h2>
        
        {/* Horizontally scrollable container */}
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {inProgressSteps.map((step) => (
            <div 
              key={step.id}
              onClick={() => handleCardClick(step)}
              className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-blue-700 truncate">{step.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {step.phase}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{step.description}</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span className="font-medium">{step.cluster}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portal for drawer - rendered at the end of document body */}
      {isDrawerOpen && (
        <div className="drawer-portal">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black opacity-50 z-50"
            onClick={handleCloseDrawer}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div 
            className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-modal="true"
          >
            {selectedStep && (
              <div className="h-full flex flex-col">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
                    <button 
                      onClick={handleCloseDrawer}
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
                        <h2 className="text-xl font-bold text-gray-900">{selectedStep.title}</h2>
                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {selectedStep.phase}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        <span className="font-medium">Cluster:</span> {selectedStep.cluster}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-700">{selectedStep.description}</p>
                    </div>

                    {selectedStep.content.type === 'document' && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Documentation</h3>
                        <a
                          href={selectedStep.content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-sm text-blue-600 hover:underline"
                        >
                          View Document →
                        </a>
                      </div>
                    )}

                    {selectedStep.content.type === 'checklist' && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Checklist</h3>
                        <ul className="mt-2 space-y-2">
                          {selectedStep.content.items.map((item) => (
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
                    <button
                      type="button"
                      onClick={handleMarkTodo}
                      className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Mark as Todo
                    </button>
                    <button
                      type="button"
                      onClick={handleMarkComplete}
                      className="flex-1 rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
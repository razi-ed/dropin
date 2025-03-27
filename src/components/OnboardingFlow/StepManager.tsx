import { useState } from 'react';
import { useOnboardingStore, type Step, type OnboardingPhase, type OnboardingCluster, type DocumentLink, type CheckList } from '../../store/onboardingStore';

interface StepFormData {
  title: string;
  description: string;
  phase: OnboardingPhase;
  cluster: OnboardingCluster;
  contentType: 'document' | 'checklist';
  documentUrl: string;
  checklist: Array<{ id: string; text: string; checked: boolean }>;
}

const defaultFormData: StepFormData = {
  title: '',
  description: '',
  phase: 'day1',
  cluster: 'Development environment',
  contentType: 'document',
  documentUrl: '',
  checklist: [{ id: Math.random().toString(36).substring(2, 9), text: '', checked: false }],
};

const phases: OnboardingPhase[] = ['day1', 'day7', 'day21'];
const clusters: OnboardingCluster[] = [
  'Development environment',
  'Company Architecture',
  'Tool Access',
  'CI/CD workflow',
  'Team Processes',
];

export function StepManager() {
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StepFormData>(defaultFormData);
  
  const { steps, removeStep } = useOnboardingStore();
  const addStep = useOnboardingStore((state) => state.addStep);
  const updateStep = useOnboardingStore((state) => state.updateStep);
  const addNode = useOnboardingStore((state) => state.addNode);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddChecklistItem = () => {
    setFormData((prev) => ({
      ...prev,
      checklist: [
        ...prev.checklist,
        { id: Math.random().toString(36).substring(2, 9), text: '', checked: false },
      ],
    }));
  };
  
  const handleRemoveChecklistItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((item) => item.id !== id),
    }));
  };
  
  const handleUpdateChecklistItem = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) => 
        item.id === id ? { ...item, text } : item
      ),
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create step content based on contentType
    let content: DocumentLink | CheckList;
    if (formData.contentType === 'document') {
      content = {
        type: 'document',
        url: formData.documentUrl,
        readingTime: 10
      };
    } else {
      content = {
        type: 'checklist',
        items: formData.checklist.filter(item => item.text.trim() !== ''),
      };
    }
    
    // Create the step object
    const stepData: Omit<Step, 'id'> = {
      title: formData.title,
      description: formData.description,
      phase: formData.phase,
      cluster: formData.cluster,
      content,
      status: 'todo',
    };
    
    if (editingStepId) {
      // Update existing step
      updateStep(editingStepId, stepData);
    } else {
      // Add new step
      const newStepId = Math.random().toString(36).substring(2, 9);
      
      // First add the step to the store
      const fullStepData = {
        ...stepData,
        id: newStepId,
      } as Step;
      
      addStep(fullStepData);
      
      // Then create a node for the flow
      addNode({
        type: 'onboardingNode',
        position: { 
          x: Math.random() * 500, 
          y: Math.random() * 500 
        },
        data: { 
          step: {
            ...stepData,
            id: newStepId,
          } 
        },
      });
    }
    
    // Reset form and state
    setFormData(defaultFormData);
    setIsAddingStep(false);
    setEditingStepId(null);
  };
  
  const handleEdit = (step: Step) => {
    setEditingStepId(step.id);
    
    // Transform step data to form data
    const newFormData: StepFormData = {
      title: step.title,
      description: step.description,
      phase: step.phase,
      cluster: step.cluster,
      contentType: step.content.type,
      documentUrl: step.content.type === 'document' ? step.content.url : '',
      checklist: step.content.type === 'checklist' 
        ? step.content.items 
        : [{ id: Math.random().toString(36).substring(2, 9), text: '', checked: false }],
    };
    
    setFormData(newFormData);
    setIsAddingStep(true);
  };
  
  const handleDelete = (stepId: string) => {
    if (window.confirm('Are you sure you want to delete this step?')) {
      removeStep(stepId);
    }
  };
  
  return (
    <div className="my-6">
      <div className="flex flex-row-reverse items-center mb-4">
        
        {!isAddingStep && (
          <button
            type="button"
            onClick={() => setIsAddingStep(true)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Step
          </button>
        )}
      </div>
      
      {isAddingStep ? (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    {editingStepId ? 'Edit Step' : 'Add New Step'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {editingStepId 
                      ? 'Update the onboarding step details' 
                      : 'Add a new onboarding step to the flow'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="phase" className="block text-sm font-medium leading-6 text-gray-900">
                      Phase
                    </label>
                    <div className="mt-2">
                      <select
                        id="phase"
                        name="phase"
                        value={formData.phase}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {phases.map((phase) => (
                          <option key={phase} value={phase}>
                            {phase}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="cluster" className="block text-sm font-medium leading-6 text-gray-900">
                      Cluster
                    </label>
                    <div className="mt-2">
                      <select
                        id="cluster"
                        name="cluster"
                        value={formData.cluster}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {clusters.map((cluster) => (
                          <option key={cluster} value={cluster}>
                            {cluster}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="contentType" className="block text-sm font-medium leading-6 text-gray-900">
                      Content Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="contentType"
                        name="contentType"
                        value={formData.contentType}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="document">Document Link</option>
                        <option value="checklist">Checklist</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  
                  {formData.contentType === 'document' && (
                    <div className="sm:col-span-6">
                      <label htmlFor="documentUrl" className="block text-sm font-medium leading-6 text-gray-900">
                        Document URL
                      </label>
                      <div className="mt-2">
                        <input
                          type="url"
                          name="documentUrl"
                          id="documentUrl"
                          required
                          value={formData.documentUrl}
                          onChange={handleInputChange}
                          placeholder="https://confluence.example.com/page"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  )}
                  
                  {formData.contentType === 'checklist' && (
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Checklist Items
                      </label>
                      <div className="mt-2 space-y-3">
                        {formData.checklist.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) => handleUpdateChecklistItem(item.id, e.target.value)}
                              placeholder="Checklist item"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formData.checklist.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveChecklistItem(item.id)}
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddChecklistItem}
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Add Item
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingStep(false);
                    setEditingStepId(null);
                    setFormData(defaultFormData);
                  }}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {editingStepId ? 'Update Step' : 'Add Step'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {steps.length === 0 ? (
              <li className="px-4 py-4 sm:px-6">
                <div className="text-center text-sm text-gray-500">
                  No steps added yet. Add your first onboarding step!
                </div>
              </li>
            ) : (
              steps.map((step) => (
                <li key={step.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="truncate">
                      <div className="flex items-center">
                        <p className="truncate text-sm font-medium text-indigo-600">{step.title}</p>
                        <span className={`ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          step.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : step.status === 'inprogress' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <div className="mt-1 flex">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Phase:</span> {step.phase}
                        </p>
                        <span className="mx-2 text-gray-300">|</span>
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Cluster:</span> {step.cluster}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{step.description}</p>
                    </div>
                    <div className="flex ml-4 shrink-0 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(step)}
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(step.id)}
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 
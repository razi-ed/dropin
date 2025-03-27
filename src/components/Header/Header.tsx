import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useOnboardingStore } from '../../store/onboardingStore';

export function Header() {
  const [isImporting, setIsImporting] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const exportState = useOnboardingStore((state) => state.exportState);
  const importState = useOnboardingStore((state) => state.importState);
  
  const handleExport = () => {
    const stateJSON = exportState();
    
    // Create a blob and downloadable link
    const blob = new Blob([stateJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `onboarding-state-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleImport = () => {
    try {
      // Validate JSON format
      JSON.parse(importValue);
      
      // Import state
      importState(importValue);
      
      // Reset state
      setImportValue('');
      setIsImporting(false);
      setError(null);
    } catch (err) {
      setError('Invalid JSON format. Please check your import data.');
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setImportValue(content);
      } catch (err) {
        setError('Failed to read the file. Please try again.');
      }
    };
    
    reader.readAsText(file);
  };
  
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                {({ isActive }) => (
                  <span className={`${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}>
                    Home
                  </span>
                )}
              </Link>
              <Link to="/onboarding-flow" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                {({ isActive }) => (
                  <span className={`${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}>
                    Onboarding Flow
                  </span>
                )}
              </Link>
              <Link to="/edit" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                {({ isActive }) => (
                  <span className={`${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}>
                    Manage
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="ml-6 flex items-center space-x-4">
            <button
              type="button"
              onClick={handleExport}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Export
            </button>
            <button
              type="button"
              onClick={() => setIsImporting(true)}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Import
            </button>
          </div>
        </div>
      </div>
      
      {isImporting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Import Onboarding Data</h3>
            
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="file-upload" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload JSON file
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="import-data" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Or paste JSON data
                </label>
                <div className="mt-1">
                  <textarea
                    id="import-data"
                    name="import-data"
                    rows={5}
                    value={importValue}
                    onChange={(e) => setImportValue(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>
            
            <div className="mt-5 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsImporting(false);
                  setImportValue('');
                  setError(null);
                }}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!importValue.trim()}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 
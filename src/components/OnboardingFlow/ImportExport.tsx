import { useState } from 'react';
import { useOnboardingStore } from '../../store/onboardingStore';

export function ImportExport() {
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
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Import/Export</h2>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export State
          </button>
          <button
            type="button"
            onClick={() => setIsImporting(true)}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Import State
          </button>
        </div>
      </div>
      
      {isImporting && (
        <div className="bg-gray-50 p-4 rounded-md mt-4">
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="file-upload" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload JSON file
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            
            <div className="mt-4">
              <label 
                htmlFor="import-data" 
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Or paste JSON data
              </label>
              <div className="mt-2">
                <textarea
                  id="import-data"
                  name="import-data"
                  rows={5}
                  value={importValue}
                  onChange={(e) => setImportValue(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            {error && (
              <div className="text-sm text-red-600 mt-2">
                {error}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-2">
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
    </div>
  );
} 
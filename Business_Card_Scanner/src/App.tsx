import React, { useState } from 'react';
import { ScanLine } from 'lucide-react';
import FileUpload from './components/FileUpload';
import BusinessCard from './components/BusinessCard';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ScanLine className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Business Card Scanner
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Upload a business card image and we'll extract the important information for you.
            Simply drag and drop your image or click to select a file.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upload Business Card
              </h2>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onClear={handleClear}
              />
            </div>
            
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Extracted Information
              </h2>
              {previewUrl ? (
                <BusinessCard imageUrl={previewUrl} />
              ) : (
                <div className="w-full max-w-md h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">
                    Upload a business card to see the extracted information
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
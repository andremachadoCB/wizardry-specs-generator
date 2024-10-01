import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const FileSelectionSidebar = ({ onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => 
      ['csv', 'pdf', 'docx'].includes(file.name.split('.').pop().toLowerCase())
    );
    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const removeFile = (fileToRemove) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  const handleSubmit = () => {
    onFilesSelected(selectedFiles);
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-4">Knowledge Library</h3>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        accept=".csv,.pdf,.docx"
        className="mb-4"
      />
      <div className="flex-grow overflow-auto">
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span className="truncate">{file.name}</span>
            <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button 
        className="w-full mt-4"
        onClick={handleSubmit}
        disabled={selectedFiles.length === 0}
      >
        Add Selected Files
      </Button>
    </div>
  );
};

export default FileSelectionSidebar;
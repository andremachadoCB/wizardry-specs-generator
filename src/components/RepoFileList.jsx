import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const RepoFileList = ({ files, onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    onSelectFile(file);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Available Files:</h3>
      <ScrollArea className="h-[200px] w-full border rounded-md p-4">
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${selectedFile === file ? 'bg-primary/20' : ''}`}
                onClick={() => handleFileSelect(file)}
              >
                {file}
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {selectedFile && (
        <p className="mt-2">Selected file: <span className="font-semibold">{selectedFile}</span></p>
      )}
    </div>
  );
};

export default RepoFileList;
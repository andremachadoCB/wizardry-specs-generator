import React from 'react';
import { Button } from "@/components/ui/button";
import RepoFileList from './RepoFileList';
import FileSelectionSidebar from './FileSelectionSidebar';

const FileExplorer = ({ selectedRepo, onSelectFile, shouldLoadFiles, handleLoadFiles, selectedFile, onFilesSelected }) => {
  return (
    <div className="w-1/5 bg-gray-100 p-4 flex flex-col h-full">
      <Button 
        className="bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90 rounded-none uppercase w-full mb-4"
        onClick={handleLoadFiles}
        disabled={!selectedRepo}
      >
        Load Files
      </Button>
      <div className="flex-grow overflow-auto">
        {shouldLoadFiles && (
          <RepoFileList 
            repoUrl={selectedRepo} 
            onSelectFile={onSelectFile} 
            shouldLoadFiles={shouldLoadFiles}
            selectedFile={selectedFile}
          />
        )}
      </div>
      <div className="mt-4">
        <FileSelectionSidebar onFilesSelected={onFilesSelected} />
      </div>
    </div>
  );
};

export default FileExplorer;
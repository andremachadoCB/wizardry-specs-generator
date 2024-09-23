import React from 'react';
import { Button } from "@/components/ui/button";
import RepoFileList from './RepoFileList';

const FileExplorer = ({ selectedRepo, onSelectFile, shouldLoadFiles, handleLoadFiles, selectedFile }) => {
  return (
    <div className="w-1/5 bg-gray-100 p-4">
      <Button 
        className="bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90 rounded-none uppercase w-full mb-4"
        onClick={handleLoadFiles}
        disabled={!selectedRepo}
      >
        Load Files
      </Button>
      {shouldLoadFiles && (
        <RepoFileList 
          repoUrl={selectedRepo} 
          onSelectFile={onSelectFile} 
          shouldLoadFiles={shouldLoadFiles}
          selectedFile={selectedFile}
        />
      )}
    </div>
  );
};

export default FileExplorer;
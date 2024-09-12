import React from 'react';
import RepoSelector from './RepoSelector';
import RepoFileList from './RepoFileList';

const Sidebar = ({ selectedRepo, onSelectRepo, files, onSelectFile }) => {
  return (
    <div className="bg-gray-100 p-4 h-full overflow-auto">
      <RepoSelector
        selectedRepo={selectedRepo}
        onSelectRepo={onSelectRepo}
      />
      <RepoFileList
        files={files}
        onSelectFile={onSelectFile}
      />
    </div>
  );
};

export default Sidebar;
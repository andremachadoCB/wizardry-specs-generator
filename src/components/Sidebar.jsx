import React from 'react';
import RepoFileList from './RepoFileList';

const Sidebar = ({ files, onSelectFile }) => {
  return (
    <div className="bg-gray-100 p-4 h-full overflow-auto">
      <RepoFileList
        files={files}
        onSelectFile={onSelectFile}
      />
    </div>
  );
};

export default Sidebar;
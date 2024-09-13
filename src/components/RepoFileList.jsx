import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';

const TreeNode = ({ node, onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileSelect = () => {
    if (node.type === 'blob') {
      onSelectFile(node.path);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center cursor-pointer ${node.type === 'tree' ? 'font-semibold' : ''}`}
        onClick={node.type === 'tree' ? toggleOpen : handleFileSelect}
      >
        {node.type === 'tree' ? (
          isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        ) : (
          <File className="w-4 h-4 mr-1" />
        )}
        {node.type === 'tree' ? <Folder className="w-4 h-4 mr-1" /> : null}
        <span>{node.name}</span>
      </div>
      {isOpen && node.type === 'tree' && node.children && (
        <div className="ml-4">
          {Object.values(node.children).map((childNode) => (
            <TreeNode key={childNode.path} node={childNode} onSelectFile={onSelectFile} />
          ))}
        </div>
      )}
    </div>
  );
};

const RepoFileList = ({ fileStructure = {}, onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (path) => {
    setSelectedFile(path);
    onSelectFile(path);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Repository Files:</h3>
      <ScrollArea className="h-[calc(100vh-200px)] w-full border rounded-md p-4">
        {Object.keys(fileStructure).length > 0 ? (
          Object.values(fileStructure).map((node) => (
            <TreeNode key={node.path} node={node} onSelectFile={handleFileSelect} />
          ))
        ) : (
          <p>No files to display</p>
        )}
      </ScrollArea>
      {selectedFile && (
        <p className="mt-2">Selected file: <span className="font-semibold">{selectedFile}</span></p>
      )}
    </div>
  );
};

export default RepoFileList;
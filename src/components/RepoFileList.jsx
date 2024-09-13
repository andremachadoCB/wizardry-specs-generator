import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';

const TreeNode = ({ node, onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileSelect = () => {
    if (!node.children) {
      onSelectFile(node.id);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center cursor-pointer ${node.children ? 'font-semibold' : ''}`}
        onClick={node.children ? toggleOpen : handleFileSelect}
      >
        {node.children ? (
          isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        ) : (
          <File className="w-4 h-4 mr-1" />
        )}
        {node.children ? <Folder className="w-4 h-4 mr-1" /> : null}
        <span>{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="ml-4">
          {node.children.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} onSelectFile={onSelectFile} />
          ))}
        </div>
      )}
    </div>
  );
};

const RepoFileList = ({ files, onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (nodeId) => {
    setSelectedFile(nodeId);
    onSelectFile(nodeId);
  };

  const buildFileTree = (files) => {
    const root = { id: 'root', name: 'Root', children: [] };
    files.forEach(file => {
      const parts = file.split('/');
      let currentNode = root;
      parts.forEach((part, index) => {
        let existingNode = currentNode.children.find(child => child.name === part);
        if (!existingNode) {
          existingNode = { id: parts.slice(0, index + 1).join('/'), name: part, children: index < parts.length - 1 ? [] : null };
          currentNode.children.push(existingNode);
        }
        currentNode = existingNode;
      });
    });
    return root.children;
  };

  const fileTree = buildFileTree(files);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Available Files:</h3>
      <ScrollArea className="h-[calc(100vh-200px)] w-full border rounded-md p-4">
        {fileTree.map((node) => (
          <TreeNode key={node.id} node={node} onSelectFile={handleFileSelect} />
        ))}
      </ScrollArea>
      {selectedFile && (
        <p className="mt-2">Selected file: <span className="font-semibold">{selectedFile}</span></p>
      )}
    </div>
  );
};

export default RepoFileList;
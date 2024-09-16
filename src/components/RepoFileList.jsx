import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchRepoTree = async (url) => {
  const response = await fetch('/api/repos/tree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

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

const RepoFileList = ({ repoUrl, onSelectFile, shouldLoadFiles }) => {
  const { data: fileStructure, isLoading, error } = useQuery({
    queryKey: ['repoTree', repoUrl],
    queryFn: () => fetchRepoTree(repoUrl),
    enabled: !!repoUrl && shouldLoadFiles,
  });

  if (!shouldLoadFiles) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Repository Files:</h3>
      <ScrollArea className="h-[calc(100vh-200px)] w-full border rounded-md p-4">
        {fileStructure ? (
          Object.values(fileStructure).map((node) => (
            <TreeNode key={node.path} node={node} onSelectFile={onSelectFile} />
          ))
        ) : (
          <p>No files to display</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default RepoFileList;

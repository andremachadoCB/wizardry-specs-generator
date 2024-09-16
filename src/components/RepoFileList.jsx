import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchWithApiUrl } from '../utils/api';

const TreeNode = ({ node, onSelectFile, selectedFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleFileSelect = () => {
    if (node.type === 'blob') {
      onSelectFile(node.path);
    }
  };

  const isSelected = selectedFile === node.path;

  return (
    <div>
      <div 
        className={`flex items-center cursor-pointer ${node.type === 'tree' ? 'font-semibold' : ''} ${isSelected ? 'bg-blue-100 text-blue-600' : ''}`}
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
            <TreeNode 
              key={childNode.path} 
              node={childNode} 
              onSelectFile={onSelectFile} 
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RepoFileList = ({ repoUrl, onSelectFile, shouldLoadFiles, selectedFile }) => {
  const { data: fileStructure, isLoading, error } = useQuery({
    queryKey: ['repoTree', repoUrl],
    queryFn: () => fetchWithApiUrl('/api/repos/tree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: repoUrl }),
    }),
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
            <TreeNode 
              key={node.path} 
              node={node} 
              onSelectFile={onSelectFile} 
              selectedFile={selectedFile}
            />
          ))
        ) : (
          <p>No files to display</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default RepoFileList;

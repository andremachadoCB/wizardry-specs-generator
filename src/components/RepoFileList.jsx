import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Folder, File, AlertCircle, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchWithApiUrl } from '../utils/api';
import { Button } from "@/components/ui/button";

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

const FileTreeSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex items-center gap-2" style={{ paddingLeft: `${(i % 3) * 16}px` }}>
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" style={{ width: `${60 + (i * 17) % 120}px` }} />
      </div>
    ))}
  </div>
);

const RepoFileList = ({ repoUrl, onSelectFile, shouldLoadFiles, selectedFile }) => {
  const { data: fileStructure, isLoading, error, refetch } = useQuery({
    queryKey: ['repoTree', repoUrl],
    queryFn: () => fetchWithApiUrl('/api/repos/tree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: repoUrl }),
    }),
    enabled: !!repoUrl && shouldLoadFiles,
    retry: 1,
  });

  if (!shouldLoadFiles) return null;

  if (isLoading) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Repository Files:</h3>
        <div className="border rounded-md p-4">
          <FileTreeSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Repository Files:</h3>
        <div className="border rounded-md p-4 flex flex-col items-center gap-3 text-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-gray-600">
            Failed to load repository files.
            <br />
            <span className="text-xs text-gray-400">{error.message}</span>
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Repository Files:</h3>
      <ScrollArea className="h-[calc(100vh-200px)] w-full border rounded-md p-4">
        {fileStructure && Object.keys(fileStructure).length > 0 ? (
          Object.values(fileStructure).map((node) => (
            <TreeNode
              key={node.path}
              node={node}
              onSelectFile={onSelectFile}
              selectedFile={selectedFile}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
            <Folder className="w-8 h-8" />
            <p className="text-sm">No files found in this repository</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default RepoFileList;

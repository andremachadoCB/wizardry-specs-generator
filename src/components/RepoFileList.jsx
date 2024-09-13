import React, { useState } from 'react';
import TreeView from '@mui/material/TreeView';
import TreeItem from '@mui/material/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ScrollArea } from "@/components/ui/scroll-area";

const RepoFileList = ({ files, onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event, nodeId) => {
    setSelectedFile(nodeId);
    onSelectFile(nodeId);
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const buildFileTree = (files) => {
    const root = { id: 'root', name: 'Root', children: [] };
    files.forEach(file => {
      const parts = file.split('/');
      let currentNode = root;
      parts.forEach((part, index) => {
        let existingNode = currentNode.children.find(child => child.name === part);
        if (!existingNode) {
          existingNode = { id: parts.slice(0, index + 1).join('/'), name: part, children: [] };
          currentNode.children.push(existingNode);
        }
        currentNode = existingNode;
      });
    });
    return root;
  };

  const fileTree = buildFileTree(files);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Available Files:</h3>
      <ScrollArea className="h-[calc(100vh-200px)] w-full border rounded-md p-4">
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={handleFileSelect}
          selected={selectedFile}
        >
          {renderTree(fileTree)}
        </TreeView>
      </ScrollArea>
      {selectedFile && (
        <p className="mt-2">Selected file: <span className="font-semibold">{selectedFile}</span></p>
      )}
    </div>
  );
};

export default RepoFileList;
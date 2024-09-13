import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Folder, File } from 'lucide-react';

const mockedFileStructure = {
  "CODE_OF_CONDUCT.md": {
    "name": "CODE_OF_CONDUCT.md",
    "path": "CODE_OF_CONDUCT.md",
    "type": "blob",
    "children": {}
  },
  "CONTRIBUTING.md": {
    "name": "CONTRIBUTING.md",
    "path": "CONTRIBUTING.md",
    "type": "blob",
    "children": {}
  },
  "LICENSE": {
    "name": "LICENSE",
    "path": "LICENSE",
    "type": "blob",
    "children": {}
  },
  "NOTICE": {
    "name": "NOTICE",
    "path": "NOTICE",
    "type": "blob",
    "children": {}
  },
  "README.md": {
    "name": "README.md",
    "path": "README.md",
    "type": "blob",
    "children": {}
  },
  "app": {
    "name": "app",
    "path": "app",
    "type": "tree",
    "children": {
      "bms": {
        "name": "bms",
        "path": "app/bms",
        "type": "tree",
        "children": {
          "COACTUP.bms": {
            "name": "COACTUP.bms",
            "path": "app/bms/COACTUP.bms",
            "type": "blob",
            "children": {}
          },
          "COACTVW.bms": {
            "name": "COACTVW.bms",
            "path": "app/bms/COACTVW.bms",
            "type": "blob",
            "children": {}
          }
        }
      },
      "cbl": {
        "name": "cbl",
        "path": "app/cbl",
        "type": "tree",
        "children": {
          "CBACT01C.cbl": {
            "name": "CBACT01C.cbl",
            "path": "app/cbl/CBACT01C.cbl",
            "type": "blob",
            "children": {}
          },
          "CBACT02C.cbl": {
            "name": "CBACT02C.cbl",
            "path": "app/cbl/CBACT02C.cbl",
            "type": "blob",
            "children": {}
          }
        }
      }
    }
  }
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

const RepoFileList = ({ onSelectFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileStructure, setFileStructure] = useState({});

  const handleFileSelect = (path) => {
    setSelectedFile(path);
    onSelectFile(path);
  };

  const handleLoadFiles = () => {
    setFileStructure(mockedFileStructure);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Repository Files:</h3>
      <button
        onClick={handleLoadFiles}
        className="bg-crowdbotics-button text-crowdbotics-text hover:bg-crowdbotics-button/90 rounded-none uppercase w-full mb-4"
      >
        Load Files
      </button>
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